using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class LeaveTypeRepository : Repository<LeaveType>, ILeaveTypeRepository
    {
        public LeaveTypeRepository(AppDbContext context, ILogger<LeaveType> logger)
: base(context, logger)
        {
        }
    }
}
