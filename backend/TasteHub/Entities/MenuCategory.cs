using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class MenuCategory
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

        [Required]
        [StringLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string? DescriptionEn { get; set; }

        [Required]
        [StringLength(100)]
        [Column(TypeName = "nvarchar(100)")]
        public string? DescriptionAr { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<MenuItem>? MenuItems { get; set; }
    }
}
