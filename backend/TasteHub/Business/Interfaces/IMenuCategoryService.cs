using TasteHub.DTOs.MenuCategory;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IMenuCategoryService
    {
        Task<Result<IEnumerable<MenuCategory>>> GetAllAsync();
        Task<Result<MenuCategory>> GetByIdAsync(int id);
        Task<Result<MenuCategory>> AddAsync(MenuCategoryDTO categoryDTO);
        Task<Result<MenuCategory>> UpdateAsync(int id, MenuCategoryDTO categoryDTO);
        Task<Result<bool>> DeleteAsync(int id);
    }
}
