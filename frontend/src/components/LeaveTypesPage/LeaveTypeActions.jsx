import { Pencil, Trash2 } from "lucide-react";
import { safeCall } from "../../utils/utils";

const LeaveTypeActions = ({
  leaveType,
  handleEditLeaveType,
  handleDeleteLeaveType,
  className,
}) => {
  const onEdit = safeCall(handleEditLeaveType);
  const onDelete = safeCall(handleDeleteLeaveType);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={() => onEdit(leaveType)}
        className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={() => onDelete(leaveType)}
        className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
export default LeaveTypeActions;
