using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.DTOs.MenuCategory;

namespace TasteHub.Controllers
{
    [Route("api/extras-groups")]
    public class ExtrasGroupsController : BaseController
    {
        private readonly IExtrasGroupService _service;

        public ExtrasGroupsController(IExtrasGroupService service)
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
        public async Task<IActionResult> Create([FromBody] ExtraGroupDTO extraGroupDTO)
        {
            return FromResult(await _service.AddAsync(extraGroupDTO));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ExtraGroupDTO extraGroupDTO)
        {
            return FromResult(await _service.UpdateAsync(id, extraGroupDTO));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }

    }
}
