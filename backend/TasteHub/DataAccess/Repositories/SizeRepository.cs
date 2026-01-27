using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Repositories
{
    public class SizeRepository : Repository<Size>, ISizeRepository
    {

        public SizeRepository(AppDbContext context, ILogger<Size> logger)
: base(context, logger)
        {
        }

    }
}
