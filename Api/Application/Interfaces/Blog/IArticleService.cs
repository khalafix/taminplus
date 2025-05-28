using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Blog
{
    public interface IArticleService
    {
        Task<GoldiranActionResult<List<ArticleDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<List<UserArticleDto>>> GetLastArticle();

        Task<GoldiranActionResult<int>> Add(ArticleDto model);
        Task<GoldiranActionResult<int>> Update(ArticleDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<ArticleDto>> GetById(int id);
        Task<GoldiranActionResult<List<UserArticleDto>>> GetUserList(GridQueryModel model = null);
        Task<GoldiranActionResult<List<int>>> GetAllId();
    }
}
