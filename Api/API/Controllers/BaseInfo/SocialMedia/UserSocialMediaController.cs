using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Services.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Catalog.Brand
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSocialMediaController : ControllerBase
    {
        private readonly ISocialMediaService _service;
        public UserSocialMediaController(ISocialMediaService service)
        {
            _service = service;
        }
        /// <summary>
        ///   برگرداندن  SocialMediaController 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetUserList/{count}")]
        public async Task<IActionResult> GetUserList(int count)
        {
            var result = await _service.GetUserList(count);
            return Ok(result);
        }


    }
}
