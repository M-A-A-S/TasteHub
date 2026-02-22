import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import Button from "../UI/Button";

const AttendanceActions = ({
  record,
  selectedDate,
  loading,
  checkInEmployee,
  checkOutEmployee,
  employee,
  className,
}) => {
  const { translations } = useLanguage();

  const { check_in_btn, check_out_btn } = translations.pages.attendance_page;

  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  const handleCheckIn = safeCall(checkInEmployee);
  const handleCheckOut = safeCall(checkOutEmployee);

  if (!isToday) {
    return null;
  }

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {isToday && !record?.checkIn && (
        <Button disabled={loading} onClick={() => handleCheckIn(employee.id)}>
          {check_in_btn}
        </Button>
      )}

      {isToday && record?.checkIn && !record?.checkOut && (
        <Button disabled={loading} onClick={() => handleCheckOut(employee.id)}>
          {check_out_btn}
        </Button>
      )}
    </div>
  );
};
export default AttendanceActions;
