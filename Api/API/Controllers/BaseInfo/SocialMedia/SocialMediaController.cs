using Application.Interfaces.Base;
using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Interfaces.Media;
using Application.Services.Base;
using Application.Services.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Base;
using Infrastructure.Models.Catalog;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.BaseInfo
{
    public class SocialMediaController : BaseController
    {
        private readonly ISocialMediaService service;
        public SocialMediaController(ISocialMediaService service)
        {
            this.service = service;
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
                var result = await service.GetList(model);
                return Ok(result);
            }
            else { return BadRequest(); }
      
        }

        /// <summary>
        ///     ثبت SocialMedia
        /// </summary>
        /// <returns></returns>
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromForm, FromBody] SocialMediaInputModel model)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await service.Add(model);
                return Ok(result);
            }
            else { return BadRequest(); }
          
        }



        /// <summary>
        ///   ویرایش SocialMedia 
        /// </summary>
        /// <returns></returns>        
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromForm, FromBody] SocialMediaInputModel model)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await service.Update(model);
                return Ok(result);
            }
            else { return BadRequest(); }
    
        }




        /// <summary>
        ///   برگرداندن یک  SocialMedia 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await service.GetById(id);
            return Ok(result);
        }

        /// <summary>
        ///   حذف  SocialMedia
        /// </summary>
        /// <returns></returns> 
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await service.Delete(id);
                return Ok(result);
            }
            else { return BadRequest(); }
       
        }


    }
}
