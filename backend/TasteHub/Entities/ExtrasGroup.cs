using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class ExtrasGroup
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [Column(TypeName = "varchar(50)")]
        public string NameEn { get; set; } = null!;

        [Required]
        [StringLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string NameAr { get; set; } = null!;

        public bool Required { get; set; } = false;
        public int MaxSelect { get; set; } = 1;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Extra>? Extras { get; set; }
        public ICollection<MenuItemExtra>? MenuItemExtras { get; set; }
    }
}
