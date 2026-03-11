using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using TasteHub.Enums;

namespace TasteHub.Entities
{
    [Index(nameof(TableNumber), IsUnique = true)]
    public class Table
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public byte TableNumber { get; set; }

        [Required]
        public byte NumberOfSeats { get; set; }

        public string? Location { get; set; }

        [Required]
        public TableStatus TableStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
