using System.ComponentModel.DataAnnotations;

namespace TasteHub.Entities
{
    public class Supplier
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PersonId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Person? Person { get; set; }
    }
}
