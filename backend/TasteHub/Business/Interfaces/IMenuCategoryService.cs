using TasteHub.DTOs.MenuCategory;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IMenuCategoryService
    {
        Task<Result<IEnumerable<MenuCategory>>> GetAllAsync();
        Task<Result<MenuCategoryDTO>> GetByIdAsync(int id);
        Task<Result<MenuCategoryDTO>> AddAsync(MenuCategoryDTO categoryDTO);
        Task<Result<MenuCategoryDTO>> UpdateAsync(int id, MenuCategoryDTO categoryDTO);
        Task<Result<bool>> DeleteAsync(int id);
    }
}
