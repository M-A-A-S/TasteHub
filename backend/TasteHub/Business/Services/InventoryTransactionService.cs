using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.IngredientBatch;
using TasteHub.DTOs.InventoryTransaction;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;

namespace TasteHub.Business.Services
{
    public class InventoryTransactionService : IInventoryTransactionService
    {
        private readonly IInventoryTransactionRepository _repo;

        public InventoryTransactionService(IInventoryTransactionRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<InventoryTransactionDTO>> AddAsync(InventoryTransactionDTO DTO)
        {
            var addResult = await _repo.AddAsync(DTO.ToEntity());
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }

            var findResult = await GetByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }

            return Result<InventoryTransactionDTO>.Success(findResult.Data);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<InventoryTransactionDTO>>> GetAllAsync()
        {
            var inventoryTransactions = await _repo.GetAllAsync();

            if (!inventoryTransactions.IsSuccess || inventoryTransactions.Data == null)
            {
                return Result<IEnumerable<InventoryTransactionDTO>>.Failure();
            }
            var result = inventoryTransactions.Data.Select(item => item.ToDTO());
            return Result<IEnumerable<InventoryTransactionDTO>>.Success(result);
        }

        public async Task<Result<InventoryTransactionDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }
            return Result<InventoryTransactionDTO>.Success(findResult.Data.ToDTO());
        }

        public async Task<Result<InventoryTransactionDTO>> UpdateAsync(int id, InventoryTransactionDTO DTO)
        {
            var findResult = await FindByIdAsync(id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }

            findResult.Data.UpdateFromDTO(DTO);

            var updateResult = await _repo.UpdateAsync(findResult.Data);
            if (!updateResult.IsSuccess || updateResult.Data == null)
            {
                return Result<InventoryTransactionDTO>.Failure();
            }

            return await GetByIdAsync(id);
        }

        private async Task<Result<InventoryTransaction>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }
    }
}
