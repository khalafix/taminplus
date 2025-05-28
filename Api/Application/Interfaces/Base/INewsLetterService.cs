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
    public interface INewsLetterService
    {
        Task<GoldiranActionResult<List<NewsLetterDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(NewsLetterDto model);
        Task<GoldiranActionResult<int>> Update(NewsLetterDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<NewsLetterDto>> GetById(int id);
        Task<GoldiranActionResult<List<UserRegisterNewsLetterDto>>> GetUserRegisterNewsLetter(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Register(UserNewsLetterDto model, Guid? userId);
    }
}
