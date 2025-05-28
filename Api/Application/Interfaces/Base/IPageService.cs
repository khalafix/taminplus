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
using Infrastructure.Models.Catalog;
using Infrastructure.Models.Base;

namespace Application.Interfaces.Base
{
    public interface IPageService
    {
        Task<GoldiranActionResult<List<string>>> GetAllLink();

        Task<GoldiranActionResult<List<PageDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(PageInputModel model);
        Task<GoldiranActionResult<int>> Update(PageInputModel model);
        Task<GoldiranActionResult<int>> Delete(Guid id);
        Task<GoldiranActionResult<PageDto>> GetById(Guid id);
        Task<GoldiranActionResult<PageDto>> GetByTitle(string title);
        Task<GoldiranActionResult<List<UserPageDto>>> GetListUserPages();
    }
}
