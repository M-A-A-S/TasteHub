import { CalendarDays } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { LeaveStatus } from "../../utils/constants";
import LeaveActions from "./LeaveActions";

const LeaveCard = ({
  leave,
  handleCancelLeave,
  loading,
  getPersonFullName,
  getLeaveTypeName,
  getLeaveStatusName,
}) => {
  const { translations } = useLanguage();

  const {
    table_headers: { leave_type, start_date, end_date, total_days, reason },
  } = translations.pages.leave_requests_page;

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
      hover:shadow-md transition border border-transparent p-4"
    >
      {/* Header */}
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <CalendarDays size={18} />
        </span>

        {getPersonFullName(leave?.employee?.person)}
      </h3>

      {/* Leave Type */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{leave_type}:</span>{" "}
        {getLeaveTypeName(leave?.leaveType) || "—"}
      </p>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{start_date}:</span>{" "}
        {leave?.startDate || "—"}
      </p>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{end_date}:</span> {leave?.endDate || "—"}
      </p>

      {/* Total Days */}
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{total_days}:</span>{" "}
        {leave?.totalDays || "—"}
      </p>

      <div className="mt-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            leave?.leaveStatus === LeaveStatus.approved
              ? "bg-green-100 text-green-700"
              : leave?.leaveStatus === LeaveStatus.rejected
                ? "bg-red-100 text-red-700"
                : leave?.leaveStatus === LeaveStatus.cancelled
                  ? "bg-gray-100 text-gray-700"
                  : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {getLeaveStatusName(leave?.leaveStatus) || leave?.leaveStatus}
        </span>
      </div>

      {leave?.reason && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">{reason}:</span> {leave.reason}
        </p>
      )}

      <LeaveActions
        leave={leave}
        handleCancelLeave={handleCancelLeave}
        loading={loading}
        className="mt-4 pt-4 border-t dark:border-t-slate-700 justify-end"
      />
    </div>
  );
};
export default LeaveCard;
