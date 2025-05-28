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

namespace Application.Interfaces.Support
{
    public interface ICooperationFormService
    {
        Task<GoldiranActionResult<List<CooperationFormDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(CooperationFormInputModel model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<CooperationFormDto>> GetById(int id);
    }
}
