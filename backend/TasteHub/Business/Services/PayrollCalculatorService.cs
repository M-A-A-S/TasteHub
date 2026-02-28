using TasteHub.Business.Interfaces;
using TasteHub.Entities;
using TasteHub.Enums;

namespace TasteHub.Business.Services
{
    public class PayrollCalculatorService : IPayrollCalculatorService
    {
        private const int StandardWorkHoursPerDay = 8;
        private const decimal OvertimeMultiplier = 1.5m;

        public Payroll Calculate(Employee employee, 
            IDictionary<int, IEnumerable<Attendance>> attendanceDictionary,
            IDictionary<int, IEnumerable<Leave>> leavesDictionary, 
            byte month, 
            short year)
        {

            if (employee == null || employee.BaseSalary <= 0)
            {
                return null;
            }

            var monthStart = GetMonthStart(year, month);
            var monthEnd = GetMonthEnd(year, month);

            var(effectiveStart, effectiveEnd) = 
                GetEffectiveWorkPeriod(employee, monthStart, monthEnd);

            if (effectiveEnd < effectiveStart)
            {
                return null;
            }

            int workedDays = CalculateWorkedDays(effectiveStart, effectiveEnd);

            // Salary Calculations

            decimal dailySalary = 
                CalculateDailySalary(employee.BaseSalary, year, month);

            decimal hourlyRate = CalculateHourlyRate(dailySalary);

            decimal proratedSalary = dailySalary * workedDays;

            // Attendances

            var employeeAttendance =
                attendanceDictionary.ContainsKey(employee.Id)
                ? attendanceDictionary[employee.Id]
                : new List<Attendance>();

            var totalOvertimeMinutes =
                employeeAttendance.Sum(a => a.OvertimeMinutes);

            var totalLateMinutes =
                employeeAttendance.Sum(a => a.LateMinutes);

            decimal overtimeAmount =
                (totalOvertimeMinutes / 60m) * hourlyRate * OvertimeMultiplier;

            decimal lateDeduction =
                (totalLateMinutes / 60m) * hourlyRate;

            // Leaves

            var employeeLeaves =
           leavesDictionary.ContainsKey(employee.Id)
           ? leavesDictionary[employee.Id]
           : new List<Leave>();

            var unpaidLeaves = employeeLeaves
                .Where(l => l.EmployeeId == employee.Id &&
                !l.LeaveType.IsPaid);

            int unpaidDays = unpaidLeaves.Sum(l => l.TotalDays);

            decimal unpaidDeduction = unpaidDays * dailySalary;

            decimal totalDeductions = lateDeduction + unpaidDeduction;

            decimal netSalary = 
                proratedSalary + overtimeAmount  - totalDeductions;           

            return new Payroll
            {
                EmployeeId = employee.Id,
                PayrollMonth = month,
                PayrollYear = year,

                BaseSalary = employee.BaseSalary,

                ProratedSalary = proratedSalary,
                Overtime = overtimeAmount,
                Allowances = 0,
                Deductions = totalDeductions,
                NetSalary = netSalary,

                PayrollStatus = PayrollStatus.Draft,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };
        }


        private DateOnly GetMonthStart(short year, byte month)
        {
            return new DateOnly(year, month, 1);
        }

        private DateOnly GetMonthEnd(short year, byte month)
        {
            //01-03-2025 AddMonths(1) => 01-04-2025 (first Day of the next month)
            // AddDays(-1) => 31-03-2025 (last day of original month)
            return new DateOnly(year, month, 1).AddMonths(1).AddDays(-1);
        }

        private (DateOnly effectiveStart, DateOnly effectiveEnd) GetEffectiveWorkPeriod(
            Employee employee,
            DateOnly monthStart,
            DateOnly monthEnd)
        {
            /*
              If employee hired mid-month:
              Work starts from HireDate

              If employee was already working:
              Work starts from monthStart
          */

            var effectiveStart = employee.HireDate > monthStart
                ? employee.HireDate
                : monthStart;


            /*
              If employee terminated during month:
              Work ends at TerminationDate

              Otherwise:
              Work ends at monthEnd
          */

            var effectiveEnd = employee.TerminationDate.HasValue &&
                employee.TerminationDate < monthEnd
                ? employee.TerminationDate.Value
                : monthEnd;

            return (effectiveStart, effectiveEnd);
        }

        private int CalculateWorkedDays(DateOnly start, DateOnly end)
        {
            /*
            DateOnly.DayNumber gives absolute day count.

            If:
            start = 01-03
            end   = 01-03

            end.DayNumber - start.DayNumber = 0

            BUT employee worked 1 day.

            So we ADD +1 to include the first day.
        */
            return (end.DayNumber - start.DayNumber) + 1;
        }

        private decimal CalculateDailySalary(decimal baseSalary, short year, byte month)
        {
            var totalDays = DateTime.DaysInMonth(year, month);

            /*
               We divide by total days of that month
               Not fixed 30

               Because:
               Feb = 28/29
               April = 30
               March = 31
           */

            return baseSalary / totalDays;
        }

        private decimal CalculateHourlyRate(decimal dailySalary)
        {
            return dailySalary / StandardWorkHoursPerDay;
        }
    }
}
