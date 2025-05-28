using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Project;
using Infrastructure.Models.User;
using BIDashboard.Dtos;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.Base;

namespace Application.Interfaces.Base
{
    public interface ICityService
    {

        Task<GoldiranActionResult<List<CityDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(CityInputModel model);
        Task<GoldiranActionResult<int>> Update(CityInputModel model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<CityDto>> GetById(int id);
    }
}
