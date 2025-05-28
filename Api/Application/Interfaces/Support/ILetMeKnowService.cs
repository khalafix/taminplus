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
using Infrastructure.Models;

namespace Application.Interfaces
{
    public interface ILetMeKnowService
    {
        Task<GoldiranActionResult<List<UserRegisterLetMeKnowDtoDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Register(UserLetMeKnowDto model, Guid? userId);
        Task<byte[]> GetListForExcel(GridQueryModel model = null, string fileName = null);
    }
}
