using Application.Interfaces.Base;
using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Interfaces.Media;
using Application.Services.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Base;
using Infrastructure.Models.Catalog;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.BaseInfo
{
    public class PageController : BaseController
    {
        private readonly IPageService pageService;
        public PageController(IPageService pageService)
        {
            this.pageService = pageService;
        }

        /// <summary>
        ///  لیست  page ها 
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetList")]
        public async Task<IActionResult> GetList(GridQueryModel model = null)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await pageService.GetList(model);
                return Ok(result);
            }
            else { return BadRequest(); }
 
        }





        /// <summary>
        ///   برگرداندن یک  page 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await pageService.GetById(id);
                return Ok(result);
            }
            else { return BadRequest(); }
 
        }

        /// <summary>
        ///     ثبت  page جدید 
        /// </summary>
        /// <returns></returns>
        [HttpPost("Add")]
        public async Task<IActionResult> Add(PageInputModel model)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await pageService.Add(model);
                return Ok(result);
            }
            else { return BadRequest(); }
 
        }



        /// <summary>
        ///   ویرایش  page
        /// </summary>
        /// <returns></returns>        
        [HttpPost("Update")]
        public async Task<IActionResult> Update(PageInputModel model)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await pageService.Update(model);
                return Ok(result);
            }
            else { return BadRequest(); }
    
        }


        /// <summary>
        ///   حذف  page 
        /// </summary>
        /// <returns></returns> 
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await pageService.Delete(id);
                return Ok(result);
            }
            else { return BadRequest(); }
   
        }


    }
}
