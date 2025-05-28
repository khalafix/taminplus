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
using Infrastructure.Models;

namespace Application.Interfaces
{
    public interface IOriginService
    {
        Task<GoldiranActionResult<List<OriginDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(OriginDto model);
        Task<GoldiranActionResult<int>> Update(OriginDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<OriginDto>> GetById(int id);
    }
}
