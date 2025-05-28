using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using Infrastructure.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Catalog
{
    public interface IKoponService
    {
        Task<GoldiranActionResult<List<KoponDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(KoponDto model);
        Task<GoldiranActionResult<int>> Update(KoponDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<KoponDto>> GetById(int id);
        Task<GoldiranActionResult<UserKoponDto>> GetByCode(string code);
    }
}