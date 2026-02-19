using TasteHub.DTOs.Supplier;
using TasteHub.DTOs.User;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IUserService
    {
        Task<Result<UserDTO>> AddAsync(UserDTO dto);
        Task<Result<UserDTO>> UpdateAsync(int id, UserDTO dto);
        Task<Result<bool>> DeleteAsync(int id);
        Task<Result<UserDTO>> GetByIdAsync(int id);
        Task<Result<IEnumerable<UserDTO>>> GetAllAsync();
        Task<Result<UserDTO>> GetByEmailAsync(string email);
        Task<Result<UserDTO>> GetByUsernameAsync(string username);
        Task<Result<bool>> UpdateUserRolesAsync(int userId, IEnumerable<int> newRoleIds);
    }
}
