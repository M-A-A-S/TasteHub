using TasteHub.DTOs.MenuItem;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IMenuItemRepository : IRepository<MenuItem>
    {
        Task<Result<PagedResult<MenuItemDTO>>> GetFilteredAsync(
                  MenuItemFiltersDTO filters
              );

    }
}
