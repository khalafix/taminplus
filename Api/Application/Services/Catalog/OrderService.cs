using Application.Interfaces;
using Application.Interfaces.Catalog;
using Application.Interfaces.PaymentGateway;
using Application.Services.PaymentGateway;
using Core.Entities;
using Core.Entities.Catalog;
using Core.Entities.Payment;
using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.Payment;
using Infrastructure.Models.PaymentGateway;
using Infrastructure.Resources;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces.Blog;
using static Org.BouncyCastle.Math.EC.ECCurve;
using Microsoft.Extensions.Options;
using BI.Application.Interfaces;
using Infrastructure.Models;

namespace Application.Services.Catalog
{
    public class OrderService : IOrderService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<Order> queryService;
        private readonly IMellatPaymentService mellatPaymentService;
        private readonly IGoldiranService goldiranService;
        private readonly ISmsService smsService;
        private readonly ILogger logger;

        public OrderService(BIContext context,
            IGenericQueryService<Order> queryService, IMellatPaymentService mellatPaymentService, IGoldiranService goldiranService, ISmsService smsService,
            ILogger<OrderService> logger
            )
        {
            this.context = context;
            this.queryService = queryService;
            this.mellatPaymentService = mellatPaymentService;
            this.goldiranService = goldiranService;
            this.smsService = smsService;
            this.logger = logger;

        }

        public async Task<string> GenrateCode()
        {
            var alphabet = Nanoid.Nanoid.Generate("0123456789", 8).ToString();

            while (await context.Orders.AnyAsync(a => a.OrderNumber == alphabet))
            {
                alphabet = Nanoid.Nanoid.Generate("0123456789", 8).ToString();
            }
            return alphabet;
        }

