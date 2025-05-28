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
using Infrastructure.Models;

namespace Application.Services
{
    public class OriginService : IOriginService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<Origin> _queryService;

        public OriginService(BIContext context, IGenericQueryService<Origin> queryService
 )
        {
            this.context = context;
            _queryService = queryService;
        }

        public async Task<GoldiranActionResult<int>> Add(OriginDto model)
        {
            var result = new GoldiranActionResult<int>();
            var data = new Origin
            {
                IsActive = model.IsActive,
                Title = model.Title,
            };

            await context.AddAsync(data);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.SaveSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<int>> Delete(int id)
        {
            var result = new GoldiranActionResult<int>();

            var item = new Origin { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<OriginDto>> GetById(int id)
        {
            var result = new GoldiranActionResult<OriginDto>();

            var data = await context.Origins.FindAsync(id);
            var model = new OriginDto
            {
                Id = data.Id,
                IsActive = data.IsActive,
                Title = data.Title,
            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<List<OriginDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<OriginDto>>();

            var queryResult = await _queryService.QueryAsync(model);

            result.Data = queryResult.Data.Select(q => new OriginDto
            {
                Id = q.Id,
                IsActive = q.IsActive,
                Title = q.Title,
                IsActiveTitle=q.IsActive==true ?"Active" : "InActive"
            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;
        }

        public async Task<GoldiranActionResult<int>> Update(OriginDto model)
        {
            var result = new GoldiranActionResult<int>();

            var data = await context.Origins.FindAsync(model.Id);
            data.Title = model.Title;
            data.IsActive = model.IsActive;
            
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }
    }
}
