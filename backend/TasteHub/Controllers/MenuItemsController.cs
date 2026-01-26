using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.MenuItem;

namespace TasteHub.Controllers
{
    [Route("api/menu-items")]
    public class MenuItemsController : BaseController
    {
        private readonly IMenuItemService _service;

        public MenuItemsController(IMenuItemService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
          [FromQuery] MenuItemFiltersDTO filters)
        {
            return FromResult(
                await _service.GetFilteredAsync(
                    filters));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return FromResult(await _service.GetByIdAsync(id));
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create(
            [FromForm] MenuItemDTO dto)
        {
            return FromResult(await _service.AddAsync(dto));
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(
          int id,
          [FromForm] MenuItemDTO dto)
        {
            return FromResult(await _service.UpdateAsync(id, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }

    }
}
