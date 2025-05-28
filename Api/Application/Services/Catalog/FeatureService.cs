using Application.Interfaces;
using Application.Interfaces.Catalog;
using Core.Entities;
using Core.Entities.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Catalog
{
    public class FeatureService : IFeatureService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<Feature> featureQueryService;
        public FeatureService(BIContext context,
            IGenericQueryService<Feature> featureQueryService
            )
        {
            this.context = context;
            this.featureQueryService = featureQueryService;
        }

        public async Task<GoldiranActionResult<int>> Add(FeatureDto model)
        {
            var result = new GoldiranActionResult<int>();

            if (model.ControlType == ControlType.Number)
            {

                var item = new Feature
                {
                    CreateDate = DateTime.Now,
                    Remark = model.Remark,
                    Title = model.Title,
                    UnitType = model.UnitType,
                    ControlType = model.ControlType,
                    Max = model.Max,
                    Min = model.Min,
                    FeatureCategoryId = model.FeatureCategoryId,
                    SymbolId = model.SymbolId,
                    ShowInFilter=model.ShowInFilter,
                };

                await context.AddAsync(item);
                await context.SaveChangesAsync();
            }
            else if (model.ControlType == ControlType.Tag)
            {
                var item = new Feature
                {
                    CreateDate = DateTime.Now,
                    Remark = model.Remark,
                    Title = model.Title,
                    UnitType = model.UnitType,
                    ControlType = model.ControlType,
                    Option = model.Option,
                    FeatureCategoryId = model.FeatureCategoryId,
                    SymbolId = model.SymbolId,
                    ShowInFilter = model.ShowInFilter,


                };

                await context.AddAsync(item);
                await context.SaveChangesAsync();

            }
            else
            {
                var item = new Feature
                {
                    CreateDate = DateTime.Now,
                    Remark = model.Remark,
                    Title = model.Title,
                    UnitType = model.UnitType,
                    ControlType = model.ControlType,
                    FeatureCategoryId = model.FeatureCategoryId,
                    SymbolId = model.SymbolId,
                    ShowInFilter = model.ShowInFilter,

                };

                await context.AddAsync(item);
                await context.SaveChangesAsync();
            }


            result.IsSuccess = true;
            result.Message = MessagesFA.SaveSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<int>> Delete(int id)
        {
            var result = new GoldiranActionResult<int>();

            var item = new Feature { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<FeatureDto>> GetById(int id)
        {
            var result = new GoldiranActionResult<FeatureDto>();

            var item = await context.Features.FindAsync(id);
            var model = new FeatureDto
            {
                Remark = item.Remark,
                Id = item.Id,
                Title = item.Title,
                UnitType = item.UnitType,
                ControlType = item.ControlType,
                Max = item.Max,
                Min = item.Min,
                Option = item.Option,
                FeatureCategoryId = item.FeatureCategoryId,
                SymbolId = item.SymbolId,
                ShowInFilter = item.ShowInFilter,

            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }


        public async Task<GoldiranActionResult<List<FeatureDto>>> GetByFeaturesCategoryId(int? id)
        {
            var result = new GoldiranActionResult<List<FeatureDto>>();
            var list = new List<FeatureDto>();
            var items = new List<Feature>();
            items = id !=null ? context.Features.Where(w => w.FeatureCategoryId == id && w.ShowInFilter==true).ToList() : context.Features.ToList();
            foreach (var item in items)
            {
                var model = new FeatureDto
                {
                    Remark = item.Remark,
                    Id = item.Id,
                    Title = item.Title,
                    UnitType = item.UnitType,
                    ControlType = item.ControlType,
                    Max = item.Max,
                    Min = item.Min,
                    Option = item.Option,
                    FeatureCategoryId = item.FeatureCategoryId,
                    SymbolId=item.SymbolId,
                    ShowInFilter = item.ShowInFilter,

                };
                list.Add(model);

            }

            result.IsSuccess = true;
            result.Data = list;
            return result;
        }

        public async Task<GoldiranActionResult<List<FeatureDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<FeatureDto>>();

            var queryResult = await featureQueryService.QueryAsync(model, includes: new List<string> { "Symbol" });

            result.Data = queryResult.Data.Select(q => new FeatureDto
            {
                Id = q.Id,
                Remark = q.Remark,
                Title = q.Title,
                UnitType = q.UnitType,
                ControlType = q.ControlType,
                SymbolId = q.SymbolId,
                SymbolTitle= q.Symbol?.Title,
                ShowInFilter = q.ShowInFilter,

            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;


        }

        public async Task<GoldiranActionResult<int>> Update(FeatureDto model)
        {
            var result = new GoldiranActionResult<int>();

            var item = await context.Features.FindAsync(model.Id);

            if (item.ControlType == ControlType.Number)
            {
                item.Max = model.Max;
                item.Min = model.Min;
                item.Title = model.Title;
                item.Remark = model.Remark;
                item.UnitType = model.UnitType;
                item.ControlType = model.ControlType;
                item.FeatureCategoryId = model.FeatureCategoryId;
                item.SymbolId = model.SymbolId;
                item.ShowInFilter = model.ShowInFilter;

            }
            else if (item.ControlType == ControlType.Tag)
            {
                item.Option = model.Option;
                item.Title = model.Title;
                item.Remark = model.Remark;
                item.UnitType = model.UnitType;
                item.ControlType = model.ControlType;
                item.FeatureCategoryId = model.FeatureCategoryId;
                item.SymbolId = model.SymbolId;
                item.ShowInFilter = model.ShowInFilter;

            }
            else
            {
                item.Title = model.Title;
                item.Remark = model.Remark;
                item.UnitType = model.UnitType;
                item.ControlType = model.ControlType;
                item.FeatureCategoryId = model.FeatureCategoryId;
                item.SymbolId = model.SymbolId;
                item.ShowInFilter = model.ShowInFilter;

            }



            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }
    }
}
