using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItemSize;

namespace TasteHub.Controllers
{
    [Route("api/menu-item-sizes")]
    public class MenuItemSizesController : BaseController
    {

        private readonly IMenuItemSizeService _service;

        public MenuItemSizesController(IMenuItemSizeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return FromResult(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return FromResult(await _service.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MenuItemSizeDTO menuItemSizeDTO)
        {
            return FromResult(await _service.AddAsync(menuItemSizeDTO));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MenuItemSizeDTO menuItemSizeDTO)
        {
            return FromResult(await _service.UpdateAsync(id, menuItemSizeDTO));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }

    }
}
