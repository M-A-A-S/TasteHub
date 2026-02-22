import { Clock } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import AttendanceActions from "./AttendanceActions";

const AttendanceCard = ({
  employee,
  record,
  checkInEmployee,
  checkOutEmployee,
  loading,
  selectedDate,
  getAttendanceStatusName,
}) => {
  const { translations } = useLanguage();

  const {
    check_in_btn,
    check_out_btn,
    min,
    table_headers: { employee: employeeLabel, late_minutes, overtime_minutes },
  } = translations.pages.attendance_page;

  const checkInTime = record?.checkIn
    ? new Date(record.checkIn).toLocaleTimeString()
    : "—";

  const checkOutTime = record?.checkOut
    ? new Date(record.checkOut).toLocaleTimeString()
    : "—";

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
      hover:shadow-md transition border border-transparent p-4"
    >
      {/* Header */}
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <Clock size={18} />
        </span>
        {employee?.person?.firstName} {employee?.person?.lastName}
      </h3>

      {/* Attendance Info */}
      <div className="mt-3 text-sm space-y-1 text-gray-600 dark:text-gray-300">
        <p>
          <span className="font-medium">{employeeLabel}:</span>{" "}
          {employee?.person?.firstName} {employee?.person?.lastName}
        </p>

        <p>
          <span className="font-medium">{check_in_btn}:</span> {checkInTime}
        </p>

        <p>
          <span className="font-medium">{check_out_btn}:</span> {checkOutTime}
        </p>

        <p>
          <span className="font-medium">{late_minutes}:</span>{" "}
          {record?.lateMinutes ?? 0} {min}
        </p>

        <p>
          <span className="font-medium">{overtime_minutes}:</span>{" "}
          {record?.overtimeMinutes ?? 0} {min}
        </p>
      </div>

      {/* Status Badge */}
      <div className="mt-3">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-200 text-gray-700">
          {getAttendanceStatusName(record?.attendanceStatus)}
        </span>
      </div>

      <AttendanceActions
        employee={employee}
        record={record}
        checkInEmployee={checkInEmployee}
        checkOutEmployee={checkOutEmployee}
        selectedDate={selectedDate}
        loading={loading}
        className="mt-4 pt-4 border-t dark:border-t-slate-700 justify-end"
      />
    </div>
  );
};
export default AttendanceCard;
