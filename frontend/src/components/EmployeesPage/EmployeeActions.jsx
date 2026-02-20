import { Edit3, Trash2 } from "lucide-react";
import { safeCall } from "../../utils/utils";

const EmployeeActions = ({
  employee,
  handleEditEmployee,
  handleDeleteEmployee,
  className = "",
}) => {
  const onEdit = safeCall(handleEditEmployee);
  const onDelete = safeCall(handleDeleteEmployee);

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => onEdit(employee)}
        className="p-2 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-orange-50 text-gray-500 hover:text-orange-600"
      >
        <Edit3 size={16} />
      </button>

      <button
        onClick={() => onDelete(employee)}
        className="p-2 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-red-50 text-gray-500 hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
export default EmployeeActions;
