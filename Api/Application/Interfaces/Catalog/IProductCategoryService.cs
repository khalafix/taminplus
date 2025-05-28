using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Catalog
{
    public interface IProductCategoryService
    {
        Task<GoldiranActionResult<List<ProductCategoryDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(ProductCategoryDto model);
        Task<GoldiranActionResult<int>> Update(ProductCategoryDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<ProductCategoryDto>> GetById(int id);
        Task<GoldiranActionResult<List<TreeDto>>> GetTree(int? parentId = null);
        Task<GoldiranActionResult<List<FeatureDto>>> GetFeatures(int categoryId);
        Task<GoldiranActionResult<List<TreeDto>>> Search(string text, string code);
        Task<GoldiranActionResult<List<FeatureDto>>> GetFeaturesForSearch(int categoryId);
        Task<GoldiranActionResult<ProductCategoryForDashboardDto>> GetProductCategoryForDashboard();
        Task<GoldiranActionResult<List<UserProductCategoryDto>>> GetUserList(int count = 8);
        Task<GoldiranActionResult<List<UserProductCategoryDto>>> GetUserByParentId(int count = 8, string category = "");
        Task<GoldiranActionResult<List<TreeDto>>> GetCategoriesForMegaMenu();
        Task<GoldiranActionResult<List<UserProductCategoryDto>>> GetUserAllList();
        Task<GoldiranActionResult<List<UserProductCategoryDto>>> GetUserById(int id = 1);
        Task<GoldiranActionResult<List<UserFeatureDto>>> GetFeaturesByCategoryId(string category, string brand);
        Task<GoldiranActionResult<List<UserFeatureDto>>> GetFeatureOptionByCategoryId(int categoryId);

        Task<GoldiranActionResult<List<TreeDto>>> GetCategoryByParentId(string category);
        Task<GoldiranActionResult<List<FeatureProductDto>>> GetFeatureOptionByCategory(string category);
        Task<List<TreeDto>> GetCategoryWithBrands(string category);
        Task<GoldiranActionResult<FeatureDto>> GetFeaturesByTitle(string category);

        Task<GoldiranActionResult<List<TreeDto>>> GetSubCategoryByCategoryAndBrand(string category, string brand);
        Task<GoldiranActionResult<List<UserFeatureDto>>> GetFeaturesBySubCategoryId(string category, string brand  , string subCategory);
    }
}