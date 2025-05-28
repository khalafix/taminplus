using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using Infrastructure.Models.Authorization;
using BIDashboard.Dtos.Authorization;

namespace Application.Interfaces
{
    public interface IAuthenticationService
    {
        Task<GoldiranActionResult<bool>> ChangePasswordForUserAsync(ResetPasswordDto model, string ip, string browser);
        Task<GoldiranActionResult<Guid>> ResetPasswordConfirmation(Guid code, string ip, string browser);
        Task<GoldiranActionResult<bool>> ConfirmationAsync(Guid code, string ip, string browser);
        Task<(GoldiranActionResult<bool>, Guid?)> RegisterAsync(RegisterDto model, string ip, string browser);
        Task<GoldiranActionResult<bool>> ChangePasswordAsync(ResetPasswordDto model, string ip, string browser);
        Task<GoldiranActionResult<AuthenticateModel>> LoginAsync(LoginDto model, string ip, string browser);
        Task<GoldiranActionResult<AuthenticateModel>> GenerateTokenWithRefreshTokenAsync(string token, string currentRefreshToken, string ip, string browser);
        Task<GoldiranActionResult<bool>> SendResetPasswordLink(SendResetPasswordLinkDto model, string ip, string browser);
        Task<GoldiranActionResult<bool>> ResetPassword(ResetPasswordDto model, string ip, string browser);
        Task<GoldiranActionResult<UserAuthenticateModel>> CustomerLoginAsync(LoginDto model, string ip, string browser);
        Task<GoldiranActionResult<bool>> CheckUserIsExsits(string phoneNumber);
        Task<GoldiranActionResult<bool>> CheckUserIsExsitsForActive(string phoneNumber);
    }
}
