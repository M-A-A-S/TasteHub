import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";
import AttendanceActions from "./AttendanceActions";

const TableView = ({
  employees,
  attendanceRecords,
  checkInEmployee,
  checkOutEmployee,
  loading,
  selectedDate,
  getAttendanceStatusName,
}) => {
  const { translations } = useLanguage();

  const {
    table_headers: {
      employee,
      check_in,
      check_out,
      late_minutes,
      overtime_minutes,
      status,
      actions,
    },
  } = translations.pages.attendance_page;

  const headers = [
    employee,
    check_in,
    check_out,
    late_minutes,
    overtime_minutes,
    status,
    actions,
  ];

  const data = employees.map((emp) => {
    const record = attendanceRecords.find((a) => a.employeeId === emp.id);

    const checkInTime = record?.checkIn
      ? new Date(record.checkIn).toLocaleTimeString()
      : "—";

    const checkOutTime = record?.checkOut
      ? new Date(record.checkOut).toLocaleTimeString()
      : "—";

    return {
      employee: (
        <small>
          {emp.person.firstName} {emp.person.lastName}
        </small>
      ),

      check_in: <small>{checkInTime}</small>,
      check_out: <small>{checkOutTime}</small>,
      late_minutes: <small>{record?.lateMinutes ?? 0}</small>,
      overtime_minutes: <small>{record?.overtimeMinutes ?? 0}</small>,

      status: (
        <span className="px-2 py-1 text-xs rounded-full bg-orange-200 text-gray-900 inline-block">
          {getAttendanceStatusName(record?.attendanceStatus)}
        </span>
      ),

      actions: (
        <AttendanceActions
          employee={emp}
          record={record}
          checkInEmployee={checkInEmployee}
          checkOutEmployee={checkOutEmployee}
          selectedDate={selectedDate}
          loading={loading}
          className="justify-center"
        />
      ),
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
