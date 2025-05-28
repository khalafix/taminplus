using Infrastructure.Common;
using Infrastructure.Models.Catalog;
using Infrastructure.Models.EIED;
using Infrastructure.Models.Payment;
using Infrastructure.Models.User;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces.Catalog
{
    public interface IOrderService
    {
        Task<GoldiranActionResult<List<OrderDto>>> GetList(OrderFilterDto model = null);
        Task<GoldiranActionResult<UserPaymenstDto>> Add(UserOrderDto model , Guid userId);
        Task<GoldiranActionResult<Guid>> Update(OrderInputDto model, Guid userId);
        Task<GoldiranActionResult<Guid>> Delete(Guid id);
        Task<GoldiranActionResult<OrderDto>> GetById(Guid id);
        Task<GoldiranActionResult<List<OrderModel>>> GetDetailById(Guid userId);
        Task<byte[]> GetListForExcel(GridQueryModel model = null, string fileName = null);
        Task<GoldiranActionResult<Guid>> ReturnOrderByCustomer(ReturnOrderInputDto model, Guid userId);
    }
}