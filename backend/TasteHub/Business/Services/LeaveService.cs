using Microsoft.EntityFrameworkCore;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Leave;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class LeaveService : ILeaveService
    {
        private readonly IUnitOfWork _unitOfWork;

        public LeaveService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        #region Add
        public async Task<Result<LeaveDTO>> AddAsync(LeaveDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _unitOfWork.Leaves.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<LeaveDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<LeaveDTO>.Failure();
            }

            return Result<LeaveDTO>.Success(findResult.Data.ToDTO());

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<LeaveDTO>>> GetAllAsync()
        {
            var suppliers = await _unitOfWork.Leaves
                .GetAllAsync(include: q => q
                    .Include(x => x.LeaveType)
                    .Include(x => x.Employee)
                        .ThenInclude(x => x.Person));

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<LeaveDTO>>.Failure();
            }

            var result = new List<LeaveDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<LeaveDTO>>.Success(result);
        }

        public async Task<Result<LeaveDTO>> GetByIdAsync(int id)
        {
            var findResult = await _unitOfWork.Leaves.FindByAsync(i => i.Id == id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<LeaveDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<LeaveDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<LeaveDTO>> UpdateAsync(int id, LeaveDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<LeaveDTO>.Failure(
                    ResultCodes.SupplierNotFound,
                    existingResult.StatusCode,
                    "Supplier not found");
            }

            var entity = existingResult.Data;

            entity.UpdateFromDTO(dto);

            var updateResult = await _unitOfWork.Leaves.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<LeaveDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<LeaveDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<LeaveDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _unitOfWork.Leaves.DeleteAndSaveAsync(id);
        }
        #endregion

        #region Request Leave and approve and cancel

        public async Task<Result<bool>> CreateLeaveAsync(LeaveDTO dto)
        {
            if (dto.EndDate < dto.StartDate)
            {
                return Result<bool>.Failure(ResultCodes.InvalidDateRange);
            }

            int totalDays = (dto.EndDate.DayNumber - dto.StartDate.DayNumber) + 1;

            // Check overlapping leave
            var overlapResult = await _unitOfWork.Leaves.FindByAsync(x =>
                x.EmployeeId == dto.EmployeeId &&
                x.LeaveStatus == LeaveStatus.Approved &&
                dto.StartDate <= x.EndDate &&
                dto.EndDate >= x.StartDate
            );

            if (overlapResult.IsSuccess && overlapResult.Data != null)
            {
                return Result<bool>.Failure(ResultCodes.OverlappingLeaveDetected);
            }

            // Check balance
            var year = DateTime.UtcNow.Year;

            var balanceResult = await _unitOfWork.LeaveBalances
                .FindByAsync(x =>
                    x.EmployeeId == dto.EmployeeId &&
                    x.Year == year);

            if (!balanceResult.IsSuccess ||
                balanceResult.Data == null)
            {
                return Result<bool>.Failure(ResultCodes.LeaveBalanceNotFound);
            }

            if (totalDays > balanceResult.Data.VacationBalance)
            {
                return Result<bool>.Failure(ResultCodes.InsufficientLeaveBalance);
            }

            var leave = new Leave
            {
                EmployeeId = dto.EmployeeId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                TotalDays = (byte)totalDays,
                LeaveTypeId = dto.LeaveTypeId,
                Reason = dto.Reason,
            };

            await _unitOfWork.Leaves.AddAsync(leave);

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<bool>.Failure(saveResult.Code);
            }

            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> ApproveLeaveAsync(LeaveDTO dto)
        {
            var leaveResult = await _unitOfWork.Leaves
                    .FindByAsync(x => x.Id == dto.Id);

            if (leaveResult.Data == null)
            {
                return Result<bool>.Failure(ResultCodes.LeaveNotFound);
            }

            if (leaveResult.Data.LeaveStatus != LeaveStatus.Pending)
            {
                return Result<bool>.Failure(ResultCodes.AlreadyProcessed);
            }

            var balanceResult = await _unitOfWork.LeaveBalances
                .FindByAsync(x => x.EmployeeId == leaveResult.Data.EmployeeId &&
                x.Year == DateTime.UtcNow.Year);

            if (balanceResult.Data == null)
            {
                return Result<bool>.Failure(ResultCodes.BalanceNotFound);
            }

            if ((bool)dto.IsApprove)
            {
                leaveResult.Data.LeaveStatus = LeaveStatus.Approved;
                leaveResult.Data.ApprovedByEmployeeId = dto.ApprovedByEmployeeId;
                leaveResult.Data.ApprovedAt = DateTime.UtcNow;

                balanceResult.Data.VacationBalance -= leaveResult.Data.TotalDays;
            } else
            {
                leaveResult.Data.LeaveStatus = LeaveStatus.Rejected;
            }

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<bool>.Failure(saveResult.Code);
            }

            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> CancelLeaveAsync(int leaveId)
        {
            var leaveResult = await _unitOfWork.Leaves
                .FindByAsync(x => x.Id == leaveId);

            if (leaveResult.Data == null)
            {
                return Result<bool>.Failure(ResultCodes.LeaveNotFound);
            }

            if (leaveResult.Data.LeaveStatus != LeaveStatus.Pending )
            {
                return Result<bool>.Failure(ResultCodes.AlreadyProcessed);
            }

            leaveResult.Data.LeaveStatus = LeaveStatus.Cancelled;

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<bool>.Failure(saveResult.Code);
            }

            return Result<bool>.Success(true);
        }

        #endregion

        #region Private Helpers
        private async Task<Result<Leave>> FindByIdAsync(int id)
        {
            return await _unitOfWork.Leaves.FindByAsync(item => item.Id == id);
        }
        #endregion
    }
}
