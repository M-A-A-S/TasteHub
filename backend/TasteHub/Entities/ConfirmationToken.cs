using System.ComponentModel.DataAnnotations;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class ConfirmationToken
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public string Code { get; set; }
        public ConfirmationPurpose Purpose { get; set; }
        public DateTime ExpireAt { get; set; }
        public bool IsUsed { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public User User { get; set; }
    }
}
