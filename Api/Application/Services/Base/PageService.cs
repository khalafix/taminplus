using Application.Interfaces;
using Core.Entities;
using Infrastructure.Common;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Project;
using Infrastructure.Resources;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Catalog;
using Microsoft.Extensions.Options;
using Application.Interfaces.Catalog;
using Infrastructure.Models.Catalog;
using Application.Interfaces.Base;
using Core.Entities.Base;
using Infrastructure.Models.Base;

namespace Application.Services.Base
{
    public class PageService : IPageService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<Page> _queryService;
        private readonly IFileService _fileService;
        private readonly string _filePath;
        private readonly Configs _configs;
        public PageService(BIContext context, IGenericQueryService<Page> queryService,
             IFileService fileService, IOptions<Configs> options)
        {
            this.context = context;
            _queryService = queryService;
            _fileService = fileService;
            _filePath = options.Value.FilePath;
            _configs = options.Value;
        }

        public async Task<GoldiranActionResult<int>> Add(PageInputModel model)
        {
            var result = new GoldiranActionResult<int>();


            var data = new Page
            {
                IsActive = model.IsActive,
                Title = model.Title,
                Description = model.Description,
                CreateDate = DateTime.Now,
                Link = model.Link,
                SortOrder = model.SortOrder,
                PagesLinkType = model.PagesLinkType,    
            };

            await context.AddAsync(data);
            await context.SaveChangesAsync();


            result.IsSuccess = true;
            result.Message = MessagesFA.SaveSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<int>> Delete(Guid id)
        {
            var result = new GoldiranActionResult<int>();

            var item = new Page { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<List<string>>> GetAllLink()
        {
            var result = new GoldiranActionResult<List<string>>();

            var data = await context.Pages.Select(s => s.Link).ToListAsync();

            result.IsSuccess = true;
            result.Data = data;
            return result;
        }

        public async Task<GoldiranActionResult<PageDto>> GetById(Guid id)
        {
            var result = new GoldiranActionResult<PageDto>();

            var data = await context.Pages.FirstOrDefaultAsync(f => f.Id == id);
            var model = new PageDto
            {
                Id = data.Id,
                IsActive = data.IsActive,
                Title = data.Title,
                Description = data.Description == null ? "" : data.Description,
                Link = data.Link,
                SortOrder = data.SortOrder,
                PagesLinkType = data.PagesLinkType,

            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<PageDto>> GetByTitle(string link)
        {
            var result = new GoldiranActionResult<PageDto>();

            var data = await context.Pages.FirstOrDefaultAsync(f => f.Link.Contains(link));
            var model = new PageDto
            {
                Id = data.Id,
                IsActive = data.IsActive,
                Title = data.Title,
                Description = data.Description == null ? "" : data.Description,
                Link = data.Link,
                PagesLinkType = data.PagesLinkType,

            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<List<PageDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<PageDto>>();

            var queryResult = await _queryService.QueryAsync(model);

            result.Data = queryResult.Data.Select(q => new PageDto
            {
                Id = q.Id,
                IsActive = q.IsActive,
                Title = q.Title,
                IsActiveTitle = q.IsActive == true ? "فعال" : "غیر فعال",
                Description = q.Description == null ? "" : q.Description,
                Link = q.Link,
                PagesLinkType = q.PagesLinkType,
                PagesLinkTypeTitle=q.PagesLinkType.GetNameAttribute()
            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;
        }

        public async Task<GoldiranActionResult<List<UserPageDto>>> GetListUserPages()
        {
            var result = new GoldiranActionResult<List<UserPageDto>>();


            result.Data = context.Pages.Where(w=>w.IsActive==true).OrderBy(o=>o.SortOrder).Select(q => new UserPageDto
            {
                Id = q.Id,
                Title = q.Title,
                Description = q.Description == null ? "" : q.Description,
                Link = q.Link,
                PagesLinkType = q.PagesLinkType,

            }).ToList();
            result.IsSuccess = true;
           
            return result;
        }


        public async Task<GoldiranActionResult<int>> Update(PageInputModel model)
        {
            var result = new GoldiranActionResult<int>();

            var data = await context.Pages.FirstOrDefaultAsync(f => f.Id == model.Id);
            data.Title = model.Title;
            data.IsActive = model.IsActive;
            data.Description = model.Description;
            data.Link = model.Link;
            data.SortOrder = model.SortOrder;
            data.PagesLinkType = model.PagesLinkType;   
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }

    }
}
