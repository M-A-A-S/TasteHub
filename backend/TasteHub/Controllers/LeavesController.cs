using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.Leave;

namespace TasteHub.Controllers
{
    [Route("api/leaves")]
    public class LeavesController : BaseController
    {
        private readonly ILeaveService _service;

        public LeavesController(ILeaveService service)
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
        public async Task<IActionResult> Create([FromBody] LeaveDTO DTO)
        {
            return FromResult(await _service.AddAsync(DTO));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] LeaveDTO DTO)
        {
            return FromResult(await _service.UpdateAsync(id, DTO));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }

        [HttpPost("request")]
        public async Task<IActionResult> RequestLeave([FromBody] LeaveDTO DTO)
        {
            return FromResult(await _service.CreateLeaveAsync(DTO));
        }

        [HttpPut("approve")]
        public async Task<IActionResult> ApproveLeave([FromBody] LeaveDTO DTO)
        {
            return FromResult(await _service.ApproveLeaveAsync(DTO));
        }

        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            return FromResult(await _service.CancelLeaveAsync(id));
        }

    }
}
