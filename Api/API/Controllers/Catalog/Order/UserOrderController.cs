using Application.Interfaces.Blog;
using Application.Interfaces.Catalog;
using Application.Services.Catalog;
using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Catalog.Order
{

    public class UserOrderController : BaseController
    {
        private readonly IKoponService _koponservice;
        private readonly IOrderService _orderservice;

        public UserOrderController(IKoponService _koponservice  , IOrderService _orderservice)
        {
            this._koponservice = _koponservice;
            this._orderservice = _orderservice;

        }
        /// <summary>
        ///     چک کردن کوپن 
        /// </summary>
        /// <returns></returns>
        [HttpGet("CheckKopon/{code}")]
        public async Task<IActionResult> CheckKopon(string code)
        {
            var result = await _koponservice.GetByCode(code);
            return Ok(result);
        }
        /// <summary>
        ///       ثبت درخواست 
        /// </summary>
        /// <returns></returns>
        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder(UserOrderDto model)
        {
            var result = await _orderservice.Add(model, UserId);
            return Ok(result);
        }


        /// <summary>
        ///       مرجوع کردن درخواست  
        /// </summary>
        /// <returns></returns>
        [HttpPost("ReturnOrderByCustomer")]
        public async Task<IActionResult> ReturnOrderByCustomer(ReturnOrderInputDto model)
        {
            var result = await _orderservice.ReturnOrderByCustomer(model, UserId);
            return Ok(result);
        }

        /// <summary>
        ///    جزئیات سفارش 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetDetailById")]
        public async Task<IActionResult> GetDetailById()
        {
            var result = await _orderservice.GetDetailById(UserId);
            return Ok(result);
        }





    }
}
