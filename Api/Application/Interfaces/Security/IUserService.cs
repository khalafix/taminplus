using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using Infrastructure.Models.EIED;
using Infrastructure.Models.User;
using BIDashboard.Dtos;
using BIDashboard.Dtos.User;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<GoldiranActionResult<List<UserDto>>> GetUsers(GridQueryModel model = null);
        Task<GoldiranActionResult<UserInputModel>> AddUser(UserInputModel model, Guid userId);
        Task<GoldiranActionResult<UserInputModel>> UpdateUser(UserInputModel model, Guid userId);
        Task<GoldiranActionResult<Guid>> DeleteUser(Guid userid);
        Task<GoldiranActionResult<UserDto>> GetUserById(Guid userid);
        Task<GoldiranActionResult<string>> GetEmailSignuature(Guid userid);
        Task<GoldiranActionResult<Guid>> UpdatePassword(ChangePasswordInputModel model, bool isCurrentUser = false);
        Task<GoldiranActionResult<bool>> ChangeEmailSignature(ChangeEmailSignatureInputModel model);
        Task<List<UserDto>> GetUsersInfoForCombo();
        Task<List<ComboItemDto>> GetUsersForCombo();
    }
}
