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
using Infrastructure.Models.User;
using Core.Entities.Catalog;

namespace Application.Services
{
    public class SymbolService : ISymbolService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<Symbol> _queryService;

        public SymbolService(BIContext context, IGenericQueryService<Symbol> queryService
 )
        {
            this.context = context;
            _queryService = queryService;
        }

        public async Task<GoldiranActionResult<int>> Add(SymbolDto model)
        {
            var result = new GoldiranActionResult<int>();
            var data = new Symbol
            {
                IsActive = model.IsActive,
                Title = model.Title,
                ParentId= model.ParentId,
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

            var item = new Symbol { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<SymbolDto>> GetById(int id)
        {
            var result = new GoldiranActionResult<SymbolDto>();

            var data = await context.Symbols.FindAsync(id);
            var model = new SymbolDto
            {
                Id = data.Id,
                IsActive = data.IsActive,
                Title = data.Title,
                ParentId= data.ParentId
            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<List<SymbolDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<SymbolDto>>();

            var queryResult = await _queryService.QueryAsync(model);

            result.Data = queryResult.Data.Select(q => new SymbolDto
            {
                Id = q.Id,
                IsActive = q.IsActive,
                Title = q.Title,
                IsActiveTitle=q.IsActive==true ?"فعال" : "غیر فعال",
                ParentId=q.ParentId
            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;
        }

        public async Task<GoldiranActionResult<List<TreeDto>>> GetTree(int? parentId)
        {
            var result = new GoldiranActionResult<List<TreeDto>>();
            var items = new List<TreeDto>();
            var symbols = await context.Symbols.Where(q => parentId == null || (q.ParentId == parentId || q.Id == parentId)).ToListAsync();
            var rootElements = symbols.Where(q => q.ParentId == null);

            foreach (var rootElement in rootElements)
            {
                var model = new TreeDto
                {
                    Title = rootElement.Title,
                    Key = rootElement.Id,
                    Text = rootElement.Title,
                    Value = rootElement.Id,
                    ParentId = parentId,
                    Children = GenerateRecuresive(rootElement, symbols),
                };
                items.Add(model);
            }

            result.IsSuccess = true;
            result.Data = items;
            return result;
        }


        private List<TreeDto> GenerateRecuresive(Symbol parentRole, List<Symbol> symbols, int level = 2)
        {
            var childRoles = symbols.Where(q => q.ParentId == parentRole.Id);
            var children = new List<TreeDto>();
            foreach (var item in childRoles)
            {
                var child = new TreeDto
                {
                    Key = item.Id,
                    Title = item.Title,
                    Value = item.Id,
                    Text = item.Title,
                    Children = GenerateRecuresive(item, symbols, 2),
                    Rate = level == 1 ? 30 : 20,
                };

                children.Add(child);
            }

            return children;
        }

        public async Task<GoldiranActionResult<int>> Update(SymbolDto model)
        {
            var result = new GoldiranActionResult<int>();

            var data = await context.Symbols.FindAsync(model.Id);
            data.Title = model.Title;
            data.IsActive = model.IsActive;
            data.ParentId = model.ParentId;
            
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }
    }
}
