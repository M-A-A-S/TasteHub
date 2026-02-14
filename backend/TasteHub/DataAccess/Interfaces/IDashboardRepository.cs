using TasteHub.DTOs.Dashboard;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IDashboardRepository
    {

        Task<Result<IEnumerable<SalesDTO>>> GetSalesDataAsync(DateTime start, DateTime end);
        Task<Result<IEnumerable<TopItemDTO>>> GetTopItemsAsync(DateTime start, DateTime end);
        Task<Result<IEnumerable<StatDTO>>> GetStatsAsync(DateTime start, DateTime end);

    }
}
