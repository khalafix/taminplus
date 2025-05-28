using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using Infrastructure.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Blog
{
    public interface IVideoCategoryService
    {
        Task<GoldiranActionResult<List<VideoCategoryDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(VideoCategoryDto model);
        Task<GoldiranActionResult<int>> Update(VideoCategoryDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<VideoCategoryDto>> GetById(int id);
        Task<GoldiranActionResult<List<VideoCategoryDto>>> GetUserList();

    }
}