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
using Infrastructure.Models.Authorization;

namespace Application.Interfaces
{
    public interface ICustomerService
    {
        Task<GoldiranActionResult<List<CustomerDto>>> GetCustomers(GridQueryModel model = null);
        Task<GoldiranActionResult<CustomerInputModel>> AddCustomer(CustomerInputModel model,  bool isAdmin = true);
        Task<GoldiranActionResult<CustomerInputModel>> UpdateCustomer(CustomerInputModel model, bool isAdmin = true);
        Task<GoldiranActionResult<CustomerDto>> GetCustomerById(Guid userId);
        Task<GoldiranActionResult<Guid>> UpdatePassword(ChangePasswordInputModel model, bool isCurrentUser = false);
        Task<GoldiranActionResult<AuthenticateModel>> RegisterCustomer(RegisterCustomerInputModel model);
        Task<GoldiranActionResult<CustomerInputModel>> UpdateCustomerByUser(CustomerInputModel model);
        Task<GoldiranActionResult<CustomerInputModel>> UpdateCustomerInfoByUser(CustomerInputModel model);
    }
}
