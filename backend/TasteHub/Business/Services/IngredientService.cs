using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.MenuItemSize;
using TasteHub.DTOs.Size;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class IngredientService : IIngredientService
    {
        private readonly IIngredientRepository _repo;

        public IngredientService(IIngredientRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<IngredientDTO>> AddAsync(IngredientDTO DTO)
        {
            var addResult = await _repo.AddAsync(DTO.ToEntity());
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<IngredientDTO>.Failure();
            }

            var findResult = await GetByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<IngredientDTO>.Failure();
            }

            return Result<IngredientDTO>.Success(findResult.Data);
        }

        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }

        public async Task<Result<IEnumerable<IngredientDTO>>> GetAllAsync()
        {

            var ingredients = await _repo.GetAllAsync();

            if (!ingredients.IsSuccess || ingredients.Data == null)
            {
                return Result<IEnumerable<IngredientDTO>>.Failure();
            }
            var result = ingredients.Data.Select(item => item.ToDTO());
            return Result<IEnumerable<IngredientDTO>>.Success(result);
        }

        public async Task<Result<IngredientDTO>> GetByIdAsync(int id)
        {
            var findResult = await _repo.FindByAsync(i => i.Id, id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<IngredientDTO>.Failure();
            }
            return Result<IngredientDTO>.Success(findResult.Data.ToDTO());
        }

        public async Task<Result<IngredientDTO>> UpdateAsync(int id, IngredientDTO DTO)
        {
            var findResult = await FindByIdAsync(id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<IngredientDTO>.Failure();
            }

            findResult.Data.UpdateFromDTO(DTO);

            var updateResult = await _repo.UpdateAsync(findResult.Data);
            if (!updateResult.IsSuccess || updateResult.Data == null)
            {
                return Result<IngredientDTO>.Failure();
            }

            return await GetByIdAsync(id);
        }

        private async Task<Result<Ingredient>> FindByIdAsync(int id)
        {
            return await _repo.FindByAsync(item => item.Id, id);
        }

    }
}
