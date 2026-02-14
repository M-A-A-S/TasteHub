using TasteHub.DTOs.Dashboard;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IDashboardService
    {

        Task<Result<DashboardDTO>> GetDashboardAsync(DateTime start, DateTime end);

    }
}
