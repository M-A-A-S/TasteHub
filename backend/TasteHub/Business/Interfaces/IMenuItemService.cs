using TasteHub.DTOs.MenuItem;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IMenuItemService
    {
        Task<Result<MenuItem>> AddAsync(MenuItemDTO dto);
        Task<Result<MenuItem>> UpdateAsync(int id, MenuItemDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<MenuItem>> GetByIdAsync(int id);
        Task<Result<PagedResult<MenuItemResponseDTO>>> GetFilteredAsync(
            MenuItemFiltersDTO filters
        );
    }
}
