using TasteHub.DTOs.Extra;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.DataAccess.Interfaces
{
    public interface IExtraRepository : IRepository<Extra>
    {
        Task<Result<IEnumerable<ExtraDTO>>> GetAllAsync();
    }
}
