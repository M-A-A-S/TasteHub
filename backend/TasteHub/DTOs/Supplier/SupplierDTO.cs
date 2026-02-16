using System.ComponentModel.DataAnnotations;
using TasteHub.DTOs.Person;

namespace TasteHub.DTOs.Supplier
{
    public class SupplierDTO
    {
        public int? Id { get; set; }
        public int? PersonId { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public PersonDTO? Person { get; set; }
    }
}
