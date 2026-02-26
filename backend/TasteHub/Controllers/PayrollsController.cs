using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.Payroll;

namespace TasteHub.Controllers
{
    [Route("api/payrolls")]
    public class PayrollsController : BaseController
    {
        private readonly IPayrollService _service;

        public PayrollsController(IPayrollService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PayrollFiltersDTO filters)
        {
            return FromResult(await _service.GetAllAsync(filters));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return FromResult(await _service.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PayrollDTO DTO)
        {
            return FromResult(await _service.AddAsync(DTO));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PayrollDTO DTO)
        {
            return FromResult(await _service.UpdateAsync(id, DTO));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate(byte month, short year)
        {
            return FromResult(await _service.GeneratePayrollAsync(month, year));
        }

        [HttpPost("{id:int}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            return FromResult(await _service.ApprovePayrollAsync(id));
        }

        [HttpPost("{id:int}/mark-paid")]
        public async Task<IActionResult> MarkPaid(int id)
        {
            return FromResult(await _service.MarkAsPaidAsync(id));
        }
    }
}
