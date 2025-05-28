using Application.Interfaces;
using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Interfaces.Support;
using Application.Services;
using Application.Services.Catalog;
using Application.Services.Support;
using Infrastructure.Common;
using Infrastructure.Models;
using Infrastructure.Models.Base;
using Infrastructure.Models.Catalog;
using Infrastructure.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Catalog.Brand
{

    public class LetMeKnowController : BaseController
    {
        private readonly ILetMeKnowService _service;
        readonly IMemoryCache cache;
        public LetMeKnowController(ILetMeKnowService service , IMemoryCache cache)
        {
            _service = service;
            this.cache = cache;

        }

        /// <summary>
        ///   خبر بده 
        /// </summary>
        /// <returns></returns>
        [HttpPost("Register")]
        public async Task<IActionResult> Add(UserLetMeKnowDto model)
        {
        
            var captchaValueFromCache = cache.Get<string>(model.CaptchaKey);
            if (captchaValueFromCache == null || captchaValueFromCache != model.Captcha)
            {
                var captchaResult = new GoldiranActionResult<string>();
                captchaResult.IsSuccess = false;
                captchaResult.Message = Messages.CaptchaInvalid;
                return Ok(captchaResult);
            }

            var result = await _service.Register(model , UserId);
            return Ok(result);
        }


        /// <summary>
        ///  لیست  افرادی که گفتن به من خبر بده ! 
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetList")]
        public async Task<IActionResult> GetList(GridQueryModel model = null)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await _service.GetList(model);
                return Ok(result);
            }
            else { return BadRequest(); }
    
        }



        /// <summary>
        ///  لیست افراد ب من خبر بده به صورت خروجی اکسل 
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetListForExcel")]
        public async Task<IActionResult> GetListForExcel()
        {
            if (UserType == UserType.TaminPlus)
            {
                var fileName = ExcelUtility.GenerateExcelFileName("LetMeKnow");
                var exportbytes = await _service.GetListForExcel(null, fileName);
                return File(exportbytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            else { return BadRequest(); }

        }


    }
}
