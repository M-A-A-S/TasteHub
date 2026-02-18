using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.Person;
using TasteHub.DTOs.UserRole;

namespace TasteHub.DTOs.User
{
    public class UserDTO
    {
        public int? Id { get; set; }
        public int? PersonId { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public bool IsConfirmed { get; set; } = false;
        public string Password { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public PersonDTO? Person { get; set; }
        public ICollection<UserRoleDTO>? Roles { get; set; }

    }
}
