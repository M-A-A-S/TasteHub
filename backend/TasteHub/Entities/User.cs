using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    public class User 
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PersonId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 5)]
        [Column(TypeName = "varchar(100)")]
        public string Email { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        [Column(TypeName = "varchar(50)")]
        public string Username { get; set; }

        public bool IsConfirmed { get; set; } = false;
        public bool IsActive {  get; set; } = true;

        [Required]
        [Column(TypeName = "varchar(255)")]
        public string Password { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Person? Person { get; set; }
        public ICollection<UserRole>? Roles { get; set; }
    }
}
