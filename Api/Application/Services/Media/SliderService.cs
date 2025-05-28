using Application.Interfaces;
using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Interfaces.Media;
using Core.Entities;
using Core.Entities.Blog;
using Core.Entities.Media;
using Infrastructure.Common;
using Infrastructure.Models;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using Infrastructure.Resources;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Application.Services.Media
{
    public class SliderService : ISliderService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<Slider> sliderQueryService;
        private readonly IFileService _fileService;
        private readonly string _filePath;
        private readonly Configs _configs;
        public SliderService(BIContext context,
            IGenericQueryService<Slider> sliderQueryService,
                  IFileService fileService, IOptions<Configs> options
            )
        {
            this.context = context;
            this.sliderQueryService = sliderQueryService;
            _fileService = fileService;
            _filePath = options.Value.FilePath;
            _configs = options.Value;
        }

        public async Task<GoldiranActionResult<int>> Add(SliderDto model)
        {
            var result = new GoldiranActionResult<int>();
            var item = new Slider
            {
                Abstract = model.Abstract,
                CreateDate = DateTime.Now,
                Title = model.Title,
                IsActive = model.IsActive,
                SortOrder = model.SortOrder,
                Link = model.Link,
                SeoTitle = model.SeoTitle,
                FromDate = DateUtility.ConvertToMiladi(model.FromDate).Value,
                ToDate = DateUtility.ConvertToMiladi(model.ToDate).Value,
                
            };
            await context.AddAsync(item);
            await context.SaveChangesAsync();

            #region Attachments
            await _fileService.CreateFolderNewItem(_filePath + "\\" + "Media", "SliderAttachments");

            if (model.MobileImages != null)
            {


                for (int i = 0; i < model.MobileImages.Count(); i++)
                {
                    await _fileService.SaveNewItemInFolder(model.MobileImages[i], "Media", "SliderAttachments", null, "Mobile", item.Id, DateTime.Now, Guid.NewGuid(), false);

                }
            }

            if (model.DesktopImages != null)
            {


                for (int i = 0; i < model.DesktopImages.Count(); i++)
                {
                    await _fileService.SaveNewItemInFolder(model.DesktopImages[i], "Media", "SliderAttachments", null, "DeskTop", item.Id, DateTime.Now, Guid.NewGuid(), false);

                }
            }


            #endregion



            result.IsSuccess = true;
            result.Message = MessagesFA.SaveSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<int>> Delete(int id)
        {
            var result = new GoldiranActionResult<int>();

            var item = new Slider { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<SliderDto>> GetById(int id)
        {
            var result = new GoldiranActionResult<SliderDto>();

            var item = await context.Sliders
                            .Include(i => i.SliderAttachments)
                .SingleOrDefaultAsync(q => q.Id == id);

            var model = new SliderDto()
            {
                MobileImagesAttachment = item.SliderAttachments.Where(w=>w.Device==Device.Mobile).Select(s => new FileItemDto { Entity = "SliderAttachments", FilePath = s.FilePath }).ToList(),
                DesktopAttachment = item.SliderAttachments.Where(w => w.Device == Device.DeskTop).Select(s => new FileItemDto { Entity = "SliderAttachments", FilePath = s.FilePath }).ToList(),
                FromDate = item.FromDate.ToShamsi().ToString(),
                ToDate = item.ToDate.ToShamsi().ToString(),
                IsActive = item.IsActive,
                Id = id,
                Link = item.Link,
                Abstract = item.Abstract,               
                SeoTitle = item.SeoTitle,
                SortOrder = item.SortOrder,
                Title = item.Title
            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<List<SliderDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<SliderDto>>();

            var queryResult = await sliderQueryService.QueryAsync(model);

            result.Data = queryResult.Data.Select(item => new SliderDto
            {
                FromDate = item.FromDate.ToShamsi().ToString(),
                ToDate = item.ToDate.ToShamsi().ToString(),
                IsActive = item.IsActive,
                Id = item.Id,
                Link = item.Link,
                Abstract = item.Abstract,
                SeoTitle = item.SeoTitle,
                SortOrder = item.SortOrder,
                Title = item.Title,
                IsActiveTitle = item.IsActive == true ? "فعال" : "غیر فعال",


            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;
        }

        public async Task<GoldiranActionResult<int>> Update(SliderDto model)
        {
            var result = new GoldiranActionResult<int>();

            var item = await context.Sliders
                            .Include(i => i.SliderAttachments)
                .SingleOrDefaultAsync(q => q.Id == model.Id);


            item.FromDate = DateUtility.ConvertToMiladi(model.FromDate).Value;
            item.ToDate = DateUtility.ConvertToMiladi(model.ToDate).Value;
            item.IsActive = model.IsActive;
            item.Id = model.Id;
            item.Link = item.Link;
            item.Abstract = model.Abstract;
            item.SeoTitle = model.SeoTitle;
            item.SortOrder = model.SortOrder;
            item.Title = model.Title;

            await context.SaveChangesAsync();

            await _fileService.CreateFolderNewItem(_filePath + "\\" + "Media", "SliderAttachments");

            if (model.MobileImages != null)
            {
                context.SliderAttachments.RemoveRange(item.SliderAttachments.Where(w=>w.Device==Device.Mobile).ToList());

                for (int i = 0; i < model.MobileImages.Count(); i++)
                {
                    await _fileService.SaveNewItemInFolder(model.MobileImages[i], "Media", "SliderAttachments", null, "Mobile", item.Id, DateTime.Now, Guid.NewGuid(), false);

                }

            }


            if (model.DesktopImages != null)
            {
                context.SliderAttachments.RemoveRange(item.SliderAttachments.Where(w => w.Device == Device.DeskTop).ToList());

                for (int i = 0; i < model.DesktopImages.Count(); i++)
                {
                    await _fileService.SaveNewItemInFolder(model.DesktopImages[i], "Media", "SliderAttachments", null, "DeskTop", item.Id, DateTime.Now, Guid.NewGuid(), false);

                }

            }

            result.Message = MessagesFA.UpdateSuccessful;

            result.IsSuccess = true;
            return result;
        }
    }
}
