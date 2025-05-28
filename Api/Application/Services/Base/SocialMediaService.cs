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
using Infrastructure.Models.User;
using Org.BouncyCastle.Utilities;
using System.Drawing.Drawing2D;
using Infrastructure.Models;
using Core.Entities.Base;
using Infrastructure.Models.Base;

namespace Application.Services.Catalog
{
    public class SocialMediaService : ISocialMediaService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<SocialMedia> _queryService;
        private readonly IFileService _fileService;
        private readonly string _filePath;
        private readonly Configs _configs;
        public SocialMediaService(BIContext context, IGenericQueryService<SocialMedia> queryService,
             IFileService fileService, IOptions<Configs> options)
        {
            this.context = context;
            _queryService = queryService;
            _fileService = fileService;
            _filePath = options.Value.FilePath;
            _configs = options.Value;
        }

        public async Task<GoldiranActionResult<int>> Add(SocialMediaInputModel model)
        {
            var result = new GoldiranActionResult<int>();


            var data = new SocialMedia
            {
                IsActive = model.IsActive,
                Title = model.Title,
                Description = model.Description,
                CreateDate = DateTime.Now,
                Link=model.Link,
                
            };

            await context.AddAsync(data);
            await context.SaveChangesAsync();

            if (model.File != null)
            {
                await _fileService.CreateFolderNewItem(_filePath + "\\" + "Base", "SocialMediaAttachments");

                for (int i = 0; i < model.File.Count(); i++)
                {
                    await _fileService.SaveNewItemInFolder(model.File[i], "Base", "SocialMediaAttachments", null, null, data.Id, DateTime.Now, Guid.NewGuid(), false);

                }
            }

            result.IsSuccess = true;
            result.Message = MessagesFA.SaveSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<int>> Delete(int id)
        {
            var result = new GoldiranActionResult<int>();

            var item = new SocialMedia { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }




        public async Task<GoldiranActionResult<SocialMediaDto>> GetById(int id)
        {
            var result = new GoldiranActionResult<SocialMediaDto>();

            var data = await context.SocialMedias.Include(q => q.SocialMediaAttachments).FirstOrDefaultAsync(f => f.Id == id);
            var model = new SocialMediaDto
            {
                Id = data.Id,
                IsActive = data.IsActive,
                Title = data.Title,
                Link = data.Link,
                Description = data.Description == null ? "" : data.Description,
                File = data.SocialMediaAttachments.Select(s => new FileItemDto { Entity = "SocialMediaAttachments", FilePath = s.FilePath }).ToList(),
            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<List<SocialMediaDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<SocialMediaDto>>();

            var queryResult = await _queryService.QueryAsync(model, null, new List<string>() { "SocialMediaAttachments" });

            result.Data = queryResult.Data.Select(q => new SocialMediaDto
            {
                Id = q.Id,
                IsActive = q.IsActive,
                Title = q.Title,
                IsActiveTitle = q.IsActive == true ? "فعال" : "غیر فعال",
                Description = q.Description == null ? "" : q.Description,
                Link=q.Link,    
                File = q.SocialMediaAttachments.Select(s => new FileItemDto { Entity = "SocialMediaAttachments", FilePath = s.FilePath }).ToList(),
            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;
        }

        public async Task<GoldiranActionResult<List<UserSocialMediaDto>>> GetUserList(int count = 8)
        {
            var result = new GoldiranActionResult<List<UserSocialMediaDto>>();


            result.Data = await context.SocialMedias.Include(i => i.SocialMediaAttachments).Where(w => w.IsActive == true).Select(q => new UserSocialMediaDto
            {
                Id = q.Id,
                Title = q.Title,
                Link=q.Link,
                File = q.SocialMediaAttachments.FirstOrDefault().FilePath,
            }).Take(count).ToListAsync();
            result.IsSuccess = true;

            return result;

        }



        public async Task<GoldiranActionResult<int>> Update(SocialMediaInputModel model)
        {
            var result = new GoldiranActionResult<int>();

            var data = await context.SocialMedias.Include(q => q.SocialMediaAttachments).FirstOrDefaultAsync(f => f.Id == model.Id);
            data.Title = model.Title;
            data.IsActive = model.IsActive;
            data.Description = model.Description;
            data.Link = model.Link;
           
            if (model.File != null)
            {
                await _fileService.CreateFolderNewItem(_filePath + "\\" + "Base", "SocialMediaAttachments");

                foreach (var item in data.SocialMediaAttachments)
                {
                    context.SocialMediaAttachments.Remove(item);
                }
                for (int i = 0; i < model.File.Count(); i++)
                {
                    await _fileService.SaveNewItemInFolder(model.File[i], "Base", "SocialMediaAttachments", null, null, data.Id, DateTime.Now, Guid.NewGuid(), false);

                }
            }


            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }

    }
}
