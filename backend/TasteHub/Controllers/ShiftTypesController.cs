using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.JobTitle;
using TasteHub.DTOs.ShiftType;

namespace TasteHub.Controllers
{
    [Route("api/shift-types")]
    public class ShiftTypesController : BaseController
    {
        private readonly IShiftTypeService _service;

        public ShiftTypesController(IShiftTypeService service)
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
        public async Task<IActionResult> Create([FromBody] ShiftTypeDTO DTO)
        {
            return FromResult(await _service.AddAsync(DTO));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ShiftTypeDTO DTO)
        {
            return FromResult(await _service.UpdateAsync(id, DTO));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }
    }
}
