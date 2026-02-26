using TasteHub.Entities;

namespace TasteHub.Business.Interfaces
{
    public interface IPayrollCalculatorService
    {
        Payroll Calculate(
        Employee employee,
        IDictionary<int, IEnumerable<Attendance>> attendanceDictionary,
        IDictionary<int, IEnumerable<Leave>> leavesDictionary,
        byte month,
        short year);
    }
}
