using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using Infrastructure.Models.User;
using BIDashboard.Dtos;
using BIDashboard.Dtos.User;

namespace Application.Interfaces
{
    public interface IRoleService
    {
        Task<GoldiranActionResult<List<RoleDto>>> GetRoles(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(RoleDto model);
        Task<GoldiranActionResult<int>> Update(RoleDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<RoleDto>> GetById(int id);
        Task<GoldiranActionResult<List<TreeDto>>> GetRoleTree(int? parentId);
        Task<GoldiranActionResult<List<RoleGroupPermissionDto>>> GetRolePermissions(int roleId);
        Task<GoldiranActionResult<int>> UpdateRolePermissions(int roleId, List<RolePermissionDto> permissions);
        Task<GoldiranActionResult<List<TreeDto>>> GetOragnizationChartData(int? parentId = null);
    }
}
