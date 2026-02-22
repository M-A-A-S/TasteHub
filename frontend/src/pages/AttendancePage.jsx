import { useEffect, useState } from "react";
import TableView from "../components/AttendancePage/TableView";
import CardView from "../components/AttendancePage/CardView";
import { create, read } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import { useLanguage } from "../hooks/useLanguage";
import Input from "../components/UI/Input";
import PageHeader from "../components/PageHeader";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import { AttendanceStatus } from "../utils/constants";

const AttendancePage = () => {
  const { translations } = useLanguage();

  const {
    title,
    description,
    attendance_checkin_success,
    attendance_checkin_fail,
    attendance_checkout_success,
    attendance_checkout_fail,
  } = translations.pages.attendance_page;

  const { loading_error, empty_state } = translations.common;

  const [view, setView] = useState("card");

  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [errorCode, setErrorCode] = useState("");

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEmployees = async () => {
    let result;
    try {
      setEmployeesLoading(true);
      setErrorCode("");

      result = await read("employees");
      setEmployees(result.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setErrorCode(error?.code);
    } finally {
      setEmployeesLoading(false);
    }
  };

  const fetchAttendanceRecords = async () => {
    let result;
    try {
      setAttendanceLoading(true);
      setErrorCode("");

      result = await read(`attendances?date=${selectedDate}`);
      setAttendanceRecords(result.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setErrorCode(error?.code);
    } finally {
      setAttendanceLoading(false);
    }
  };

  async function checkInEmployee(employeeId) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`attendances/check-in`, employeeId);
      showSuccess(result?.code, attendance_checkin_success);
      await fetchAttendanceRecords();
    } catch (error) {
      showFail(error?.code, attendance_checkin_fail);
    } finally {
      setActionLoading(false);
    }
  }

  async function checkOutEmployee(employeeId) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`attendances/check-out`, employeeId);
      showSuccess(result?.code, attendance_checkout_success);
      await fetchAttendanceRecords();
    } catch (error) {
      console.log("error -> ", error);
      showFail(error?.code, attendance_checkout_fail);
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
    fetchAttendanceRecords();
  }, [selectedDate]);

  const getAttendanceStatusName = (status) => {
    const attendanceStatus = AttendanceStatus?.find((g) => g.value === status);
    return attendanceStatus
      ? translations.attendance_status[attendanceStatus.key]
      : translations.attendance_status.not_recorded;
  };

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        }
      />

      {employeesLoading || attendanceLoading ? (
        <div className="grid place-items-center h-[60vh]">
          <SpinnerLoader />
        </div>
      ) : errorCode ? (
        <div className="grid place-items-center h-[60vh] text-red-500">
          {translations.server_codes[errorCode] || loading_error}
        </div>
      ) : employeesLoading?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />

          {view === "card" && (
            <CardView
              employees={employees}
              attendanceRecords={attendanceRecords}
              checkInEmployee={checkInEmployee}
              checkOutEmployee={checkOutEmployee}
              selectedDate={selectedDate}
              getAttendanceStatusName={getAttendanceStatusName}
              loading={actionLoading}
            />
          )}

          {view === "table" && (
            <TableView
              employees={employees}
              attendanceRecords={attendanceRecords}
              checkInEmployee={checkInEmployee}
              checkOutEmployee={checkOutEmployee}
              selectedDate={selectedDate}
              getAttendanceStatusName={getAttendanceStatusName}
              loading={actionLoading}
            />
          )}
        </>
      )}
    </div>
  );
};
export default AttendancePage;
