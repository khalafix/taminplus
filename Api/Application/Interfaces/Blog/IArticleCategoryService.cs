using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using Infrastructure.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Blog
{
    public interface IArticleCategoryService
    {
        Task<GoldiranActionResult<List<ArticleCategoryDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(ArticleCategoryDto model);
        Task<GoldiranActionResult<int>> Update(ArticleCategoryDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<ArticleCategoryDto>> GetById(int id);
        Task<GoldiranActionResult<List<ArticleCategoryDto>>> GetUserList();
    }
}