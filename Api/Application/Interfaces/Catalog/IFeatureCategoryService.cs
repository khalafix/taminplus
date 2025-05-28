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

namespace Application.Interfaces.Catalog
{
    public interface IFeatureCategoryService
    {
        Task<GoldiranActionResult<List<FeatureCategoryDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(FeatureCategoryDto model);
        Task<GoldiranActionResult<int>> Update(FeatureCategoryDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<FeatureCategoryDto>> GetById(int id);
    }
}
