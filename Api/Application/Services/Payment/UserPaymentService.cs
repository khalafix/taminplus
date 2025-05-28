using Application.Interfaces;
using Core.Entities;
using Infrastructure.Common;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Project;
using Infrastructure.Resources;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

using Application.Interfaces.Base;
using Core.Entities.Base;
using Infrastructure.Models.Base;
using Infrastructure.Models;
using Core.Entities.Payment;
using Infrastructure.Models.Payment;
using Application.Services.PaymentGateway;
using Application.Interfaces.PaymentGateway;
using Infrastructure.Models.PaymentGateway;
using Newtonsoft.Json.Schema;
using Org.BouncyCastle.Asn1.Ocsp;
using System.ServiceModel.Channels;
using BIDashboard.Dtos.User;
using Microsoft.Extensions.Logging;
using Infrastructure.Models.Support;
using AutoMapper.Configuration.Annotations;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using BI.Application.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Org.BouncyCastle.Asn1.Crmf;
using Infrastructure.Models.Common;
using Core.Entities.Catalog;
using Infrastructure.Models.Catalog;

namespace Application.Services.Base
{
    public class UserPaymentService : IUserPaymentService
    {
        private readonly BIContext context;

        private readonly ILogger logger;
        private readonly IUserService userService;
        private readonly ISmsService smsService;
        private readonly IComboInfoService comboInfoService;
        private readonly IMellatPaymentService mellatPaymentService;


        public UserPaymentService(BIContext context, ILogger<UserPaymentService> logger, IUserService userService, ISmsService smsService, IComboInfoService comboInfoService, IMellatPaymentService mellatPaymentService)
        {
            this.context = context;
            this.logger = logger;
            this.userService = userService;
            this.smsService = smsService;
            this.comboInfoService = comboInfoService;
            this.mellatPaymentService = mellatPaymentService;
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

        public async Task<GoldiranActionResult<UserPaymenstDto>> AddUserPayment(AddPaymentDto model, Guid userId)
        {
            var result = new GoldiranActionResult<UserPaymenstDto>();

            var customer = await context.Customers.Include(i => i.User).FirstOrDefaultAsync(f => f.UserId == userId);

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
            var order = await context.Orders.Include(i => i.OrderDetails).FirstOrDefaultAsync(f => f.Id == model.OrderId);
            if (order != null)
            {
                if (order.OrderStatus != OrderStatus.Register && order.OrderStatus != OrderStatus.PaymentFailed)
                {
                    result.IsSuccess = false;
                    result.Message = MessagesFA.ItisNotPossibleToPay;
                    return result;
                }

            }

            long originalAmount = 0;
            var listOrderDetail = new List<OrderDetail>();

            foreach (var item in order.OrderDetails)
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
                        product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault().DiscountedPrice : product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault().Price != 0 ? product.FinancialProducts.OrderByDescending(o => o.CreateDate).FirstOrDefault().Price : 0;

                    }



                    originalAmount += item.ItemCount > 0 ? (price * item.ItemCount) : price;


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
            var saleReferenceId = Nanoid.Nanoid.Generate("0123456789", 8).ToString();


            while (await context.Orders.AnyAsync(a => a.SaleReferenceId == saleReferenceId))
            {
                saleReferenceId = Nanoid.Nanoid.Generate("0123456789", 8).ToString();
            }

            order.SaleReferenceId = saleReferenceId;
            order.FinalAmount = finalAmount;
            order.KoponAmount = koponAmount;
            order.KoponId = kopon != null ? kopon.Id : null;
            order.KoponPercent = kopon != null ? kopon.Percent : 0;
            order.CityId = customer.GoldIranCityId;
            order.DeliveryAddress = customer.DeliveryAddress;
            order.ParishId = customer.ParishId;
            order.RegionId = customer.RegionId;
            order.ProvinceId = customer.GoldIranProvinceId;
            order.RegionTitle = customer.RegionTitle;
            order.ParishTitle = customer.ParishTitle;
            order.CityTitle = customer.CityTitle;
            order.ProvinceTitle = customer.ProvinceTitle;

            logger.LogInformation("AddUserPayment Service with orderId:{0} , ordernumber:{1}", order.Id, order.OrderNumber);


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

            logger.LogInformation("Add UserPayment saleorderId:{0}  , ordernumber:{1}", saleModel.OrderId, order.OrderNumber);

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
                logger.LogInformation("Add UserPayment Service  success, bankPaymentResult.IsSuccess with Message:{0} , RefId:{0}  , ordernumber:{1} ",
                    bankPaymentResult.Message, order.RefId, order.OrderNumber);


                result.Data.MobileNo = customer.User.UserName;
                await context.SaveChangesAsync();
                result.IsSuccess = true;

                return result;
            }

            if (!bankPaymentResult.IsSuccess)
            {
                logger.LogError("Add UserPayment Service not success, !bankPaymentResult.IsSuccess with Message:{0}", bankPaymentResult.Message);


                //var userPayments = await context.UserPayments.FirstOrDefaultAsync(q => q.OrderId == order.Id);

                //userPayment.IsSuccess = false;
                //order.OrderStatus = OrderStatus.PaymentFailed;
                //await context.SaveChangesAsync();
                result.Message = MessagesFA.ErrorForCommunicationOnlinePayment;
                result.IsSuccess = false;

                return result;
            }

