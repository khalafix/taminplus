using Application.Interfaces;
using Infrastructure.Common;
using Infrastructure.Models;
using Infrastructure.Models.Project;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.ApplicationConfig
{
    public class ApplicationConfigController : BaseController
    {
        private readonly IApplicationConfigService applicationConfigService;
        public ApplicationConfigController(IApplicationConfigService applicationConfigService)
        {
            this.applicationConfigService = applicationConfigService;
        }

        /// <summary>
        ///   برگرداندن یک آیتم 
        /// </summary>
        /// <returns></returns>
        [HttpGet("Get")]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            var result = await applicationConfigService.Get();
            return Ok(result);
        }

        /// <summary>
        ///   ویرایش آیتم 
        /// </summary>
        /// <returns></returns>        
        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromForm] ApplicationConfigDto model)
        {
            if (UserType==UserType.TaminPlus)
            {
                var result = await applicationConfigService.Update(model);
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
 
        }
    }
}
