using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Attendance;

namespace TasteHub.Controllers
{
    [Route("api/attendances")]
    public class AttendancesController : BaseController
    {
        private readonly IAttendanceService _service;

        public AttendancesController(IAttendanceService service)
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
        public async Task<IActionResult> Create([FromBody] AttendanceDTO DTO)
        {
            return FromResult(await _service.AddAsync(DTO));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AttendanceDTO DTO)
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
