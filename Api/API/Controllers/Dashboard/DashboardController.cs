using Application.Interfaces;
using Application.Services.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Project;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Project
{
    public class DashboardController : BaseController
    {
        private readonly IDashboardService dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            this.dashboardService = dashboardService;
        }

        /// <summary>
        /// تعداد اپشن ها
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetCountData")]
        public async Task<IActionResult> GetCountData()
        {
            if (UserType == UserType.TaminPlus)
            {
                var result = await dashboardService.GetCountData();
                return Ok(result);
            }
            else { return BadRequest(); }
     
        }

        
    }
}
