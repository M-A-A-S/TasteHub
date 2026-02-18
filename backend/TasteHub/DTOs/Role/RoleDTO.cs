using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasteHub.DTOs.Role
{
    public class RoleDTO
    {
        public int? Id { get; set; }
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
