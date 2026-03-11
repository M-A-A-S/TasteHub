using TasteHub.DTOs.Employee;
using TasteHub.DTOs.Table;
using TasteHub.DTOs.WorkSchedule;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.Utilities.Extensions
{
    public static class TableExtensions
    {
        public static TableDTO ToDTO(this Table entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new TableDTO
            {
                Id = entity.Id,
                TableNumber = entity.TableNumber,
                NumberOfSeats = entity.NumberOfSeats,
                Location = entity.Location,
                TableStatus = entity.TableStatus
            };
        }

        public static Table ToEntity(this TableDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new Table
            {
                Id = DTO.Id ?? default,
                TableNumber = DTO.TableNumber,
                NumberOfSeats = DTO.NumberOfSeats,
                Location = DTO.Location,
                TableStatus = DTO.TableStatus
            };
        }

        public static void UpdateFromDTO(this Table entity, TableDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.TableNumber = DTO.TableNumber;
            entity.NumberOfSeats = DTO.NumberOfSeats;
            entity.Location = DTO.Location;
            entity.TableStatus = DTO.TableStatus;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
