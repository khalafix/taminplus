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
    public interface IBrandService
    {
        Task<GoldiranActionResult<List<BrandDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<List<UserBrandDto>>> GetUserList(int count = 8);
        Task<GoldiranActionResult<List<TreeDto>>> GetBrandMegaMenu();
        Task<GoldiranActionResult<int>> Add(BrandInputModel model);
        Task<GoldiranActionResult<int>> Update(BrandInputModel model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<BrandDto>> GetById(int id);
        Task<GoldiranActionResult<List<UserBrandDto>>> GetUserListByProductCategoryId(string category);
        Task<GoldiranActionResult<List<UserProductCategoryDto>>> GetUserProductCategoryByBrandId(int brandId);
        Task<GoldiranActionResult<List<UserProductCategoryDto>>> GetUserProductCategoryByBrandTitle(string brand);
        Task<GoldiranActionResult<List<TreeDto>>> GetAllBrandMegaMenu();
        Task<GoldiranActionResult<List<BrandForDashboardChart>>> GetBrandProductsForDashboard();
    }
}
