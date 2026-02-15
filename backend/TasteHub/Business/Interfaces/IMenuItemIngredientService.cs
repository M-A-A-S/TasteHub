using TasteHub.DTOs.InventoryTransaction;
using TasteHub.DTOs.MenuItemIngredient;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IMenuItemIngredientService
    {
        Task<Result<IEnumerable<MenuItemIngredientDTO>>> GetAllAsync();
        Task<Result<MenuItemIngredientDTO>> GetByIdAsync(int id);
        Task<Result<MenuItemIngredientDTO>> AddAsync(MenuItemIngredientDTO DTO);
        Task<Result<MenuItemIngredientDTO>> UpdateAsync(int id, MenuItemIngredientDTO DTO);
        Task<Result<bool>> DeleteAsync(int id);

    }
}