            return result;
        }
        public async Task<GoldiranActionResult<List<UserPaymenstDto>>> GetUserAllPayments(UserPaymentFilterDto model, Guid userId)
        {
            var result = new GoldiranActionResult<List<UserPaymenstDto>>();
            var skipCount = (model.Page - 1) * model.Size;
            var userData = await context.Users.FindAsync(userId);
            if (userData.UserType == UserType.Customer)
            {
                result.IsSuccess = false;

                result.Message = MessagesFA.YouDoNotHaveAccess;
                return result;
            }
            var filterModel = new UserPaymentFilterDto();

            foreach (var item in model.Filtered)
            {
                if (item.column == "title")
                {
                    filterModel.Title = item.value;
                }
                if (item.column == "firstName")
                {
                    filterModel.FirstName = item.value;
                }
                if (item.column == "lastName")
                {
                    filterModel.LastName = item.value;
                }
                if (item.column == "mobile")
                {
                    filterModel.Mobile = item.value;
                }

                if (item.column == "isSuccess")
                {
                    filterModel.IsSuccess = Convert.ToBoolean(item.value);
                }
                if (item.column == "fromDate")
                {
                    filterModel.FromDate = Convert.ToDateTime(item.value);
                }
                if (item.column == "toDate")
                {
                    filterModel.ToDate = Convert.ToDateTime(item.value);
                }
                if (item.column == "token")
                {
                    filterModel.Token = item.value;
                }
            }




            var query = context.UserPayments.Include(i => i.Order)
                .Include(i => i.User)
                .Where(q =>
                    (string.IsNullOrEmpty(filterModel.Mobile) || q.User.UserName.Contains(filterModel.Mobile)) &&
                    (string.IsNullOrEmpty(filterModel.FirstName) || q.User.FirstName.Contains(filterModel.FirstName)) &&
                    (string.IsNullOrEmpty(filterModel.LastName) || q.User.LastName.Contains(filterModel.LastName)) &&
                    (filterModel.IsSuccess == null || q.IsSuccess == filterModel.IsSuccess) &&
                    (filterModel.FromDate == null || q.OrderDate.Date >= filterModel.FromDate.Value) &&
                    (filterModel.ToDate == null || q.OrderDate.Date <= filterModel.ToDate.Value) &&
                    (filterModel.Token == null || q.TrackingCode == filterModel.Token)

                )
            .AsQueryable();


            var tempResult = query.Select(q => new UserPaymenstDto
            {
                OrderNumber = q.Order.OrderNumber,
                FirstName = q.User.FirstName,
                LastName = q.User.LastName,
                Amount = q.Amount,
                Token = q.TrackingCode,
                PaymentResult = q.PaymentResult,
                BankConfirmResult = q.BankConfirmResult,
                OrderDate = DateUtility.CovertToShamsi(q.OrderDate),
                Status = q.IsSuccess == null ? "پرداخت ناموفق" : q.IsSuccess == true ? " پرداخت موفق" : "پرداخت ناموفق"
            }).ToList();
            tempResult = tempResult.Where(w => (string.IsNullOrEmpty(filterModel.Title) || w.Title.Contains(filterModel.Title))).ToList();

            tempResult = tempResult.OrderByDescending(q => q.OrderDate).Skip(skipCount).Take(model.Size).ToList();

            result.Data = tempResult;
            result.IsSuccess = true;
            result.Total = query.Count();
            result.Size = model.Size;
            result.Page = model.Page;
            return result;
        }
        public async Task<GoldiranActionResult<List<UserPaymenstModel>>> GetUserAllPaymentsForUser(Guid userId)
        {
            var result = new GoldiranActionResult<List<UserPaymenstModel>>();

            var filterModel = new UserPaymentFilterDto();





            var query = context.UserPayments
                .Include(i => i.User)
                .Where(q =>
                q.UserId == userId

                )
            .OrderByDescending(q => q.OrderDate).AsQueryable();


            var tempResult = query.Select(q => new UserPaymenstModel
            {
                OrderNumber = q.OrderValue,
                Amount = q.Amount,
                Token = q.TrackingCode,
                OrderDate = DateUtility.CovertToShamsi(q.OrderDate),
                Status = q.IsSuccess == null ? "پرداخت ناموفق" : q.IsSuccess == true ? " پرداخت موفق" : "پرداخت ناموفق"
            }).ToList();

            result.Data = tempResult;
            result.IsSuccess = true;

            return result;
        }

        public async Task<GoldiranActionResult<BankResultDto>> GetBankResult(string refId, Guid userId)
        {
            var result = new GoldiranActionResult<BankResultDto>();
            result.Data = new BankResultDto();


            var userPayment = await context.UserPayments.Include(i => i.Order).FirstOrDefaultAsync(q => q.TrackingCode == refId && q.UserId == userId);
            result.Data.Status = userPayment.IsSuccess == true ? 1 : 0;
            result.Data.Amount = userPayment.Amount;
            result.Data.OrderNumber = userPayment.OrderValue;

            result.Data.Token = userPayment.TrackingCode;

            if (userPayment == null)
            {
                result.IsSuccess = false;
                result.Message = MessagesFA.InvalidToken;
                result.Data.Message = MessagesFA.InvalidToken;
                return result;
            }

            if (userPayment.IsSuccess == true)
            {
                userPayment.Order.OrderStatus = OrderStatus.PaymentSuccess;
            }
            else
            {
                userPayment.Order.OrderStatus = OrderStatus.PaymentFailed;
            }
            await context.SaveChangesAsync();

            result.IsSuccess = userPayment.IsSuccess == true ? true : false;
            result.Data.Amount = userPayment.Amount;
            result.Data.Token = userPayment.TrackingCode;
            result.Message = userPayment.IsSuccess == true ? MessagesFA.PaymentWasSuccessful : MessagesFA.PaymentWasUnsuccessful;
            result.Data.Message = userPayment.PaymentResult;
            return result;
        }

    }
}
