using System.ComponentModel.DataAnnotations;

namespace TasteHub.DTOs.Authentication
{
    public class ResendVerificationCodeRequestDTO
    {
        [Required]
        public string Email { get; set; }
    }
}
