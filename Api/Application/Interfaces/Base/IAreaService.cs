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
using BIDashboard.Dtos.User;

namespace Application.Interfaces
{
    public interface IAreaService
    {
        Task<GoldiranActionResult<List<AreaDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(AreaDto model);
        Task<GoldiranActionResult<int>> Update(AreaDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<AreaDto>> GetById(int id);
    }
}
