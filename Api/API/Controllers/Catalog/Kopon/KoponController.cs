using Application.Interfaces.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Catalog.Kopon
{
    public class KoponController : BaseController
    {
        private readonly IKoponService koponService;
        public KoponController(IKoponService koponService)
        {
            this.koponService = koponService;
        }

        /// <summary>
        ///  لیست Kopon 
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetList")]
        public async Task<IActionResult> GetList(GridQueryModel model = null)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await koponService.GetList(model);
                return Ok(result);
            }
            else { return BadRequest(); }

 
        }




        /// <summary>
        ///   برگرداندن Kopon 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await koponService.GetById(id);
                return Ok(result);
            }
            else { return BadRequest(); }
     
        }







        /// <summary>
        ///     ثبت Kopon 
        /// </summary>
        /// <returns></returns>
        [HttpPost("Add")]
        public async Task<IActionResult> Add(KoponDto model)
        {

            if (UserType == UserType.TaminPlus)
            {
                var result = await koponService.Add(model);
                return Ok(result);
            }
            else { return BadRequest(); }
 
        }



        /// <summary>
        ///   ویرایش Kopon  
        /// </summary>
        /// <returns></returns>        
        [HttpPost("Update")]
        public async Task<IActionResult> Update(KoponDto model)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await koponService.Update(model);
                return Ok(result);
            }
            else { return BadRequest(); }
  
        }


        /// <summary>
        ///   حذف Kopon 
        /// </summary>
        /// <returns></returns> 
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await koponService.Delete(id);
                return Ok(result);
            }
            else { return BadRequest(); }
 
        }


    }
}
