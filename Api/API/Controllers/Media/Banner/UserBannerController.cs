using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Interfaces.Media;
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

namespace API.Controllers.Media.Video
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserBannerController : ControllerBase
    {
        private readonly IBannerService bannerService;
        public UserBannerController(IBannerService bannerService)
        {
            this.bannerService = bannerService;
        }

        /// <summary>
        ///  لیست  banner  
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetUserList/{positionPlace}")]
        public async Task<IActionResult> GetUserList(PositionPlace positionPlace)
        {
            var result = await bannerService.GetUserList(positionPlace);
            return Ok(result);
        }





    }
}
