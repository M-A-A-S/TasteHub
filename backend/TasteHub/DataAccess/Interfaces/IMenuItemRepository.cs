using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IMenuItemRepository : IRepository<MenuItem>
    {
        Task<Result<PagedResult<MenuItem>>> GetFilteredAsync(
                  int? categoryId = null,
                  string? search = null,
                  string? sort = null,  // e.g., "price_desc"
                  int pageNumber = 1,
                  int pageSize = 10
              );

    }
}
