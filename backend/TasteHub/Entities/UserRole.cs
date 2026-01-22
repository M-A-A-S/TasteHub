using System.ComponentModel.DataAnnotations;

namespace TasteHub.Entities
{
    public class UserRole
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Role? Role { get; set; }
        public User? User { get; set; }
    }
}
