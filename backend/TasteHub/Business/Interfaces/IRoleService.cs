using TasteHub.DTOs.Role;
using TasteHub.DTOs.Supplier;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IRoleService
    {
        Task<Result<RoleDTO>> AddAsync(RoleDTO dto);
        Task<Result<RoleDTO>> UpdateAsync(int id, RoleDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<RoleDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<RoleDTO>>> GetAllAsync();
    }
}
