using System.ComponentModel.DataAnnotations;
using TasteHub.DTOs.Employee;
using TasteHub.DTOs.Payroll;
using TasteHub.Entities;

namespace TasteHub.Utilities.Extensions
{
    public static class PayrollExtensions
    {
        public static PayrollDTO ToDTO(this Payroll entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new PayrollDTO
            {
                Id = entity.Id,
                EmployeeId = entity.EmployeeId,
                //PayrollDate = entity.PayrollDate,
                PayrollMonth = entity.PayrollMonth,
                PayrollYear = entity.PayrollYear,
                Allowances = entity.Allowances,
                BaseSalary = entity.BaseSalary,
                ProratedSalary = entity.ProratedSalary,
                Overtime = entity.Overtime,
                Deductions = entity.Deductions,
                NetSalary = entity.NetSalary,
                AdditionalNotes = entity.AdditionalNotes,
                PayrollStatus = entity.PayrollStatus,
                PaidAt = entity.PaidAt,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                Employee = new EmployeeDTO
                {
                    Id = entity.Employee?.Id,
                    Person = entity.Employee?.Person.ToDTO(),
                }
            };
        }

        public static Payroll ToEntity(this PayrollDTO DTO)
        {
            if (DTO == null)
            {
                return null;
            }

            return new Payroll
            {
                Id = DTO.Id ?? default,
                EmployeeId = DTO.EmployeeId,
                //PayrollDate = DTO.PayrollDate,
                PayrollMonth = DTO.PayrollMonth,
                PayrollYear = DTO.PayrollYear,
                BaseSalary = DTO.BaseSalary,
                ProratedSalary = DTO.ProratedSalary,
                Allowances = DTO.Allowances,
                Overtime = DTO.Overtime,
                Deductions = DTO.Deductions,
                NetSalary = DTO.NetSalary,
                AdditionalNotes = DTO.AdditionalNotes,
                PayrollStatus = DTO.PayrollStatus,
                PaidAt = DTO.PaidAt,
            };
        }

        public static void UpdateFromDTO(this Payroll entity, PayrollDTO DTO)
        {

            if (entity == null || DTO == null)
            {
                return;
            }

            entity.EmployeeId = DTO.EmployeeId;
            //entity.PayrollDate = DTO.PayrollDate;
            entity.PayrollMonth = DTO.PayrollMonth;
            entity.PayrollYear = DTO.PayrollYear;
            entity.Allowances = DTO.Allowances;
            entity.BaseSalary = DTO.BaseSalary;
            entity.ProratedSalary = DTO.ProratedSalary;
            entity.Overtime = DTO.Overtime;
            entity.Deductions = DTO.Deductions;
            entity.NetSalary = DTO.NetSalary;
            entity.AdditionalNotes = DTO.AdditionalNotes;
            entity.PayrollStatus = DTO.PayrollStatus;
            entity.PaidAt = DTO.PaidAt;

            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
