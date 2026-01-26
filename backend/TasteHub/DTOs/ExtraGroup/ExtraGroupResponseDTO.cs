using TasteHub.DTOs.Extra;

namespace TasteHub.DTOs.ExtraGroup
{
    public class ExtraGroupResponseDTO
    {
        public int Id { get; set; }
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        public bool Required { get; set; }
        public int MaxSelect { get; set; }
        public ICollection<ExtraResponseDTO>? Extras { get; set; }
    }
}
