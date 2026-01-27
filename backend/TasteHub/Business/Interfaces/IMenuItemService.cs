using TasteHub.DTOs.MenuItem;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IMenuItemService
    {
        Task<Result<MenuItemDTO>> AddAsync(MenuItemDTO dto);
        Task<Result<MenuItemDTO>> UpdateAsync(int id, MenuItemDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<MenuItemDTO>> GetByIdAsync(int id);
        Task<Result<PagedResult<MenuItemDTO>>> GetFilteredAsync(
            MenuItemFiltersDTO filters
        );
    }
}
