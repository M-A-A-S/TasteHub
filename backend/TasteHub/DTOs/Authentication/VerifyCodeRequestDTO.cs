using System.ComponentModel.DataAnnotations;

namespace TasteHub.DTOs.Authentication
{
    public class VerifyCodeRequestDTO
    {
        [Required]
        public string Code { get; set; }
    }
}
