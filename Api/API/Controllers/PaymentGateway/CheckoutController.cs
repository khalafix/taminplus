using Application.Interfaces.PaymentGateway;
using Infrastructure.Models.Common;
using Infrastructure.Models.PaymentGateway;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace API.Controllers.PaymentGateway
{
    [Route("[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        private readonly ILogger logger;
        private readonly PaymentConfigs paymentConfigs;
        private readonly IMellatPaymentService mellatPaymentService;

        public CheckoutController(ILogger<CheckoutController> logger, IMellatPaymentService mellatPaymentService,
            IOptions<PaymentConfigs> options)
        {
            this.logger = logger;
            this.mellatPaymentService = mellatPaymentService;
            this.paymentConfigs = options.Value;
        }

        /// <summary>
        ///    دریافت داده های ارسالی از درگاه پرداخت، پس از پرداخت توسط کاربر
        /// </summary>
        /// <returns></returns>
        [HttpPost("MellatConfirm")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> MellatPaymentGatewayConfirm([FromForm] MellatGatewayResponseDto model)
        {
            logger.LogInformation("Call Action MellatPaymentGatewayConfirm with model:{0}", JsonConvert.SerializeObject(model));
            var confirmPaymentResult =await mellatPaymentService.SalePaymentConfirm(model);

            logger.LogInformation("Result Action MellatPaymentGatewayConfirm, Result:{0}", JsonConvert.SerializeObject(confirmPaymentResult));

            //عملیات موفق بوده است
            if (confirmPaymentResult.IsSuccess)
            {
                return Redirect($"{paymentConfigs.AppGatewayResult}{model.RefId}");
            }

            return Redirect($"{paymentConfigs.AppGatewayResult}{model.RefId}");
        }
    }
}
