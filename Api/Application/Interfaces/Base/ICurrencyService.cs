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
    public interface ICurrencyService
    {
        Task<GoldiranActionResult<List<CurrencyDto>>> GetList(GridQueryModel model = null);
        Task<List<ComboItemDto>> GetForCombo();
        Task<GoldiranActionResult<int>> Add(CurrencyDto model);
        Task<GoldiranActionResult<int>> Update(CurrencyDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<CurrencyDto>> GetById(int id);
    }
}
