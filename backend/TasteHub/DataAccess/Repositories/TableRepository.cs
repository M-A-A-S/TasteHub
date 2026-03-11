using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class TableRepository : Repository<Table>, ITableRepository
    {
        public TableRepository(AppDbContext context, ILogger<Table> logger)
: base(context, logger)
        {
        }
    }
}
