using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class AttendanceRepository : Repository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(AppDbContext context, ILogger<Attendance> logger)
: base(context, logger)
        {
        }
    }
}
