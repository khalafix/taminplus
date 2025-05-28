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
    public interface IProjectService
    {
        Task<GoldiranActionResult<List<ComboItemDto>>> GetForCombo();
        Task<GoldiranActionResult<List<ProjectDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(ProjectDto model);
        Task<GoldiranActionResult<int>> Update(ProjectDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<ProjectDto>> GetById(int id);
    }
}
