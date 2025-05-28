using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Project;
using Infrastructure.Models.User;
using BIDashboard.Dtos;
using BIDashboard.Dtos.User;
using Infrastructure.Models;

namespace Application.Interfaces
{
    public interface IUserGroupService
    {
        Task<GoldiranActionResult<UserAccessForUserGroupDto>> GetUserActionsAccessForUserGroup(Guid userId);

        Task<GoldiranActionResult<List<UserGroupDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<Guid>> Add(UserGroupDto model);
        Task<GoldiranActionResult<Guid>> Update(UserGroupDto model);
        Task<GoldiranActionResult<Guid>> Delete(Guid id);
        Task<GoldiranActionResult<UserGroupDto>> GetById(Guid id);
    }
}
