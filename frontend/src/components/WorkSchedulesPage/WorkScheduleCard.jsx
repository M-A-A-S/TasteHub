import { CalendarDays } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import WorkScheduleActions from "./WorkScheduleActions";

const WorkScheduleCard = ({
  workSchedule,
  handleEditWorkSchedule,
  handleDeleteWorkSchedule,
  getDayOfWeekName,
}) => {
  const { language, translations } = useLanguage();

  const {
    active,
    inactive,
    days,
    table_headers: { employee, shift_type, day_of_week, notes },
  } = translations.pages.work_schedules_page;

  const employeeName = `${workSchedule?.employee?.person?.firstName} ${workSchedule?.employee?.person?.lastName}`;

  const shiftName =
    language == "en"
      ? workSchedule?.shiftType?.shiftNameEn
      : workSchedule?.shiftType?.shiftNameAr;

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

        {employeeName || "—"}
      </h3>

      {/* Shift Type */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{shift_type}:</span> {shiftName || "—"}
      </p>

      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{day_of_week}:</span>{" "}
        {getDayOfWeekName(workSchedule?.dayOfWeek) || "—"}
      </p>

      {/* Status Badge */}
      <div className="mt-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            workSchedule?.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {workSchedule?.isActive ? active : inactive}
        </span>
      </div>

      {/* Notes */}
      {workSchedule?.additionalNotes && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">{notes}:</span>{" "}
          {workSchedule.additionalNotes}
        </p>
      )}

      <WorkScheduleActions
        workSchedule={workSchedule}
        handleEditWorkSchedule={handleEditWorkSchedule}
        handleDeleteWorkSchedule={handleDeleteWorkSchedule}
        className="mt-4 pt-4 border-t dark:border-t-slate-700 justify-end"
      />
    </div>
  );
};
export default WorkScheduleCard;
