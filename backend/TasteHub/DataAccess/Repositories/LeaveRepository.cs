using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class LeaveRepository : Repository<Leave>, ILeaveRepository
    {
        public LeaveRepository(AppDbContext context, ILogger<Leave> logger)
: base(context, logger)
        {
        }
    }
}
