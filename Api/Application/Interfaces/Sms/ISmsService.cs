
using Infrastructure.Common;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BI.Application.Interfaces
{
    public interface ISmsService
    {
        Task<GoldiranActionResult<bool>> SendSmsForgetPasswordForAdmin(Guid userid);
        Task<GoldiranActionResult<bool>> SendSmsForAlerts(string username , string password);
        Task<GoldiranActionResult<bool>> SendSmsForgetPassword(string userName);
        Task<GoldiranActionResult<bool>> SendSmsForConfirmPhoneNumber(Guid userid, string phoneNumber);
        Task<GoldiranActionResult<bool>> CheckCodeSmSForPhoneNumber(string code, Guid userId);
        Task<GoldiranActionResult<bool>> SendSmsForRegisterUser(string phoneNumber);
        Task<GoldiranActionResult<Guid>> CheckCodeSmSForForgetPasswordUser(string code , string userName);
        Task<GoldiranActionResult<List<SmsDto>>> GetList(GridQueryModel model);
        Task<GoldiranActionResult<bool>> CheckCodeSmSForRegisterUser(string code, string phoneNumber);
        Task<GoldiranActionResult<bool>> SendSmsForRequestAlerts(Guid userId, string alert);
        Task<GoldiranActionResult<bool>> SendSmsForActiveUser(string phoneNumber);
        Task<GoldiranActionResult<bool>> CheckCodeSmSForActiveUser(string code, string phoneNumber);
    }
}
