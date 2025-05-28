using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.CustomReport
{
    public class OrganizationChartController : BaseController
    {
        private readonly IRoleService roleService;
        public OrganizationChartController(IRoleService roleService)
        {
            this.roleService = roleService;
        }

        [HttpGet("ShowTree")]
        public async Task<IActionResult> ShowTree()
        {
            var result = await roleService.GetOragnizationChartData();
            return Ok(result);
        }
    }
}
