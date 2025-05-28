using Application.Interfaces.Blog;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Catalog.Product
{
    public class GoldiranController : BaseController
    {
        private readonly IGoldiranService goldiranService;
        public GoldiranController(IGoldiranService goldiranService)
        {
            this.goldiranService = goldiranService;
        }

        /// <summary>
        ///  لیست استان - شهر - منطقه
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetBasicData/{dataType}/{parentId}")]
        public async Task<IActionResult> GetBasicData(int dataType, int parentId)
        {
            var result = await goldiranService.GetBasicData(dataType, parentId);
            return Ok(result);
        }

        /// <summary>
        ///  اطلاعات قیمت و موجودی کالا
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetPartInfo/{partNo}")]
        public async Task<IActionResult> GetPartInfo(string partNo)
        {
            var result = await goldiranService.GetPartBalanceInfo(partNo);
            return Ok(result);
        }

        /// <summary>
        ///  محله
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetParishList/{cityId}/{regionId}/{term?}")]
        public async Task<IActionResult> GetPartInfo(int cityId, int regionId, string? term)
        {
            var result = await goldiranService.GetParishList(cityId,regionId, term);
            return Ok(result);
        }
    }
}
