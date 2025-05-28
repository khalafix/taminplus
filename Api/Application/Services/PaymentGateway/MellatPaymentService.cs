using Application.Interfaces.PaymentGateway;
using Core.Entities;
using Core.Entities.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Common;
using Infrastructure.Models.PaymentGateway;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.PaymentGateway
{
    public class MellatPaymentService : IMellatPaymentService
    {
        private readonly PaymentConfigs paymentConfigs;
        private readonly ILogger logger;
        private readonly BIContext context;

        public MellatPaymentService(IOptions<PaymentConfigs> options, ILogger<MellatPaymentService> logger, BIContext context)
        {
            this.paymentConfigs = options.Value;
            this.logger = logger;
            this.context = context;
        }

        public async Task<GoldiranActionResult<MellatGatewaySubmissionFormDto>> SalePayment(SalePaymentRequestModel model)
        {
            logger.LogInformation("SalePayment with orderId:{0} , OrderNumber:{1}", model.OrderId, model.OrderNumber);

            var result = new GoldiranActionResult<MellatGatewaySubmissionFormDto>();
            var client = new MellatPaymentGateway.PaymentGatewayClient();
            DateTime currentDate = DateTime.Now;

            var localDate = string.Format("{0}{1}{2}", currentDate.Year, currentDate.Month, currentDate.Day);
            var localTime = string.Format("{0}{1}{2}", currentDate.Hour, currentDate.Minute, currentDate.Second);

            var paymentResult = await client.bpPayRequestAsync(paymentConfigs.TerminalId, paymentConfigs.UserName,
                paymentConfigs.UserPassword, model.OrderId, model.Amount
                 , localDate, localTime, "",
                paymentConfigs.CallBackUrl, paymentConfigs.PayerId,
                model.CustomerMobileNumber, null, null, null, null);

            string[] resultArray = paymentResult.Body.@return.Split(',');

            logger.LogInformation("SalePayment Result with orderId:{0}, result:{1} , OrderNumber:{2} ", model.OrderId, resultArray, model.OrderNumber);


            if (resultArray[0] == "0")
            {

                var paymentResultModel = new MellatGatewaySubmissionFormDto
                {
                    RefId = resultArray[1]
                };
                logger.LogInformation("SalePayment Result Is Success = true  RefId:{0}  , ordernumber:{1}", paymentResultModel.RefId, model.OrderNumber);

                result.Data = paymentResultModel;
                result.IsSuccess = true;
                return result;
            }
            logger.LogError("SalePayment Result Is Success = false  RefId:{0}  , ordernumber:{1}", "" , model.OrderNumber);

            result.IsSuccess = false;
            result.Message = string.Join(",", resultArray);
            return result;

        }

        public async Task<GoldiranActionResult<bool>> SalePaymentConfirm(MellatGatewayResponseDto model)
        {
            logger.LogInformation("SalePaymentConfirm with RefId:{0}, saleRefId:{1}", model.RefId, model.SaleReferenceId);

            var result = new GoldiranActionResult<bool>();
            var userPayment = await context.UserPayments.FirstOrDefaultAsync(q => q.RefId == model.RefId);
            if (userPayment == null)
            {
                result.IsSuccess = false;
                result.Message = model.ResCode;
                return result;
            }

            var order = await context.Orders.FindAsync(userPayment.OrderId);

            if (model.ResCode == "0")
            {
                var client = new MellatPaymentGateway.PaymentGatewayClient();

                var bpResult = await client.bpVerifyRequestAsync(paymentConfigs.TerminalId, paymentConfigs.UserName,
                                paymentConfigs.UserPassword, long.Parse(order.OrderNumber), model.SaleOrderId, model.SaleReferenceId);


                logger.LogInformation("SalePaymentConfirm Result with RefId:{0}, saleRefId:{1}, result:{2}",
                    model.RefId, model.SaleReferenceId, bpResult.Body.@return);


                if (bpResult.Body.@return == "0")
                {
                    if (order != null)
                    {
                        order.OrderStatus = OrderStatus.PaymentSuccess;
                        order.RefId = model.RefId;
                        order.CardHolderPan = model.CardHolderPan;

                        userPayment.IsSuccess = true;

                        var orderLog = new OrderLog
                        {
                            Id = Guid.NewGuid(),
                            CreateDate = DateTime.Now,
                            OrderStatusRemark = OrderStatus.PaymentSuccess.GetNameAttribute(),
                            OrderStatus = OrderStatus.PaymentSuccess,
                            OrderId = order.Id,
                        };

                        logger.LogInformation("SalePaymentConfirm Result with RefId:{0}, ordernumber:{1}, result Code:{2}, result message:{3} ",
                         model.RefId, order.OrderNumber,model.ResCode , OrderStatus.PaymentSuccess.GetNameAttribute());

                        await context.OrderLogs.AddAsync(orderLog);
                        await context.SaveChangesAsync();
                        result.IsSuccess = true;
                        return result;
                    }

                }
            }

            if (order != null)
            {
                order.OrderStatus = OrderStatus.PaymentFailed;
                userPayment.IsSuccess = false;

                var orderLog = new OrderLog
                {
                    Id = Guid.NewGuid(),
                    CreateDate = DateTime.Now,
                    OrderStatusRemark = OrderStatus.PaymentFailed.GetNameAttribute(),
                    OrderStatus = OrderStatus.PaymentFailed,
                    OrderId = order.Id

                };

                logger.LogInformation("SalePaymentConfirm Result with RefId:{0}, ordernumber:{1}, result Code:{2}, result message:{3} ",
                 model.RefId, order.OrderNumber,model.ResCode , OrderStatus.PaymentFailed.GetNameAttribute());

                await context.OrderLogs.AddAsync(orderLog);
                await context.SaveChangesAsync();
            }

            logger.LogInformation("SalePaymentConfirm Result with RefId:{0}, saleRefId:{1}, result Code:{2} , result message:{3} ",
              model.RefId, model.SaleReferenceId, model.ResCode , GetMellatMessage(model.ResCode));

            result.IsSuccess = false;
            result.Message = GetMellatMessage(model.ResCode);
            return result;

        }

        private string GetMellatMessage(string resCode)
        {
            var message = "";
            switch (resCode)
            {
                case "17":
                    message = "کاربر از انجام تراکنش منصرف شده است";
                    break;
                case "112":
                    message = "خطای سويیچ صادر کننده کارت";
                    break;
                default:
                    message = "خطایی بانکی رخ داده است";
                    break;
            }

            return message;
        }
    }
}
