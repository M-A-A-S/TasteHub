using TasteHub.DTOs.Authentication;
using TasteHub.Utilities;

namespace TasteHub.Business.Interfaces
{
    public interface IAuthenticationService
    {
        Task<Result<LoginResult>> LogInAsync(LoginDTO request);
        Task<Result<LoginResult>> RefreshTokenAsync(string refreshToken);
        Task<Result<bool>> LogoutAsync(string refreshToken);
        Task<Result<bool>> ForgetPasswordAsync(string email);
        Task<Result<bool>> ResetPasswordAsync(ResetPasswordDTO resetPasswordDTO);
        Task<Result<VerifyCodeResponseDTO>> VerifyCodeAsync(string code);
        Task<Result<bool>> ResendVerificationCodeAsync(string email);
    }
}
