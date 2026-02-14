using TasteHub.Business.Interfaces;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Dashboard;
using TasteHub.Utilities;

namespace TasteHub.Business.Services
{
    public class DashboardService : IDashboardService
    {

        private readonly IDashboardRepository _repo;

        public DashboardService(IDashboardRepository repo)
        {
            _repo = repo;
        }


        public async Task<Result<DashboardDTO>> GetDashboardAsync(DateTime start, DateTime end)
        {
            var salesResult = await _repo.GetSalesDataAsync(start, end);
            var topItemsResult = await _repo.GetTopItemsAsync(start, end);
            var statsResult = await _repo.GetStatsAsync(start, end);

            if (!salesResult.IsSuccess || !topItemsResult.IsSuccess || !statsResult.IsSuccess)
            {
                return Result<DashboardDTO>.Failure();
            }

            var dashboard = new DashboardDTO
            {
                Sales = salesResult.Data,
                TopItems = topItemsResult.Data,
                Stats = statsResult.Data
            };

            return Result<DashboardDTO>.Success(dashboard);

        }
    }
}
