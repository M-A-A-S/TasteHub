using TasteHub.DTOs.Ingredient;
using TasteHub.DTOs.Size;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IIngredientService 
    {
        Task<Result<IEnumerable<IngredientDTO>>> GetAllAsync();
        Task<Result<IngredientDTO>> GetByIdAsync(int id);
        Task<Result<IngredientDTO>> AddAsync(IngredientDTO DTO);
        Task<Result<IngredientDTO>> UpdateAsync(int id, IngredientDTO DTO);
        Task<Result<bool>> DeleteAsync(int id);
    }
}
