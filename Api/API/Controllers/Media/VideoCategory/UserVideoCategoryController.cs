using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Media.VideoCategory
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserVideoCategoryController : ControllerBase
    {
        private readonly IVideoCategoryService videoCategoryService;

        public UserVideoCategoryController(IVideoCategoryService videoCategoryService)
        {
            this.videoCategoryService = videoCategoryService;
        }


        /// <summary>
        ///   برگرداندن یک ویدیو 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await videoCategoryService.GetById(id);
            return Ok(result);
        }


        /// <summary>
        ///   لیست گروه بندی ویدیو 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetUserList")]
        public async Task<IActionResult> GetUserList()
        {
            var result = await videoCategoryService.GetUserList();
            return Ok(result);
        }







    }
}
