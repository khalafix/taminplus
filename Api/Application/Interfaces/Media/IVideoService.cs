using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Blog
{
    public interface IVideoService
    {
        Task<GoldiranActionResult<List<VideoDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(VideoDto model);
        Task<GoldiranActionResult<int>> Update(VideoDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<VideoDto>> GetById(int id);

        Task<GoldiranActionResult<List<UserVideoDto>>> GetLastVideo();
        Task<GoldiranActionResult<List<UserVideoDto>>> GetUserList(GridQueryModel model = null);
        Task<GoldiranActionResult<List<int>>> GetAllId();
    }
}
