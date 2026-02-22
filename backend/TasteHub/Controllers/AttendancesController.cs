using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Attendance;
using TasteHub.DTOs.MenuItem;

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
        public async Task<IActionResult> GetAll([FromQuery] AttendanceFiltersDTO filters)
        {
            return FromResult(await _service.GetAllAsync(filters));
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

        [HttpPost("check-in")]
        public async Task<IActionResult> CheckIn([FromBody] int employeeId)
        {
            return FromResult(await _service.CheckInAsync(employeeId));
        }

        [HttpPost("check-out")]
        public async Task<IActionResult> CheckOut([FromBody] int employeeId)
        {
            return FromResult(await _service.CheckOutAsync(employeeId));
        }
    }
}
