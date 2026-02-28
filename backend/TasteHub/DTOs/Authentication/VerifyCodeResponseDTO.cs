using TasteHub.Enums;

namespace TasteHub.DTOs.Authentication
{
    public class VerifyCodeResponseDTO
    {
        public ConfirmationPurpose Purpose { get; set; }
        public string Token { get; set; }
    }
}
