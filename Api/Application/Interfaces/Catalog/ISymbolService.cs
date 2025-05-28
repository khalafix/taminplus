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
    public interface ISymbolService
    {
        Task<GoldiranActionResult<List<SymbolDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(SymbolDto model);
        Task<GoldiranActionResult<int>> Update(SymbolDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<SymbolDto>> GetById(int id);
        //Task<EIEDActionResult<SymbolDto>> GetWithOutParent();
        Task<GoldiranActionResult<List<TreeDto>>> GetTree(int? parentId);
    }
}
