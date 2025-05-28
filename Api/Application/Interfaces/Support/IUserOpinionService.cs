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
using Infrastructure.Models;

namespace Application.Interfaces.Support
{
    public interface IUserOpinionService
    {
        Task<GoldiranActionResult<List<ListUserOpinionDto>>> GetAll(FilterUserOpinionDto model = null);
        Task<GoldiranActionResult<UserOpinionDto>> GetById(Guid id);
        Task<GoldiranActionResult<List<UserOpinionDto>>> GetByProductId(int ProductId);
        Task<GoldiranActionResult<int>> Add(UserOpinionDto model);
        Task<GoldiranActionResult<int>> Update(UserInputOpinionModel model);
        Task<GoldiranActionResult<int>> Delete(Guid id);
        Task<GoldiranActionResult<List<UserOpinionDto>>> GetByArticleId(int articleId);
    }
}
