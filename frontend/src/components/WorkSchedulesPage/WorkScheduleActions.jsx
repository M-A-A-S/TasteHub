import { Pencil, Trash2 } from "lucide-react";
import { safeCall } from "../../utils/utils";

const WorkScheduleActions = ({
  workSchedule,
  handleEditWorkSchedule,
  handleDeleteWorkSchedule,
  className,
}) => {
  const onEdit = safeCall(handleEditWorkSchedule);
  const onDelete = safeCall(handleDeleteWorkSchedule);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={() => onEdit(workSchedule)}
        className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={() => onDelete(workSchedule)}
        className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
export default WorkScheduleActions;
