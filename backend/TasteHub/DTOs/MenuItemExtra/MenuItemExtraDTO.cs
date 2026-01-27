using System.ComponentModel.DataAnnotations;
using TasteHub.DTOs.ExtraGroup;
using TasteHub.DTOs.MenuItem;
using TasteHub.Entities;

namespace TasteHub.DTOs.MenuItemExtra
{
    public class MenuItemExtraDTO
    {
        public int? Id { get; set; }
        public int MenuItemId { get; set; }
        public int ExtrasGroupId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public MenuItemDTO? MenuItem { get; set; }
        public ExtraGroupDTO? ExtrasGroup { get; set; }
    }
}
