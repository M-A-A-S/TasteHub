using TasteHub.DTOs.ExtraGroup;

namespace TasteHub.DTOs.Extra
{
    public class ExtraResponseDTO
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string NameEn { get; set; } = null!;
        public string NameAr { get; set; } = null!;
        public decimal Price { get; set; }
        public ExtraGroupResponseDTO Group { get; set; }
    }
}
