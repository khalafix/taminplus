using Application.Interfaces.Base;
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

namespace API.Controllers.Catalog.Product
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPageController : ControllerBase
    {
        private readonly IPageService pageService;

        public UserPageController(IPageService pageService)
        {   
            this.pageService = pageService;

        }

     


        /// <summary>
        ///   برگرداندن یک صفحه 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetByTitle/{title}")]
        public async Task<IActionResult> GetByTitle(string title)
        {
            var result = await pageService.GetByTitle(title);
            return Ok(result);
        }


        /// <summary>
        ///   برگرداندن لیست id 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAllLink")]
        public async Task<IActionResult> GetAllLink()
        {
            var result = await pageService.GetAllLink();
            return Ok(result);
        }

        /// <summary>
        ///   برگرداندن لیست 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetListUserPages")]
        public async Task<IActionResult> GetListUserPages()
        {
            var result = await pageService.GetListUserPages();
            return Ok(result);
        }



    }
}
