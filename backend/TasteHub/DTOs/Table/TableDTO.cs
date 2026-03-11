using System.ComponentModel.DataAnnotations;
using TasteHub.Enums;

namespace TasteHub.DTOs.Table
{
    public class TableDTO
    {
        public int? Id { get; set; }
        public byte TableNumber { get; set; }
        public byte NumberOfSeats { get; set; }
        public string? Location { get; set; }
        public TableStatus TableStatus { get; set; }
    }
}
