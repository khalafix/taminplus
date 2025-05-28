using Application.Interfaces;
using Core.Entities;
using Infrastructure.Common;
using Infrastructure.Models;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Project;
using Infrastructure.Resources;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserGroupMemberService : IUserGroupMemberService
    {
        private readonly BIContext context;
        private readonly IGenericQueryService<UserGroupMember> service;
        public UserGroupMemberService(BIContext context,
            IGenericQueryService<UserGroupMember> service
            )
        {
            this.context = context;
            this.service = service;
        }

        public async Task<GoldiranActionResult<Guid>> Add(UserGroupMemberDto model)
        {
            var result = new GoldiranActionResult<Guid>();
            var area = new UserGroupMember
            {
                //Description = model.Description,
                //IsActive = model.IsActive,
                //Title = model.Title,
                //Code = model.Code,
            };

            await context.AddAsync(area);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.SaveSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<Guid>> Delete(Guid id)
        {
            var result = new GoldiranActionResult<Guid>();

            var item = new UserGroupMember { Id = id };
            context.Remove(item);
            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.DeleteSuccessful;
            return result;
        }

        public async Task<GoldiranActionResult<UserGroupMemberDto>> GetById(Guid id)
        {
            var result = new GoldiranActionResult<UserGroupMemberDto>();

            var area = await context.UserGroupMembers.FindAsync(id);
            var model = new UserGroupMemberDto
            {
                //Description = area.Description,
                //Id = area.Id,
                //IsActive = area.IsActive,
                //Title = area.Title,
                //Code = area.Code,
            };

            result.IsSuccess = true;
            result.Data = model;
            return result;
        }

        public async Task<GoldiranActionResult<List<UserGroupMemberDto>>> GetList(GridQueryModel model = null)
        {
            var result = new GoldiranActionResult<List<UserGroupMemberDto>>();

            var queryResult = await service.QueryAsync(model);

            result.Data = queryResult.Data.Select(q => new UserGroupMemberDto
            {
                //Description = q.Description,
                //Id = q.Id,
                //IsActive = q.IsActive,
                //Title = q.Title,
                //Code = q.Code,
            }).ToList();
            result.IsSuccess = true;
            result.Total = queryResult.Total;
            result.Size = queryResult.Size;
            result.Page = queryResult.Page;
            return result;
        }

        public async Task<GoldiranActionResult<Guid>> Update(UserGroupMemberDto model)
        {
            var result = new GoldiranActionResult<Guid>();

            var area = await context.UserGroupMembers.FindAsync(model.Id);
            //area.Title = model.Title;
            //area.IsActive = model.IsActive;
            //area.Description = model.Description;
            //area.Code = model.Code;

            await context.SaveChangesAsync();

            result.IsSuccess = true;
            result.Message = MessagesFA.UpdateSuccessful;
            return result;
        }
    }
}
