using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class PayrollRepository : Repository<Payroll>, IPayrollRepository
    {
        public PayrollRepository(AppDbContext context, ILogger<Payroll> logger)
: base(context, logger)
        {
        }
    }
}
