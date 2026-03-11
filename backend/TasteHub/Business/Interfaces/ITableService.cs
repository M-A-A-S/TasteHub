using TasteHub.DTOs.Table;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface ITableService
    {
        Task<Result<TableDTO>> AddAsync(TableDTO dto);
        Task<Result<TableDTO>> UpdateAsync(int id, TableDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<TableDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<TableDTO>>> GetAllAsync();
    }
}
