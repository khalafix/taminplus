using Application.Interfaces.Base;
using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Interfaces.Media;
using Application.Interfaces.Support;
using Application.Services.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Base;
using Infrastructure.Models.Catalog;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.BaseInfo
{
    public class CooperationFormController : BaseController
    {
        private readonly ICooperationFormService service;
        public CooperationFormController(ICooperationFormService service)
        {
            this.service = service;
        }
        /// <summary>
        ///  لیست  همکاری با ما ها 
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
        ///   برگرداندن جزییات همکاری با ما 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await service.GetById(id);
            return Ok(result);
        }



    }
}
