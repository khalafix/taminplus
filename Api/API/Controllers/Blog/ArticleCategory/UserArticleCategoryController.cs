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

namespace API.Controllers.Catalog.Product
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserArticleCategoryController : ControllerBase
    {
        private readonly IArticleCategoryService articleCategoryService;

        public UserArticleCategoryController(IArticleCategoryService articleCategoryService)
        {
            this.articleCategoryService = articleCategoryService;
        }


        /// <summary>
        ///   برگرداندن یک مقاله 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await articleCategoryService.GetById(id);
            return Ok(result);
        }


        /// <summary>
        ///   برگرداندن یک مقاله 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetUserList")]
        public async Task<IActionResult> GetUserList()
        {
            var result = await articleCategoryService.GetUserList();
            return Ok(result);
        }







    }
}
