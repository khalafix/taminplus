using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using Infrastructure.Models;
using Infrastructure.Models.Payment;
using Infrastructure.Models.PaymentGateway;

namespace Application.Interfaces.Base
{
    public interface IUserPaymentService
    {
        Task<GoldiranActionResult<BankResultDto>> GetBankResult(string refId, Guid userId);
        Task<GoldiranActionResult<List<UserPaymenstDto>>> GetUserAllPayments(UserPaymentFilterDto model , Guid userId);
        Task<GoldiranActionResult<List<UserPaymenstModel>>> GetUserAllPaymentsForUser( Guid userId);
        //Task<GoldiranActionResult<List<UserPaymentServiceCostDto>>> GetUserPayments(UserPaymentsFilterModel model, Guid userId);
        Task<GoldiranActionResult<UserPaymenstDto>> AddUserPayment(AddPaymentDto model, Guid userId);
    }
}
