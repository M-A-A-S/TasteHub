using TasteHub.DTOs.Token;
using TasteHub.DTOs.User;

namespace TasteHub.Business.Interfaces
{
    public interface ITokenService
    {
        AccessTokenDTO GenerateAccessToken(UserDTO DTO);
        string GenerateRefreshToken();
    }
}
