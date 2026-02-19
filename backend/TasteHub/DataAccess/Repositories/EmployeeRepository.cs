using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(AppDbContext context, ILogger<Employee> logger)
: base(context, logger)
        {
        }

        public async Task<Result<IEnumerable<Employee>>> GetAllAsync()
        {
            try
            {
                IQueryable<Employee> query = _dbSet.AsNoTracking().AsSplitQuery();


                query = query.Include(x => x.Person).Include(x => x.User).ThenInclude(x => x.Roles);

                var data = await query.ToListAsync();

                return Result<IEnumerable<Employee>>.Success(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving all entities.");
                return Result<IEnumerable<Employee>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }
    }
}
