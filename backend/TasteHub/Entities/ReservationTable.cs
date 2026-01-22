using System.ComponentModel.DataAnnotations;

namespace TasteHub.Entities
{
    public class ReservationTable
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ReservationId { get; set; }

        [Required]
        public int TableId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Reservation Reservation { get; set; } = null!;
        public Table Table { get; set; } = null!;
    }
}
