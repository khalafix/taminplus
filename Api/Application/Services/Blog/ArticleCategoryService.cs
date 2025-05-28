using Application.Interfaces;
using Core.Entities;
using Infrastructure.Common;
using Infrastructure.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Models.User;

using System.Data.Entity.SqlServer;
using Application.Interfaces.Catalog;
using Infrastructure.Models.Catalog;
using Application.Interfaces.Blog;
using Core.Entities.Blog;
using Infrastructure.Models.EIED;

namespace Application.Services.Catalog
{
    public class ArticleCategoryService : IArticleCategoryService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<ArticleCategory> articleCategoryService;
        public ArticleCategoryService(BIContext context,
            IGenericQueryService<ArticleCategory> articleCategoryService
            )
        {
            this.context = context;
            this.articleCategoryService = articleCategoryService;
        }

        public async Task<GoldiranActionResult<int>> Add(ArticleCategoryDto model)
        {
            var result = new GoldiranActionResult<int>();
            var item = new ArticleCategory
            {
                Title = model.Title,
                IsActive = model.IsActive,
                SortOrder = model.SortOrder,
            };

            await context.AddAsync(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.SaveSuccessful;
            return result;
        }


        public async Task<GoldiranActionResult<int>> Delete(int id)
        {
            var result = new GoldiranActionResult<int>();

            var item = new ArticleCategory { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<ArticleCategoryDto>> GetById(int id)
        {
            var result = new GoldiranActionResult<ArticleCategoryDto>();

            var item = await context.ArticleCategories.SingleOrDefaultAsync(q => q.Id == id);

            var model = new ArticleCategoryDto
            {
                Id = item.Id,
                Title = item.Title,
                SortOrder = item.SortOrder,
                IsActive = item.IsActive,

            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<List<ArticleCategoryDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<ArticleCategoryDto>>();

            var queryResult = await articleCategoryService.QueryAsync(model);

            result.Data = queryResult.Data.Select(q => new ArticleCategoryDto
            {
                Id = q.Id,
                Title = q.Title,
                SortOrder = q.SortOrder,
                IsActive = q.IsActive,
                IsActiveTitle = q.IsActive == true ? "فعال" : "غیر فعال",

            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;
        }


        public async Task<GoldiranActionResult<List<ArticleCategoryDto>>> GetUserList()
        {
            var result = new GoldiranActionResult<List<ArticleCategoryDto>>();


            result.Data =await context.ArticleCategories.Where(w=>w.IsActive==true).Select(q => new ArticleCategoryDto
            {
                Id = q.Id,
                Title = q.Title,
                SortOrder = q.SortOrder,
                IsActive = q.IsActive,
                IsActiveTitle = q.IsActive == true ? "فعال" : "غیر فعال",

            }).ToListAsync();
            result.IsSuccess = true;
        
            return result;
        }


        public async Task<GoldiranActionResult<int>> Update(ArticleCategoryDto model)
        {
            var result = new GoldiranActionResult<int>();


            var item = await context.ArticleCategories.SingleOrDefaultAsync(q => q.Id == model.Id);
            item.Title = model.Title;
            item.IsActive = model.IsActive;
            item.SortOrder = model.SortOrder;

            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }
    }
}
