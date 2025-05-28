using Application.Interfaces;
using Infrastructure.Models.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Resources;

namespace API.Controllers.Security
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : BaseController
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }


        /// <summary>
        ///   منو
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetMenu")]
        public async Task<IActionResult> GetMenu()
        {

            var result = await _menuService.GetMenu();
            return Ok(result);
        }
        /// <summary>
        ///   دسترسی منوهای کاربر
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetMenuAccessForUser")]
        public async Task<IActionResult> GetMenuAccessForUser()
        {
            var result = await _menuService.GetMenuAccessForUser(UserId);
            return Ok(result);
        }
    }
}



