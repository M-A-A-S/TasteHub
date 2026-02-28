namespace TasteHub.DTOs.Authentication
{
    public class LoginResult
    {
        public LoginResponseDTO LoginResponse { get; set; }
        public string RefreshToken { get; set; }
    }
}
