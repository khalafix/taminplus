using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Media
{
    public interface ISliderService
    {
        Task<GoldiranActionResult<List<SliderDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(SliderDto model);
        Task<GoldiranActionResult<int>> Update(SliderDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<SliderDto>> GetById(int id);

    }
}
