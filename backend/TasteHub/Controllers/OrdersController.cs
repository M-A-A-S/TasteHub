using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.Order;

namespace TasteHub.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : BaseController
    {
        private readonly IOrderService _service;

        public OrdersController(IOrderService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
        [FromQuery] OrderFiltersDTO filters)
        {
            return FromResult(
                await _service.GetFilteredAsync(
                    filters));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateOrderRequest request)
        {
            return FromResult(await _service.CreateOrderAsync(request));
        }

    }
}
