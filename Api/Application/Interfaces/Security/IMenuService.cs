using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Common;
using BIDashboard.Dtos;

namespace Application.Interfaces
{
    public interface IMenuService
    {
       Task<GoldiranActionResult<List<MenuDto>>> GetMenu();
       Task<GoldiranActionResult<List<MenuDto>>> GetMenuAccessForUser(Guid UserId);
    }
}
