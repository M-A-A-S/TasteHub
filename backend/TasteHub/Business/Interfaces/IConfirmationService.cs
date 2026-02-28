using TasteHub.DTOs.User;
using TasteHub.Entities;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IConfirmationService
    {
        Task<Result<bool>> SendForgetPasswordConfirmationAsync(UserDTO userInfo);
        Task<Result<ConfirmationToken>> ValidateTokenAsync(string token);
        Task<Result<ConfirmationToken>> ValidateCodeAsync(string code);
    }
}
