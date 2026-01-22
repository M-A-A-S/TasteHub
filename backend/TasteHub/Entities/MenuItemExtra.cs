using System.ComponentModel.DataAnnotations;

namespace TasteHub.Entities
{
    public class MenuItemExtra
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int MenuItemId { get; set; }

        [Required]
        public int ExtrasGroupId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public MenuItem? MenuItem { get; set; }
        public ExtrasGroup? ExtrasGroup { get; set; }
    }
}
