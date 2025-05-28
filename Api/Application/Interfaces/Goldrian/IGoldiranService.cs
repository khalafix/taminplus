using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Goldiran;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Blog
{
    public interface IGoldiranService
    {
        Task<GoldiranActionResult<PartBalanceInfoDto>> GetPartBalanceInfo(string partNo);
        Task<GoldiranActionResult<List<KeyValueDto>>> GetBasicData(int datatype, int parentId);
        Task<GoldiranActionResult<List<ParishItemDto>>> GetParishList(int cityId, int regionId, string term);
        Task<GoldiranActionResult<string>> RegisterOnlineSale(RegisterOnlineSaleDto data);
    }
}
