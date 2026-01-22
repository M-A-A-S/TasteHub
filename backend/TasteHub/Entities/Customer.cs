using System.ComponentModel.DataAnnotations;

namespace TasteHub.Entities
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
