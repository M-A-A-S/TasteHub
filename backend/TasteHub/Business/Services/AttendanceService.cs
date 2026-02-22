using Microsoft.EntityFrameworkCore;
using TasteHub.Business.Interfaces;
using TasteHub.DataAccess;
using TasteHub.DataAccess.Interfaces;
using TasteHub.DTOs.Attendance;
using TasteHub.Entities;
using TasteHub.Enums;
using TasteHub.Utilities;
using TasteHub.Utilities.Extensions;
using TasteHub.Utilities.ResultCodes;

namespace TasteHub.Business.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IUnitOfWork _unitOfWork;

        public AttendanceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        #region Add
        public async Task<Result<AttendanceDTO>> AddAsync(AttendanceDTO dto)
        {
            var entity = dto.ToEntity();

            var addResult = await _unitOfWork.Attendances.AddAndSaveAsync(entity);
            if (!addResult.IsSuccess || addResult.Data == null)
            {
                return Result<AttendanceDTO>.Failure();

            }

            var findResult = await FindByIdAsync(addResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<AttendanceDTO>.Failure();
            }

            return Result<AttendanceDTO>.Success(findResult.Data.ToDTO());

        }
        #endregion


        #region Get
        public async Task<Result<IEnumerable<AttendanceDTO>>> GetAllAsync(AttendanceFiltersDTO filters)
        {
            var suppliers = await _unitOfWork.Attendances.GetAllAsync(predicate: x => x.AttendanceDate == filters.Date);

            if (!suppliers.IsSuccess || suppliers.Data == null)
            {
                return Result<IEnumerable<AttendanceDTO>>.Failure();
            }

            var result = new List<AttendanceDTO>();

            foreach (var item in suppliers.Data)
            {
                var newItem = item.ToDTO();
                result.Add(newItem);
            }

            return Result<IEnumerable<AttendanceDTO>>.Success(result);
        }

        public async Task<Result<AttendanceDTO>> GetByIdAsync(int id)
        {
            var findResult = await _unitOfWork.Attendances.FindByAsync(i => i.Id == id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<AttendanceDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();
            return Result<AttendanceDTO>.Success(result);
        }
        #endregion

        #region Update
        public async Task<Result<AttendanceDTO>> UpdateAsync(int id, AttendanceDTO dto)
        {
            var existingResult = await FindByIdAsync(id);
            if (!existingResult.IsSuccess || existingResult.Data == null)
            {
                return Result<AttendanceDTO>.Failure(
                    ResultCodes.SupplierNotFound,
                    existingResult.StatusCode,
                    "Supplier not found");
            }

            var entity = existingResult.Data;

            entity.UpdateFromDTO(dto);

            var updateResult = await _unitOfWork.Attendances.UpdateAndSaveAsync(entity);
            if (!updateResult.IsSuccess)
            {
                return Result<AttendanceDTO>.Failure();
            }

            var findResult = await FindByIdAsync(updateResult.Data.Id);
            if (!findResult.IsSuccess || findResult.Data == null)
            {
                return Result<AttendanceDTO>.Failure();
            }

            var result = findResult.Data.ToDTO();

            return Result<AttendanceDTO>.Success(result);

        }
        #endregion

        #region Delete
        public async Task<Result<bool>> DeleteAsync(int id)
        {
            return await _unitOfWork.Attendances.DeleteAndSaveAsync(id);
        }
        #endregion

        #region CheckIn and Checkout
        public async Task<Result<bool>> CheckInAsync(int employeeId)
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var now = DateTime.Now;
            var currentTime = TimeOnly.FromDateTime(now);

            var schedule = await GetTodaySchedule(employeeId, now.DayOfWeek);
            if (schedule == null)
            {
                return Result<bool>.Failure(ResultCodes.NoActiveWorkScheduleForToday);
            }

            var shift = schedule.ShiftType;

            if (!CanCheckIn(currentTime, shift.StartTime, shift.EndTime))
            {
                return Result<bool>.Failure(ResultCodes.NotWithinShiftTime);
            }

            var existingAttendance = await GetTodayAttendance(employeeId, today);

            if (existingAttendance?.CheckIn != null)
            {
                return Result<bool>.Failure(ResultCodes.AlreadyCheckedIn);
            }

            var attendance = new Attendance
            {
                EmployeeId = employeeId,
                WorkScheduleId = schedule.Id,
                AttendanceDate = today,
                CheckIn = now,
                LateMinutes = CalculateLateMinutes(currentTime, shift.StartTime),
                AttendanceStatus = AttendanceStatus.Present,
                IsApproved = false,
                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.Attendances.AddAsync(attendance);

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<bool>.Failure(saveResult.Code);
            }

            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> CheckOutAsync(int employeeId)
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var now = DateTime.Now;
            var currentTime = TimeOnly.FromDateTime(now);

            var attendance = await GetTodayAttendanceWithSchedule(employeeId, today);

            if (attendance == null || attendance.CheckIn == null)
            {
                return Result<bool>.Failure(ResultCodes.CheckInRequired);
            }

            if (attendance.CheckOut != null)
            {
                return Result<bool>.Failure(ResultCodes.AlreadyCheckedOut);
            }
           
            var shiftEnd = attendance.WorkSchedule.ShiftType.EndTime;

            if (!CanCheckOut(currentTime, shiftEnd))
            {
                return Result<bool>.Failure(ResultCodes.EarlyCheckoutNotAllowed);
            }

            attendance.CheckOut = now;
            attendance.OvertimeMinutes = CalculateOvertimeMinutes(currentTime, shiftEnd);
            attendance.UpdatedAt = DateTime.UtcNow;

            var saveResult = await _unitOfWork.SaveChangesAsync();
            if (!saveResult.IsSuccess)
            {
                return Result<bool>.Failure(saveResult.Code);
            }

            return Result<bool>.Success(true);
        }

        #endregion

        #region Private Helpers

        private bool IsWithinShift(TimeOnly shiftStart, TimeOnly shiftEnd, TimeOnly currentTime)
        {
            return currentTime >= shiftStart && currentTime <= shiftEnd;
        }

        private async Task<Result<Attendance>> FindByIdAsync(int id)
        {
            return await _unitOfWork.Attendances.FindByAsync(item => item.Id, id);
        }

        private async Task<WorkSchedule?> GetTodaySchedule(int employeeId, DayOfWeek day)
        {
            var result = await _unitOfWork.WorkSchedules
                .FindByAsync(ws =>
                    ws.EmployeeId == employeeId &&
                    ws.DayOfWeek == day &&
                    ws.IsActive,
                    q => q.Include(ws => ws.ShiftType));

            return result.IsSuccess ? result.Data : null;
        }

        private async Task<Attendance?> GetTodayAttendance(int employeeId, DateOnly today)
        {
            var result = await _unitOfWork.Attendances
                .FindByAsync(
                    x => x.EmployeeId == employeeId &&
                    x.AttendanceDate == today);

            return result.IsSuccess ? result.Data : null;
        }


        private async Task<Attendance?> GetTodayAttendanceWithSchedule(int employeeId, DateOnly today)
        {
            var result = await _unitOfWork.Attendances
                .FindByAsync(
                    x => x.EmployeeId == employeeId &&
                    x.AttendanceDate == today,
                q => q.Include(a => a.WorkSchedule)
                        .ThenInclude(a => a.ShiftType));

            return result.IsSuccess ? result.Data : null;
        }

        private bool CanCheckIn(TimeOnly now, TimeOnly shiftStart, TimeOnly shiftEnd)
        {
            var allowedStart = shiftStart.AddMinutes(-15);
            return now >= allowedStart && now <= shiftEnd;
        }

        private bool CanCheckOut(TimeOnly now, TimeOnly shiftEnd)
        {
            return now >= shiftEnd.AddMinutes(-15);
        }

        private int CalculateLateMinutes(TimeOnly now, TimeOnly shiftStart)
        {
            return now > shiftStart ? (int)(now - shiftStart).TotalMinutes : 0;
        }

        private int CalculateOvertimeMinutes(TimeOnly now, TimeOnly shiftEnd)
        {
            return now > shiftEnd ? (int)(now - shiftEnd).TotalMinutes : 0;
        }

        #endregion
    }
}
