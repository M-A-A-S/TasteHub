import AttendanceCard from "./AttendanceCard";

const CardView = ({
  employees,
  attendanceRecords,
  checkInEmployee,
  checkOutEmployee,
  loading,
  selectedDate,
  getAttendanceStatusName,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {employees?.map((employee) => {
        const record = attendanceRecords.find(
          (a) => a.employeeId === employee.id,
        );

        return (
          <AttendanceCard
            key={employee.id}
            employee={employee}
            record={record}
            checkInEmployee={checkInEmployee}
            checkOutEmployee={checkOutEmployee}
            loading={loading}
            selectedDate={selectedDate}
            getAttendanceStatusName={getAttendanceStatusName}
          />
        );
      })}
    </div>
  );
};
export default CardView;
