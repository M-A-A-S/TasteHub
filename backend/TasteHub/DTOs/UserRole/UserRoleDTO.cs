using System.ComponentModel.DataAnnotations;
using TasteHub.DTOs.Role;
using TasteHub.DTOs.User;
using TasteHub.Entities;

namespace TasteHub.DTOs.UserRole
{
    public class UserRoleDTO
    {
        public int? Id { get; set; }
        public int RoleId { get; set; }
        public int? UserId { get; set; } = null;
        public bool? IsActive { get; set; } = true;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

        public RoleDTO? Role { get; set; }
        public UserDTO? User { get; set; }

    }
}
