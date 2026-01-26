using TasteHub.DTOs.ExtraGroup;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IExtrasGroupRepository : IRepository<ExtrasGroup>
    {
       Task<Result<IEnumerable<ExtraGroupResponseDTO>>> GetAllAsync();
    }
}
