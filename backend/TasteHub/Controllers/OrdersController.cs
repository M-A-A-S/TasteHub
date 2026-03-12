using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.Order;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;

namespace TasteHub.Controllers
{
    [Authorize(Roles = "administrator,manager")]
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
        [Authorize(Roles = "administrator,manager,cashier")]
        public async Task<IActionResult> Create([FromBody] CreateOrderRequest request)
        {
            var userIdResult = User.TryGetUserId();

            if (!userIdResult.IsSuccess)
            {
                return Unauthorized(Result<bool>.Failure("unauthorized"));
            }

            request.UserId = userIdResult.Data;

            return FromResult(await _service.CreateOrderAsync(request));
        }

    }
}
