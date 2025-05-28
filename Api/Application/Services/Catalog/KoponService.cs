using Application.Interfaces;
using Core.Entities;
using Core.Entities.Catalog;
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
    public class KoponService : IKoponService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<Kopon> queryService;
        public KoponService(BIContext context,
            IGenericQueryService<Kopon> queryService
            )
        {
            this.context = context;
            this.queryService = queryService;
        }

        public async Task<GoldiranActionResult<int>> Add(KoponDto model)
        {
            var result = new GoldiranActionResult<int>();
            if (context.Kopons.Any(a=>a.Code==model.Code))
            {

                result.IsSuccess = false;
                result.Message = MessagesFA.CodeExists;
                return result;
            }
            var item = new Kopon
            {
                Title = model.Title,
                IsActive = model.IsActive,
                Remark=model.Remark,
                Percent = model.Percent,
                FromDate = (DateTime)DateUtility.ConvertToMiladi(model.FromDate) ,
                ToDate = (DateTime)DateUtility.ConvertToMiladi(model.ToDate),
                Code = model.Code,
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

            var item = new Kopon { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<KoponDto>> GetById(int id)
        {
            var result = new GoldiranActionResult<KoponDto>();

            var item = await context.Kopons.SingleOrDefaultAsync(q => q.Id == id);

            var model = new KoponDto
            {
                Id = item.Id,
                Title = item.Title,
                IsActive = item.IsActive,
                FromDate = item.FromDate.ToShamsi().ToString(),
                ToDate = item.ToDate.ToShamsi().ToString(),
                Remark = item.Remark,
                Percent=item.Percent,
                Code=item.Code,
            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }


        public async Task<GoldiranActionResult<UserKoponDto>> GetByCode(string code)
        {
            var result = new GoldiranActionResult<UserKoponDto>();

            var item = await context.Kopons.SingleOrDefaultAsync(q => q.Code ==code);
            if (item ==null)
            {
                result.IsSuccess = false;
                result.Message = MessagesFA.KoponNotValid;
                return result;
            }

            if (item.IsActive== false || (item.ToDate < DateTime.Now))
            {
                result.IsSuccess = false;
                result.Message = MessagesFA.KoponExpired;
                return result;
            }

            if (item.IsActive == false || (item.FromDate > DateTime.Now))
            {
                result.IsSuccess = false;
                result.Message = MessagesFA.KoponExpired;
                return result;
            }

            var model = new UserKoponDto
            {
               Percent = item.Percent,
                Code = item.Code,
            };
            result.Message=MessagesFA.KoponIsActived;
            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<List<KoponDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<KoponDto>>();

            var queryResult = await queryService.QueryAsync(model);

            result.Data = queryResult.Data.Select(q => new KoponDto
            {
                Id = q.Id,
                Title = q.Title,
                IsActive = q.IsActive,
                IsActiveTitle = q.IsActive == true ? "فعال" : "غیر فعال",
                Percent = q.Percent,
                FromDate = q.FromDate.ToShamsi().ToString(),
                ToDate = q.ToDate.ToShamsi().ToString(),
                Remark = q.Remark,
                Code=q.Code,
            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;
        }




        public async Task<GoldiranActionResult<int>> Update(KoponDto model)
        {
            var result = new GoldiranActionResult<int>();
            if (context.Kopons.Any(a => a.Code == model.Code && model.Id!=a.Id))
            {

                result.IsSuccess = false;
                result.Message = MessagesFA.CodeExists;
                return result;
            }

            var item = await context.Kopons.SingleOrDefaultAsync(q => q.Id == model.Id);
            item.Title = model.Title;
            item.IsActive = model.IsActive;
            item.Remark = model.Remark;
            item.Percent = model.Percent;
            item.FromDate = (DateTime)DateUtility.ConvertToMiladi(model.FromDate);
            item.ToDate = (DateTime)DateUtility.ConvertToMiladi(model.ToDate);
            item.Code = model.Code;

            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }
    }
}
