using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class WorkScheduleRepository : Repository<WorkSchedule>, IWorkScheduleRepository
    {
        public WorkScheduleRepository(AppDbContext context, ILogger<WorkSchedule> logger)
: base(context, logger)
        {
        }
    }
}
