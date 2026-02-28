using Microsoft.EntityFrameworkCore;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Payroll;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class PayrollService : IPayrollService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPayrollCalculatorService _payrollCalculatorService;

        public PayrollService(IUnitOfWork unitOfWork,
            IPayrollCalculatorService payrollCalculatorService)
        {
            _unitOfWork = unitOfWork;
            _payrollCalculatorService = payrollCalculatorService;
        }

        #region Add
        public async Task<Result<PayrollDTO>> AddAsync(PayrollDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _unitOfWork.Payrolls.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<PayrollDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<PayrollDTO>.Failure();
            }

            return Result<PayrollDTO>.Success(findResult.Data.ToDTO());

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<PayrollDTO>>> GetAllAsync(PayrollFiltersDTO filters)
        {
            var suppliers = await _unitOfWork.Payrolls.GetAllAsync(predicate: l => 
            l.PayrollMonth == filters.PayrollMonth && 
            l.PayrollYear == filters.PayrollYear, include: q => q.Include(l => l.Employee).ThenInclude(e => e.Person));

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<PayrollDTO>>.Failure();
            }

            var result = new List<PayrollDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<PayrollDTO>>.Success(result);
        }

        public async Task<Result<PayrollDTO>> GetByIdAsync(int id)
        {
            var findResult = await _unitOfWork.Payrolls.FindByAsync(i => i.Id == id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<PayrollDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<PayrollDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<PayrollDTO>> UpdateAsync(int id, PayrollDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<PayrollDTO>.Failure(
                    ResultCodes.PayrollNotFound,
                    existingResult.StatusCode,
                    "Payroll not found");
            }

            var entity = existingResult.Data;

            // Business Rule: Only Draft payrolls can be edited
            if (entity.PayrollStatus != PayrollStatus.Draft)
            {
                return Result<PayrollDTO>.Failure(
                    ResultCodes.OnlyDraftPayrollCanBeEdited,
                    400,
                    "Only draft payrolls can be edited");    
            }

            // Prevent editing system-generated fields
            if (dto.PayrollMonth != entity.PayrollMonth ||
                dto.PayrollYear != entity.PayrollYear ||
                dto.EmployeeId != entity.EmployeeId)
            {
                return Result<PayrollDTO>.Failure(
                    ResultCodes.InvalidOperation,
                    400,
                    "Cannot change payroll month, year, or employee");
            }

            entity.UpdateFromDTO(dto);

            var updateResult = await _unitOfWork.Payrolls.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<PayrollDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<PayrollDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<PayrollDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _unitOfWork.Payrolls.DeleteAndSaveAsync(id);
        }
        #endregion

        #region Generate, Get, Approve make mark paid Payroll

        public async Task<Result<bool>> GeneratePayrollAsync(byte month, short year)
        {
            // Prevent Duplicate Payroll
            var payrollsResult = await _unitOfWork.Payrolls
                    .GetAllAsync(predicate: p => p.PayrollMonth == month && 
                    p.PayrollYear == year);

            if (payrollsResult.IsSuccess && payrollsResult.Data.Any())
            {
                return Result<bool>.Failure(ResultCodes.PayrollAlreadyGenerated);
            }

            var employeesResult = await _unitOfWork.Employees
            .GetAllAsync(predicate: e =>
                e.EmploymentStatus == EmploymentStatus.Active);

            var attendanceResult = await _unitOfWork.Attendances
            .GetAllAsync(predicate: a =>
                a.AttendanceDate.Month == month &&
                a.AttendanceDate.Year == year &&
                a.IsApproved);

            var leavesResult = await _unitOfWork.Leaves
                .GetAllAsync(predicate: l =>
                l.LeaveStatus == LeaveStatus.Approved &&
                l.StartDate.Month == month &&
                l.StartDate.Year == year);

            var attendanceDictionary = attendanceResult.IsSuccess && attendanceResult.Data != null
                ? attendanceResult.Data
                .GroupBy(a => a.EmployeeId)
                .ToDictionary(g => g.Key, g => g.AsEnumerable())
                : new Dictionary<int, IEnumerable<Attendance>>();

            var leavesDictionary = leavesResult.IsSuccess && leavesResult.Data != null
                ? leavesResult.Data
                .GroupBy(a => a.EmployeeId)
                .ToDictionary(g => g.Key, g => g.AsEnumerable())
                : new Dictionary<int, IEnumerable<Leave>>();


            if (!employeesResult.IsSuccess || !employeesResult.Data.Any())
            {
                return Result<bool>.Failure(ResultCodes.EmployeesNotFound);
            }


            foreach (var employee in employeesResult.Data)
            {
                var payroll = _payrollCalculatorService.Calculate(
                    employee,
                    attendanceDictionary,
                    leavesDictionary,
                    month,
                    year);
                if (payroll != null)
                {
                    await _unitOfWork.Payrolls.AddAsync(payroll);
                }

                
            }

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<bool>.Failure();
            }

            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> ApprovePayrollAsync(int payrollId)
        {
            var payrollResult = await FindByIdAsync(payrollId);

            if (!payrollResult.IsSuccess || payrollResult.Data == null)
            {
                return Result<bool>.Failure(ResultCodes.PayrollNotFound);
            }

            if (payrollResult.Data.PayrollStatus != PayrollStatus.Draft)
            {
                return Result<bool>.Failure(ResultCodes.OnlyDraftPayrollCanBeApproved);
            }
            payrollResult.Data.PayrollStatus = PayrollStatus.Approved;
            payrollResult.Data.UpdatedAt = DateTime.UtcNow;

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<bool>.Failure();
            }

            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> MarkAsPaidAsync(int payrollId)
        {
            var payrollResult = await FindByIdAsync(payrollId);

            if (!payrollResult.IsSuccess || payrollResult.Data == null)
            {
                return Result<bool>.Failure(ResultCodes.PayrollNotFound);
            }

            if (payrollResult.Data.PayrollStatus != PayrollStatus.Approved)
            {
                return Result<bool>.Failure(ResultCodes.PayrollMustBeApprovedFirst);
            }

            payrollResult.Data.PayrollStatus = PayrollStatus.Paid;
            payrollResult.Data.PaidAt = DateTime.UtcNow;
            payrollResult.Data.UpdatedAt = DateTime.UtcNow;

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<bool>.Failure();
            }

            return Result<bool>.Success(true);
        }
        

        #endregion

        #region Private Helpers


        private async Task<Result<Payroll>> FindByIdAsync(int id)
        {
            return await _unitOfWork.Payrolls.FindByAsync(item => item.Id == id);
        }
        #endregion
    }
}
