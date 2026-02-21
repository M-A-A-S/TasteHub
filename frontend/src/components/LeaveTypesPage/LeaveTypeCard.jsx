import { CalendarDays } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import LeaveTypeActions from "./LeaveTypeActions";

const LeaveTypeCard = ({
  leaveType,
  handleEditLeaveType,
  handleDeleteLeaveType,
}) => {
  const { language, translations } = useLanguage();

  const {
    paid,
    unpaid,
    days,
    table_headers: { default_days_per_year },
  } = translations.pages.leave_types_page;

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
      hover:shadow-md transition border border-transparent p-4"
    >
      {/* Title */}
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <CalendarDays size={18} />
        </span>

        {language === "en" ? leaveType.nameEn : leaveType.nameAr}
      </h3>

      {/* Payment Badge */}
      <div className="mt-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            leaveType.isPaid
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {leaveType.isPaid ? paid : unpaid}
        </span>
      </div>

      {/* Default Days */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{default_days_per_year}:</span>{" "}
        {leaveType.defaultDaysPerYear} {days}
      </p>

      <LeaveTypeActions
        leaveType={leaveType}
        handleEditLeaveType={handleEditLeaveType}
        handleDeleteLeaveType={handleDeleteLeaveType}
        className="mt-4 pt-4 border-t dark:border-t-slate-700 justify-end"
      />
    </div>
  );
};
export default LeaveTypeCard;
