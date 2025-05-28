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

namespace Application.Interfaces.Catalog
{
    public interface ISocialMediaService
    {
        Task<GoldiranActionResult<List<SocialMediaDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<List<UserSocialMediaDto>>> GetUserList(int count = 8);
        Task<GoldiranActionResult<int>> Add(SocialMediaInputModel model);
        Task<GoldiranActionResult<int>> Update(SocialMediaInputModel model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<SocialMediaDto>> GetById(int id);
    }
}
