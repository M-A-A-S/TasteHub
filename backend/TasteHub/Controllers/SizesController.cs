using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.Size;

namespace TasteHub.Controllers
{
    [Route("api/sizes")]
    public class SizesController : BaseController
    {

        private readonly ISizeService _service;

        public SizesController(ISizeService service)
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
        public async Task<IActionResult> Create([FromBody] SizeDTO size)
        {
            return FromResult(await _service.AddAsync(size));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SizeDTO size)
        {
            return FromResult(await _service.UpdateAsync(id, size));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }

    }
}
