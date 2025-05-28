using Infrastructure.Common;
using Infrastructure.Models.Component;
using Infrastructure.Models.EIED;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IComboInfoService
    {
 
        Task<GoldiranActionResult<List<ComboItemDto>>> GetFeatureCategory();
        Task<List<ComboItemDto>> GetSmsType();
        Task<List<ComboItemDto>> GetRolesCombo();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetJobOpportunities();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetPagesLinkTypes();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetVideoSource();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetVideoCategory();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetSymbolWithOutParent();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetBrands();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetUserTypes();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetCities(Province provinceId);
        Task<GoldiranActionResult<List<ComboItemDto>>> GetArticleCategory();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetOrganizationLevel();
        Task<GoldiranActionResult<ComboInfoDto>> GetComboInfo(Guid userId);
        Task<GoldiranActionResult<List<ComboItemDto>>> GetDisciplinesById(int id);
        Task<GoldiranActionResult<List<ComboItemDto>>> GetDisciplines(int? organizationId = null);
        Task<GoldiranActionResult<List<ComboItemDto>>> GetPositionPlace();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetArticles(int categoryId);
        Task<GoldiranActionResult<List<ComboItemDto>>> GetVideos(int categoryId);
        Task<GoldiranActionResult<List<ComboItemDto>>> GetProducts(int categoryId);

        Task<GoldiranActionResult<List<ComboItemDto>>> GetProvince();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetProductCategory();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetOrderStatus();

        Task<GoldiranActionResult<List<ComboItemDto>>> GetDeliveryType();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetCountType();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetSaleStatus();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetUserOpinionType();

        Task<GoldiranActionResult<List<ComboItemDto>>> GetShowStatus();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetAllProductsForUser();
        Task<GoldiranActionResult<List<ComboItemDto>>> GetProductsByCategoryIdForUser(int categoryId);

    }
}
