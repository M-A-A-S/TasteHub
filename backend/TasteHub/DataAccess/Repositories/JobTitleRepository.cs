using TasteHub.DataAccess.Interfaces;
using TasteHub.Entities;

namespace TasteHub.DataAccess.Repositories
{
    public class JobTitleRepository : Repository<JobTitle>, IJobTitleRepository
    {
        public JobTitleRepository(AppDbContext context, ILogger<JobTitle> logger)
: base(context, logger)
        {
        }
    }
}
