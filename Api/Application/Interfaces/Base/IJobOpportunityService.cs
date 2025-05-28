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
    public interface IJobOpportunityService
    {
        Task<GoldiranActionResult<List<JobOpportunityDto>>> GetList(GridQueryModel model = null);
        Task<GoldiranActionResult<int>> Add(JobOpportunityDto model);
        Task<GoldiranActionResult<int>> Update(JobOpportunityDto model);
        Task<GoldiranActionResult<int>> Delete(int id);
        Task<GoldiranActionResult<JobOpportunityDto>> GetById(int id);
    }
}
