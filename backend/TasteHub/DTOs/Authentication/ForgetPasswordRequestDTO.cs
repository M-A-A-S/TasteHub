using System.ComponentModel.DataAnnotations;

namespace TasteHub.DTOs.Authentication
{
    public class ForgetPasswordRequestDTO
    {
        [Required]
        public string Email { get; set; }
    }
}
