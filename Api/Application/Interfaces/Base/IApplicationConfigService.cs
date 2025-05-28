using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using Infrastructure.Models;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Project;
using Infrastructure.Models.User;
using BIDashboard.Dtos;
using BIDashboard.Dtos.User;

namespace Application.Interfaces
{
    public interface IApplicationConfigService
    {
        Task<GoldiranActionResult<int>> Update(ApplicationConfigDto model);
        Task<GoldiranActionResult<ApplicationConfigDto>> Get();
    }
}
