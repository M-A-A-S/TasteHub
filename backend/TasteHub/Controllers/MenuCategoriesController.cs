using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.MenuCategory;
using TasteHub.Entities;

namespace TasteHub.Controllers
{
    [Route("api/menu-categories")]
    public class MenuCategoriesController : BaseController
    {

        private readonly IMenuCategoryService _service;

        public MenuCategoriesController(IMenuCategoryService service)
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
        public async Task<IActionResult> Create([FromBody] MenuCategoryDTO categoryDTO)
        {
            return FromResult(await _service.AddAsync(categoryDTO));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MenuCategoryDTO categoryDTO)
        {
            return FromResult(await _service.UpdateAsync(id, categoryDTO));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }

    }
}
