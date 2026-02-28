using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class ConfirmationTokenRepository : Repository<ConfirmationToken>, IConfirmationTokenRepository
    {
        public ConfirmationTokenRepository(AppDbContext context, ILogger<ConfirmationToken> logger)
: base(context, logger)
        {
        }
    }
}
