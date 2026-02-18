using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.Entities
{
    public class JobTitle
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string NameEn { get; set; } = null!;

        [Required, StringLength(100)]
        [Column(TypeName = "nvarchar(100)")]
        public string NameAr { get; set; } = null!;
    }
}
