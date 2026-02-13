using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.Customer;
using TasteHub.DTOs.OrderItem;
using TasteHub.DTOs.Payment;
using TasteHub.DTOs.Table;
using TasteHub.DTOs.User;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.DTOs.Order
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int? TableId { get; set; } 
        public int? CustomerId { get; set; }
        public int UserId { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public OrderType OrderType { get; set; } = OrderType.DineIn;
        public DateTime OrderDateTime { get; set; }
        public decimal SubtotalAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal GrandTotal { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public CustomerDTO? Customer { get; set; } = null!;
        public UserDTO User { get; set; } = null!;
        public TableDTO? Table { get; set; }
        public ICollection<OrderItemDTO>? OrderItems { get; set; }
        public ICollection<PaymentDTO>? Payments { get; set; }
    }
}
