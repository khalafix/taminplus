using Application.Interfaces;
using Application.Interfaces.Base;
using BI.Application.Interfaces;
using Infrastructure.Common;
using Infrastructure.Models;
using Infrastructure.Models.Base;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Sms
{
    public class SmsController : BaseController
    {
        private readonly ISmsService service;
        private readonly IUserService userService;

        public SmsController(ISmsService service, IUserService userService)
        {
            this.service = service;
            this.userService = userService;

        }


        /// <summary>
        ///      چک کردن کد ارسالی کاربر برای تایید شماره موبایل
        /// </summary>
        /// <returns></returns>
        [HttpGet("CheckCodeSmSForPhoneNumber/{code}")]
        public async Task<IActionResult> CheckCodeSmSForPhoneNumber(string code)
        {
            var result = await service.CheckCodeSmSForPhoneNumber(code, UserId);
            return Ok(result);
        }



        /// <summary>
        ///      Sms Panel
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetList")]
        public async Task<IActionResult> GetList(GridQueryModel model = null)
        {
            if (UserType==UserType.TaminPlus)
            {
                var result = await service.GetList(model);
                return Ok(result);
            }
            else { return BadRequest(); }
           
        }




        /// <summary>
        ///     ارسال پیامک برای کاربر برای شماره موبایل کاربر
        /// </summary>
        /// <returns></returns>
        [HttpGet("SendSmsForConfirmPhoneNumber/{phoneNumber}")]
        public async Task<IActionResult> SendSmsForConfirmPhoneNumber(string phoneNumber)
        {
            var result = await service.SendSmsForConfirmPhoneNumber(UserId, phoneNumber);
            return Ok(result);
        }


    }
}