        public async Task<GoldiranActionResult<UserPaymenstDto>> Add(UserOrderDto model, Guid userId)
        {
            var result = new GoldiranActionResult<UserPaymenstDto>();
            var orderNumber = Convert.ToInt64(await GenrateCode());

         
            var saleReferenceId = Nanoid.Nanoid.Generate("0123456789", 8).ToString();


            while (await context.Orders.AnyAsync(a => a.SaleReferenceId == saleReferenceId))
            {
                saleReferenceId = Nanoid.Nanoid.Generate("0123456789", 8).ToString();
            }

            var customer = await context.Customers.Include(i => i.User).FirstOrDefaultAsync(f => f.UserId == userId);


            if (customer.User.FirstName == "-" ||
                 customer.User.LastName == "-" ||
                 customer.GoldIranProvinceId == null ||
                 customer.GoldIranProvinceId == 0 ||
                 customer.User.PhoneNumber == "" ||
                 customer.DeliveryAddress == "" ||
                 customer.DeliveryAddress == null ||
                 customer.GoldIranCityId == 0 ||
                 customer.GoldIranCityId == null

                 )
            {
                result.IsSuccess = false;
                result.Message = MessagesFA.CompletePersonalInformation;
                return result;
            }



            var kopon = await context.Kopons.FirstOrDefaultAsync(f => !String.IsNullOrEmpty(model.KoponCode) && f.Code == model.KoponCode && f.IsActive == true);
            if (!String.IsNullOrEmpty(model.KoponCode) && kopon != null && kopon.FromDate > DateTime.Now)
            {
                result.IsSuccess = false;
                result.Message = MessagesFA.KoponNotValid;
                return result;

            }
            if (!String.IsNullOrEmpty(model.KoponCode) && kopon != null && kopon.ToDate < DateTime.Now)
            {
                result.IsSuccess = false;
                result.Message = MessagesFA.KoponNotValid;
                return result;

            }

            if (!String.IsNullOrEmpty(model.KoponCode) && kopon == null)
            {
                result.IsSuccess = false;
                result.Message = MessagesFA.KoponNotValid;
                return result;

            }


            long originalAmount = 0;

            var listOrderDetail = new List<OrderDetail>();

            foreach (var item in model.Items)
            {
                var product = await context.Products.Include(i => i.FinancialProducts).FirstOrDefaultAsync(f => f.Id == item.ProductId && f.IsActive == true);
                if (product != null)
                {
                    long price = 0;

                    if (product.GetInventoryFromApi == true)
                    {
                        price = product.APIAmount.Value;
                    }
                    else
                    {
                        price = product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault()?.DiscountedPrice != 0 ?
                        product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault().DiscountedPrice : 
                        product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault().Price != 0 ?
                        product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault().Price : 0;

                    }



                    originalAmount += item.ItemCount > 0 ? (price * item.ItemCount) : price;

                    var orderDetail = new OrderDetail()
                    {
                        ItemCount = item.ItemCount > 0 ? item.ItemCount : 1,
                        Price = price,
                        ProductId = item.ProductId,

                    };

                    listOrderDetail.Add(orderDetail);

                }
                else
                {

                    result.IsSuccess = false;
                    result.Message = MessagesFA.CommunicationError;
                    return result;


                }
            }


            long koponAmount = kopon != null ? (originalAmount * kopon.Percent) / 100 : 0;
            long finalAmount = kopon != null ? originalAmount - koponAmount : originalAmount;

            var order = new Order
            {
                Id = Guid.NewGuid(),
                CreateDate = DateTime.Now,
                CustomerId = customer.Id,
                FinalAmount = finalAmount,
                KoponAmount = koponAmount,
                KoponId = kopon != null ? kopon.Id : null,
                KoponPercent = kopon != null ? kopon.Percent : 0,
                OrderNumber = orderNumber.ToString(),
                SaleReferenceId = saleReferenceId.ToString(),
                OrderStatus = OrderStatus.Register,
                CityId = customer.GoldIranCityId,
                DeliveryAddress = customer.DeliveryAddress,
                ParishId = customer.ParishId,
                RegionId = customer.RegionId,
                ProvinceId = customer.GoldIranProvinceId,
                RegionTitle = customer.RegionTitle,
                ParishTitle = customer.ParishTitle,
                CityTitle = customer.CityTitle,
                ProvinceTitle = customer.ProvinceTitle,
            };


            var orderLog = new OrderLog
            {
                Id = Guid.NewGuid(),
                CreateDate = DateTime.Now,
                OrderStatusRemark = "ثبت سفارش توسط مشتری",
                OrderStatus = OrderStatus.Register

            };

            foreach (var item in listOrderDetail)
            {
                order.OrderDetails.Add(item);

            }
            order.OrderLogs.Add(orderLog);
            await context.AddAsync(order);
            await context.SaveChangesAsync();

            logger.LogInformation("Add Order Service with orderId:{0} , ordernumber:{1}", order.Id , order.OrderNumber);

            result.IsSuccess = true;
            result.Message = MessagesFA.AddOrderSuccess;

            if (model.IsPaied == true)
            {
                var userPayment = new UserPayment
                {
                    Amount = order.FinalAmount,
                    OrderDate = DateTime.Now,
                    UserId = userId,
                    OrderId = order.Id,
                    Id = Guid.NewGuid(),
                    
                };
                await context.UserPayments.AddAsync(userPayment);
                await context.SaveChangesAsync();
                var saleModel = new SalePaymentRequestModel();
                saleModel.Amount = order.FinalAmount;
                saleModel.CustomerMobileNumber = customer.User.UserName;
                saleModel.OrderId = (long)Convert.ToDouble(order.OrderNumber);
                saleModel.OrderIdValue = order.Id;
                saleModel.OrderNumber = order.OrderNumber;
                saleModel.UserPaymentId = userPayment.Id;

                logger.LogInformation("Add UserPayment saleorderId:{0}  , ordernumber:{1}", saleModel.OrderId , order.OrderNumber);

                var bankPaymentResult = await mellatPaymentService.SalePayment(saleModel);
                if (bankPaymentResult.IsSuccess)
                {
                  
                    result.Data = new UserPaymenstDto();

                    result.IsSuccess = true;
                    result.Data.RefId = bankPaymentResult.Data.RefId.ToString();
                    userPayment.RefId = bankPaymentResult.Data.RefId;
                    order.RefId = bankPaymentResult.Data.RefId;

                    userPayment.OrderValue = order.OrderNumber;
                    userPayment.TrackingCode = bankPaymentResult.Data.RefId.ToString();
                    //userPaymentInfo.OrderValue = bankPaymentResult.Data.RefId.ToString();
                    //result.Data.RefId = bankPaymentResult.Data.RefId.ToString();
                    logger.LogInformation("SalePayment RefId:{0}  , ordernumber:{1}", order.RefId, order.OrderNumber);

                    result.Data.MobileNo = customer.User.UserName;
                    await context.SaveChangesAsync();

                    return result;
                }

                if (!bankPaymentResult.IsSuccess)
                {
                    logger.LogInformation("Add Order Service not success, !bankPaymentResult.IsSuccess with Message:{0}", bankPaymentResult.Message);


          
                    result.Message = MessagesFA.ErrorForCommunicationOnlinePayment;
                    result.IsSuccess = false;

                    return result;
                }

            }



            return result;
        }

