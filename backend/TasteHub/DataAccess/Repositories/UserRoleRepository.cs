using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class UserRoleRepository : Repository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(AppDbContext context, ILogger<UserRole> logger)
: base(context, logger)
        {
        }
    }
}
