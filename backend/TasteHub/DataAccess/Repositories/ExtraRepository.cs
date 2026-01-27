using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public class ExtraRepository : Repository<Extra>, IExtraRepository
    {
        public ExtraRepository(AppDbContext context, ILogger<Extra> logger)
    : base(context, logger)
        {
        }


        public async Task<Result<IEnumerable<ExtraDTO>>> GetAllAsync()
        {
            try
            {
                //var data = await _context.ExtrasGroups
                //    .AsNoTracking().Include(x => x.Extras).ToListAsync();

                var data = await _context.Extras
                        .AsNoTracking()
                        .Include(x => x.Group)
                        .Select(g => new ExtraDTO
                        {
                            Id = g.Id,
                            NameEn = g.NameEn,
                            NameAr = g.NameAr,
                            Price = g.Price,
                            GroupId = g.GroupId,
                            Group = new ExtraGroupDTO
                            {
                                Id = g.Group.Id,
                                NameEn = g.Group.NameEn, 
                                NameAr = g.Group.NameAr, 
                                MaxSelect = g.Group.MaxSelect, 
                                Required = g.Group.Required,
                            }
                        })
                        .ToListAsync();

                return Result<IEnumerable<ExtraDTO>>.Success(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving all entities.");
                return Result<IEnumerable<ExtraDTO>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

    }
}