        public async Task<GoldiranActionResult<Guid>> Delete(Guid id)
        {
            var result = new GoldiranActionResult<Guid>();

            var item = new Order { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<OrderDto>> GetById(Guid id)
        {
            var result = new GoldiranActionResult<OrderDto>();

            var item = await context.Orders.Include(i => i.Kopon).Include(i => i.OrderDetails)
                .ThenInclude(i => i.Product.Brand)
                .Include(i => i.OrderDetails)
                //.ThenInclude(i => i.Product.FinancialProducts)
                .Include(i => i.Customer).Include(i => i.Customer.City)
                .Include(i => i.Customer.User).SingleOrDefaultAsync(q => q.Id == id);

            var model = new OrderDto
            {
                PostCode = item.Customer.PostCode,
                Address = item.Customer.Address,
                DeliveryAddress = item.Customer.DeliveryAddress,
                //City = item.Customer.City.Title,
                //CityId = item.Customer.CityId.Value,
                CustomerId = item.CustomerId,
                PhoneNumber = item.Customer.User.PhoneNumber,
                OrderReturnRemark = item.OrderReturnByCustomerRemark,
                OrderReturnDate = item.OrderReturnByCustomerDate != null ? DateUtility.FormatShamsiDateTime(item.OrderReturnByCustomerDate.Value) : "",
                CreateDate = DateUtility.FormatShamsiDateTime(item.CreateDate),
                CustomerName = item.Customer.User.FullName,
                FinalAmount = item.FinalAmount,
                KoponAmount = item.KoponAmount,
                KoponCode = item.Kopon != null ? item.Kopon.Code : "",
                KoponTitle = item.Kopon != null ? item.Kopon.Title : "",
                Id = item.Id,
                KoponId = item.KoponId,
                KoponPercent = item.Kopon != null ? item.Kopon.Percent : 0,
                OrderNumber = item.OrderNumber,
                OrderStatus = item.OrderStatus,
                //ProvinceTitle = EnumHelpers.GetNameAttribute<Province>(item.Customer.Province.Value),
                OrderStatusTitle = EnumHelpers.GetNameAttribute<OrderStatus>(item.OrderStatus),
                OrderStatusRemark = item.OrderStatusRemark,
                //Province = item.Customer.Province,
                ProvinceTitle = item.ProvinceTitle,
                CityTitle = item.CityTitle,
                ParishTitle = item.ParishTitle,
                RegionTitle = item.RegionTitle,
                Items = item.OrderDetails.Select(s => new OrderDetailDto
                {
                    ProductName = s.Product.ProductName,
                    Id = s.Id,
                    BrandName = s.Product.Brand.Title,
                    ItemCount = s.ItemCount,
                    ProductId = s.ProductId,
                    OrderId = s.OrderId,
                    //Price = s.Product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault().Price,
                    //DiscountedPrice = s.Product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault().DiscountedPrice
                    Price = s.Price
                }).ToList()
            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }



        public async Task<GoldiranActionResult<List<OrderModel>>> GetDetailById(Guid userId)
        {
            var result = new GoldiranActionResult<List<OrderModel>>();

            var customer = await context.Customers.FirstOrDefaultAsync(f => f.UserId == userId);
            if (customer != null)
            {
                var items = await context.Orders.Include(i => i.Kopon).Include(i => i.OrderDetails)
                .ThenInclude(i => i.Product.Brand)
                .Include(i => i.OrderDetails)
                .OrderByDescending(q => q.CreateDate)
                .Where(q => q.CustomerId == customer.Id).Select(item => new OrderModel
                {

                    CreateDate = DateUtility.FormatShamsiDateTime(item.CreateDate),
                    FinalAmount = item.FinalAmount,
                    KoponAmount = item.KoponAmount,
                    KoponTitle = item.Kopon != null ? item.Kopon.Title : "",
                    Id = item.Id,
                    KoponId = item.KoponId,
                    KoponPercent = item.Kopon != null ? item.Kopon.Percent : 0,
                    OrderNumber = item.OrderNumber,
                    OrderStatus = item.OrderStatus,
                    OrderStatusRemark = item.OrderStatusRemark,
                    OrderStatusTitle = EnumHelpers.GetNameAttribute<OrderStatus>(item.OrderStatus),
                    Items = item.OrderDetails.Select(s => new OrderDetailDto
                    {
                        ProductName = s.Product.ProductName,
                        EnTitle = s.Product.EnName,
                        Id = s.Id,
                        BrandName = s.Product.Brand.Title,
                        ItemCount = s.ItemCount,
                        ProductId = s.ProductId,
                        OrderId = s.OrderId,
                        Price = s.Price,
                        CoverFile = context.ProductCoverAttachments.FirstOrDefault(f => f.ProductId == s.ProductId).FilePath != "" ? context.ProductCoverAttachments.FirstOrDefault(f => f.ProductId == s.ProductId).FilePath :
                        context.CategoryAttachments.FirstOrDefault(f => f.CategoryId == s.Product.CategoryId).FilePath != "" ? context.CategoryAttachments.FirstOrDefault(f => f.CategoryId == s.Product.CategoryId).FilePath : "",
                    }).ToList()
                }).ToListAsync();



                result.IsSuccess = true;
                result.Data = items;

            }
            else
            {
                result.Data = new List<OrderModel>();
            }

            return result;
        }




        public async Task<GoldiranActionResult<List<OrderDto>>> GetList(OrderFilterDto model = null)
        {
            var result = new GoldiranActionResult<List<OrderDto>>();
            int skip = (model.Page - 1) * model.Size;


            foreach (var item in model.Filtered)
            {
                if (item.column == "orderNumber" && !String.IsNullOrEmpty(item.value))
                {
                    model.OrderNumber = item.value;
                }
                if (item.column == "phoneNumber" && !String.IsNullOrEmpty(item.value))
                {
                    model.PhoneNumber = item.value;
                }
                if (item.column == "customerName" && !String.IsNullOrEmpty(item.value))
                {
                    model.CustomerName = item.value;
                }
                if (item.column == "province" && !String.IsNullOrEmpty(item.value))
                {

                    model.Province = (Province)Enum.Parse(typeof(Province), item.value);
                }

                if (item.column == "orderStatus" && !String.IsNullOrEmpty(item.value))
                {
                    model.OrderStatus = (OrderStatus)Enum.Parse(typeof(OrderStatus), item.value);
                }

            }


            var queryResult = await context.Orders.Include(i => i.Kopon).Include(i => i.Customer)
                .Include(i => i.Customer.User).Include(i => i.Customer.City)
                .Where(w =>
                ((model.Province == null) || w.Customer.Province.Value == model.Province) &&
                ((model.OrderStatus == null) || w.OrderStatus == model.OrderStatus) &&
                (string.IsNullOrEmpty(model.PhoneNumber) || w.Customer.User.PhoneNumber == model.PhoneNumber) &&
                (string.IsNullOrEmpty(model.OrderNumber) || w.OrderNumber == model.OrderNumber) &&
                (string.IsNullOrEmpty(model.CustomerName) || w.Customer.User.FullName.Contains(model.CustomerName))

                )
                .Select(s => new OrderDto
                {
                    CityId = s.CityId,
                    ProvinceId = s.ProvinceId,
                    ParishId = s.ParishId,
                    RegionId = s.RegionId,

                    Address = s.Customer.Address,
                    //City = s.Customer.City.Title,
                    CustomerId = s.CustomerId,
                    CreateDate = DateUtility.FormatShamsiDateTime(s.CreateDate),
                    CustomerName = s.Customer.User != null ? s.Customer.User.FullName : "",
                    FinalAmount = s.FinalAmount,
                    KoponAmount = s.KoponAmount,
                    KoponTitle = s.Kopon != null ? s.Kopon.Title : "",
                    PhoneNumber = s.Customer.User != null ? s.Customer.User.PhoneNumber : "",
                    Id = s.Id,
                    KoponId = s.KoponId,
                    KoponPercent = s.KoponPercent,
                    OrderNumber = s.OrderNumber,
                    OrderStatus = s.OrderStatus,
                    ProvinceTitle = s.ProvinceTitle,
                    CityTitle = s.CityTitle,
                    ParishTitle = s.ParishTitle,
                    RegionTitle = s.RegionTitle,
                    DeliveryAddress = s.DeliveryAddress,

                    OrderStatusTitle = EnumHelpers.GetNameAttribute<OrderStatus>(s.OrderStatus),
                    //Province = s.Customer.Province
                })
                .ToListAsync();




            result.Data = queryResult.Skip(skip).Take(model.Size).ToList();

            result.IsSuccess = true;
            result.Total = queryResult.Count;
            result.Size = model.Size;
            result.Page = model.Page;
            return result;
        }



        public async Task<byte[]> GetListForExcel(GridQueryModel model = null, string fileName = null)
        {
            var queryResult = await queryService.QueryAsync(model, includes: new List<string> { "Kopon", "Customer", "Customer.City", "Customer.User" }, exportToExcel: true);

            var data = queryResult.Data.Select(s => new OrderDto
            {
                Address = s.Customer.Address,
                DeliveryAddress = s.DeliveryAddress,   
                CreateDate = DateUtility.FormatShamsiDateTime(s.CreateDate),
                CustomerName = s.Customer.User != null ? s.Customer.User.FullName : "",
                FinalAmount = s.FinalAmount,
                KoponAmount = s.KoponAmount,
                KoponTitle = s.Kopon != null ? s.Kopon.Title : "",
                PhoneNumber = s.Customer.User != null ? s.Customer.User.PhoneNumber : "",
                Id = s.Id,
                KoponId = s.KoponId,
                KoponPercent = s.KoponPercent,
                OrderNumber = s.OrderNumber,
                OrderStatus = s.OrderStatus,
                ProvinceTitle = s.ProvinceTitle,
                CityTitle = s.CityTitle,
                ParishTitle = s.ParishTitle,
                RegionTitle = s.RegionTitle,

                OrderStatusTitle = EnumHelpers.GetNameAttribute<OrderStatus>(s.OrderStatus),
            }).ToList();

            var exportData = ExcelUtility.ExportToExcel<OrderDto>(data, fileName);
            return exportData;
        }



        public async Task<GoldiranActionResult<Guid>> Update(OrderInputDto model, Guid userId)
        {
            var result = new GoldiranActionResult<Guid>();

            var data = await context.Orders.Include(i => i.Customer).FirstOrDefaultAsync(f => f.Id == Guid.Parse(model.Id));
            data.OrderStatus = model.OrderStatus;
            data.OrderStatusRemark = model.OrderStatusRemark;
            var createDate = DateTime.Now;
            switch (model.OrderStatus)
            {

                case OrderStatus.InProgress:
                    data.InProgressDate = createDate;
                    await smsService.SendSmsForRequestAlerts(data.Customer.UserId, System.String.Format(MessagesFA.InProgressOrder, DateUtility.CovertToShamsi(createDate)));
                    break;
                case OrderStatus.Reject:
                    data.RejectDate = createDate;
                    await smsService.SendSmsForRequestAlerts(data.Customer.UserId, System.String.Format(MessagesFA.RejectOrder, DateUtility.CovertToShamsi(createDate)));
                    break;
                case OrderStatus.Sending:
                    data.SendingDate = createDate;
                    await smsService.SendSmsForRequestAlerts(data.Customer.UserId, System.String.Format(MessagesFA.SendingOrder, DateUtility.CovertToShamsi(createDate)));

                    break;
                case OrderStatus.Sent:
                    data.SentDate = createDate;
                    await smsService.SendSmsForRequestAlerts(data.Customer.UserId, System.String.Format(MessagesFA.SentOrder, DateUtility.CovertToShamsi(createDate)));

                    break;
                case OrderStatus.Delivered:
                    data.DeliveredDate = createDate;
                    await smsService.SendSmsForRequestAlerts(data.Customer.UserId, System.String.Format(MessagesFA.DeliveredOrder, DateUtility.CovertToShamsi(createDate)));

                    break;

            }
            var orderLog = new OrderLog
            {
                Id = Guid.NewGuid(),
                CreateDate = createDate,
                OrderStatusRemark = model.OrderStatusRemark,
                OrderStatus = model.OrderStatus,
                OrderId = data.Id,


            };
            await context.OrderLogs.AddAsync(orderLog);

            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }


        public async Task<GoldiranActionResult<Guid>> ReturnOrderByCustomer(ReturnOrderInputDto model, Guid userId)
        {
            var result = new GoldiranActionResult<Guid>();

            var data = await context.Orders.FirstOrDefaultAsync(f => f.Id == Guid.Parse(model.Id));
            if (data.OrderStatus != OrderStatus.Delivered)
            {

                result.IsSuccess = false;
                result.Message = MessagesFA.ErrorForAddData;
                return result;
            }

            data.OrderStatus = OrderStatus.ReturnByCustomer;
            data.OrderReturnByCustomerRemark = model.Remark;
            data.OrderReturnByCustomerDate = DateTime.Now;

            var orderLog = new OrderLog
            {
                Id = Guid.NewGuid(),
                CreateDate = DateTime.Now,
                OrderStatusRemark = model.Remark,
                OrderStatus = OrderStatus.ReturnByCustomer,
                OrderId = data.Id,


            };
            await context.OrderLogs.AddAsync(orderLog);

            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.ReturnOrderByCustomer;
            return result;
        }

    }
}
