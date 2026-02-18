using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TasteHub.DTOs.JobTitle;
using TasteHub.DTOs.Person;
using TasteHub.DTOs.User;
using TasteHub.Enums;

namespace TasteHub.DTOs.Employee
{
    public class EmployeeDTO  
    {
        public int? Id { get; set; }
        public int? PersonId { get; set; }
        public int? UserId { get; set; }
        public DateOnly HireDate { get; set; }
        public DateOnly? TerminationDate { get; set; }
        public int JobTitleId { get; set; }
        public decimal BaseSalary { get; set; }
        public EmploymentStatus EmploymentStatus { get; set; }

        public PersonDTO Person { get; set; } = null;
        public UserDTO? User { get; set; }
        public JobTitleDTO JobTitle { get; set; } = null;
    }
}
