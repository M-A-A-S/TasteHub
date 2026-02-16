using TasteHub.DTOs.Extra;
using TasteHub.DTOs.MenuItem;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface ISupplierService
    {
        Task<Result<SupplierDTO>> AddAsync(SupplierDTO dto);
        Task<Result<SupplierDTO>> UpdateAsync(int id, SupplierDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<SupplierDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<SupplierDTO>>> GetAllAsync();

    }
}
