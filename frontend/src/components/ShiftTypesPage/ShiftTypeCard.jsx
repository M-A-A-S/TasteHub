import { Clock } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import ShiftTypeActions from "./ShiftTypeActions";

const ShiftTypeCard = ({
  shiftType,
  handleEditShiftType,
  handleDeleteShiftType,
}) => {
  const { language, translations } = useLanguage();
  const {
    table_headers: { start_time, end_time, break_minutes },
  } = translations.pages.shift_types_page;

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
      hover:shadow-md transition border border-transparent p-4"
    >
      {/* Title */}
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <Clock size={18} />
        </span>

        {language === "en" ? shiftType.shiftNameEn : shiftType.shiftNameAr}
      </h3>

      {/* Time Info */}
      <div className="mt-3 text-sm space-y-1">
        <p>
          <span className="font-medium">{start_time}:</span>{" "}
          {shiftType.startTime}
        </p>

        <p>
          <span className="font-medium">{end_time}:</span> {shiftType.endTime}
        </p>

        <p>
          <span className="font-medium">{break_minutes}:</span>{" "}
          {shiftType.breakMinutes}
        </p>
      </div>

      {/* Description */}
      {shiftType.description && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {shiftType.description}
        </p>
      )}

      <ShiftTypeActions
        shiftType={shiftType}
        handleEditShiftType={handleEditShiftType}
        handleDeleteShiftType={handleDeleteShiftType}
        className="mt-4 pt-4 border-t dark:border-t-slate-700 justify-end"
      />
    </div>
  );
};
export default ShiftTypeCard;
