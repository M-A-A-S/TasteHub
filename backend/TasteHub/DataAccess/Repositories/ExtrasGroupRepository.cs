using Microsoft.EntityFrameworkCore;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Extra;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.Entities;
using TasteHub.Utilities;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.DataAccess.Repositories
{
    public class ExtrasGroupRepository : Repository<ExtrasGroup>, IExtrasGroupRepository
    {
        public ExtrasGroupRepository(AppDbContext context, ILogger<ExtrasGroup> logger)
    : base(context, logger)
        {
        }


        public async Task<Result<IEnumerable<ExtraGroupResponseDTO>>> GetAllAsync()
        {
            try
            {
                //var data = await _context.ExtrasGroups
                //    .AsNoTracking().Include(x => x.Extras).ToListAsync();

                var data = await _context.ExtrasGroups
                        .AsNoTracking()
                        .Include(x => x.Extras)
                        .Select(g => new ExtraGroupResponseDTO
                        {
                            Id = g.Id,
                            NameEn = g.NameEn,
                            NameAr = g.NameAr,
                            MaxSelect = g.MaxSelect,
                            Required = g.Required,
                            Extras = g.Extras.Select(e => new ExtraResponseDTO
                            {
                                Id = e.Id,
                                NameEn = e.NameEn,
                                NameAr = e.NameAr,
                                Price = e.Price,
                                GroupId = e.GroupId,
                            }).ToList()
                        })
                        .ToListAsync();

                return Result<IEnumerable<ExtraGroupResponseDTO>>.Success(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while retrieving all entities.");
                return Result<IEnumerable<ExtraGroupResponseDTO>>.Failure(ResultCodes.ServerError, 500, "Server error");
            }
        }

    }
}
