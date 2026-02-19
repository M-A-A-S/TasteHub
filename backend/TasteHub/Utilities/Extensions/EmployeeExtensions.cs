using TasteHub.DTOs.Employee;
using TasteHub.DTOs.Supplier;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.Utilities.Extensions
{
    public static class EmployeeExtensions
    {

        public static EmployeeDTO ToDTO(this Employee entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new EmployeeDTO
            {
                Id = entity.Id,
                PersonId = entity.PersonId,
                Person = entity?.Person?.ToDTO(),
                UserId = entity.UserId,
                //User = entity.User.ToDTO(),
                UserInfo = entity.User.ToPublicDTO(),
                HireDate = entity.HireDate,
                TerminationDate = entity.TerminationDate,
                JobTitleId = entity.JobTitleId,
                JobTitle = entity.JobTitle.ToDTO(),
                BaseSalary = entity.BaseSalary,
                EmploymentStatus = entity.EmploymentStatus,
            };
        }

        public static Employee ToEntity(this EmployeeDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            Person personEntity = DTO.Person?.ToEntity();

            User userEntity = null;
            if (DTO.CreateUserAccount && DTO.User != null)
            {
                userEntity = new User
                {
                    Email = DTO.User.Email,
                    Password = DTO.User.Password,
                    Username = DTO.User.Username,
                    Person = personEntity,
                    Roles = DTO.User?.Roles
                            .Select(r => new Entities.UserRole
                            {
                                RoleId = r.RoleId
                            }).ToList() ?? new List<Entities.UserRole>()
                };
            }

            return new Employee
            {
                Id = DTO.Id ?? default,
                Person = personEntity,
                User = userEntity,
                HireDate = DTO.HireDate,
                TerminationDate = DTO.TerminationDate,
                JobTitleId = DTO.JobTitleId,
                JobTitle = DTO.JobTitle.ToEntity(),
                BaseSalary = DTO.BaseSalary,
                EmploymentStatus = DTO.EmploymentStatus,
            };
        }

        public static void UpdateFromDTO(this Employee entity, EmployeeDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.PersonId = DTO.PersonId ?? default;
            entity.Person = DTO?.Person?.ToEntity();
            entity.UserId = DTO.UserId ?? default;
            entity.User = DTO?.User?.ToEntity();
            entity.HireDate = DTO.HireDate;
            entity.TerminationDate = DTO.TerminationDate;
            entity.JobTitleId = DTO.JobTitleId;
            entity.JobTitle = DTO.JobTitle.ToEntity();
            entity.BaseSalary = DTO.BaseSalary;
            entity.EmploymentStatus = DTO.EmploymentStatus;


            entity.UpdatedAt = DateTime.UtcNow;
        }

    }
}
