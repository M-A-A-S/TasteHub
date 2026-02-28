namespace TasteHub.DTOs.Authentication
{
    public class ResetPasswordDTO
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
