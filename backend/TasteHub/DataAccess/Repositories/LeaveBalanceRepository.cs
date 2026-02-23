using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class LeaveBalanceRepository : Repository<LeaveBalance>, ILeaveBalanceRepository
    {
        public LeaveBalanceRepository(AppDbContext context, ILogger<LeaveBalance> logger)
: base(context, logger)
        {
        }
    }
}
