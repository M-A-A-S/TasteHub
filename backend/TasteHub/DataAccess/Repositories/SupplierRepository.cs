using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class SupplierRepository : Repository<Supplier>, ISupplierRepository
    {

        public SupplierRepository(AppDbContext context, ILogger<Supplier> logger)
: base(context, logger)
        {
        }

    }
}
