using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.ExtraGroup;

namespace TasteHub.DTOs.Extra
{
    public class ExtraDTO
    {
        public int? Id { get; set; }
        public int GroupId { get; set; }
        public string NameEn { get; set; } = null!;
        public string NameAr { get; set; } = null!;
        public decimal Price { get; set; }
        public ExtraGroupDTO? Group { get; set; } = null;

    }
}
