using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.Extra;

namespace TasteHub.DTOs.ExtraGroup
{
    public class ExtraGroupDTO
    {
        public int? Id { get; set; }
        public string NameEn { get; set; } = null!;
        public string NameAr { get; set; } = null!;
        public bool Required { get; set; } = false;
        public int MaxSelect { get; set; } = 1;
        public IEnumerable<ExtraDTO>? Extras { get; set; }  
    }
}
