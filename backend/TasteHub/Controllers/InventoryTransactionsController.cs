using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteHub.Business.Interfaces;
using TasteHub.DTOs;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.DTOs.MenuItemExtra;
using TasteHub.Enums;
using TasteHub.Utilities;

namespace TasteHub.Controllers
{
    [Route("api/inventory-transactions")]
    public class InventoryTransactionsController : BaseController
    {
        private readonly IInventoryTransactionService _service;

        public InventoryTransactionsController(IInventoryTransactionService service)
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
        public async Task<IActionResult> Create([FromBody] InventoryTransactionDTO DTO)
        {
            return FromResult(await _service.AddAsync(DTO));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] InventoryTransactionDTO DTO)
        {
            return FromResult(await _service.UpdateAsync(id, DTO));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return FromResult(await _service.DeleteAsync(id));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddStock([FromBody] IEnumerable<IngredientAddition> additions)
        {
            if (additions == null || !additions.Any())
            {
                return FromResult(Result<bool>.Failure());
            }

            var userId = 1; // TODO: get from logged in user

            var result = await _service.AddIngredientsAsync(additions.Select(a => new IngredientAddition
            {
                IngredientId = a.IngredientId,
                Quantity = a.Quantity,
                CostPerUnit = a.CostPerUnit,
                ExpiryDate = a.ExpiryDate,
                BatchNumber = a.BatchNumber
            }),
            userId, StockMovementReason.Purchase, true);

            return FromResult(result);
        }

        [HttpPost("deduct")]
        public async Task<IActionResult> DeductStock([FromBody] IEnumerable<IngredientDeduction> deductions)
        {
            if (deductions == null || !deductions.Any())
            {
                return FromResult(Result<bool>.Failure());
            }

            var userId = 1; // TODO: get from logged in user

            var result = await _service.DeductIngredientsAsync(deductions.Select(d => new IngredientDeduction
            {
                IngredientId = d.IngredientId,
                Quantity = d.Quantity
            }), userId, StockMovementReason.Sale, true);

            return FromResult(result);
        }


    }
}
