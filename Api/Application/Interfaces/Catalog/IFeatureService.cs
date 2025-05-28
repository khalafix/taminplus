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
using Infrastructure.Models.Catalog;

namespace Application.Interfaces.Catalog
{
    public interface IFeatureService
    {
        Task<GoldiranActionResult<List<FeatureDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(FeatureDto model);
        Task<GoldiranActionResult<int>> Update(FeatureDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<FeatureDto>> GetById(int id);
        Task<GoldiranActionResult<List<FeatureDto>>> GetByFeaturesCategoryId(int? id);
    }
}
