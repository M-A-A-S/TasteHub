using TasteHub.DTOs.Authentication;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IAuthenticationService
    {
        Task<Result<LoginResult>> LogInAsync(LoginDTO request);
        Task<Result<LoginResult>> RefreshTokenAsync(string refreshToken);
    }
}
