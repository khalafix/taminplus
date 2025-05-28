using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Interfaces.Support;
using Application.Services.Catalog;
using Application.Services.Support;
using Infrastructure.Common;
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
    [Route("api/[controller]")]
    [ApiController]
    public class UserContactFormController : ControllerBase
    {
        private readonly IContactFormService _service;
        readonly IMemoryCache cache;
        public UserContactFormController(IContactFormService service , IMemoryCache cache)
        {
            _service = service;
            this.cache = cache;

        }

        /// <summary>
        ///     ثبت فرم همکاری با ما
        /// </summary>
        /// <returns></returns>
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromForm, FromBody] ContactFormInputModel model)
        {
        
            var captchaValueFromCache = cache.Get<string>(model.CaptchaKey);
            if (captchaValueFromCache == null || captchaValueFromCache != model.Captcha)
            {
                var captchaResult = new GoldiranActionResult<string>();
                captchaResult.IsSuccess = false;
                captchaResult.Message = Messages.CaptchaInvalid;
                return Ok(captchaResult);
            }

            var result = await _service.Add(model);
            return Ok(result);
        }



    }
}
