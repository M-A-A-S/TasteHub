namespace TasteHub.Entities
{
    public class MenuItemSize
    {
        public int Id { get; set; }
        public int MenuItemId { get; set; }
        public int SizeId { get; set; }
        public decimal Price { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public MenuItem? MenuItem { get; set; }
        public Size? Size { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}
