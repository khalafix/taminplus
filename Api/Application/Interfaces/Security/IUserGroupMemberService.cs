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
    public interface IUserGroupMemberService
    {
        Task<GoldiranActionResult<List<UserGroupMemberDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<Guid>> Add(UserGroupMemberDto model);
        Task<GoldiranActionResult<Guid>> Update(UserGroupMemberDto model);
        Task<GoldiranActionResult<Guid>> Delete(Guid id);
        Task<GoldiranActionResult<UserGroupMemberDto>> GetById(Guid id);
    }
}
