using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Media
{
    public interface IBannerService
    {
        Task<GoldiranActionResult<List<BannerDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(BannerDto model);
        Task<GoldiranActionResult<int>> Update(BannerDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<BannerDto>> GetById(int id);
        Task<GoldiranActionResult<UserBannerDto>> GetUserList(PositionPlace positionPlace);
    }
}
