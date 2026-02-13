using TasteHub.Enums;

namespace TasteHub.DTOs.Order
{
    public class OrderFiltersDTO
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public int? TableId { get; set; }
        public int? UserId { get; set; }
        public OrderStatus? OrderStatus { get; set; }
        public OrderType? OrderType { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}
