using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class ShiftTypeRepository : Repository<ShiftType>, IShiftTypeRepository
    {
        public ShiftTypeRepository(AppDbContext context, ILogger<ShiftType> logger)
: base(context, logger)
        {
        }
    }
}
