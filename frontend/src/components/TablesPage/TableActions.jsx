import { Edit3, Trash2 } from "lucide-react";
import { safeCall } from "../../utils/utils";

const TableActions = ({
  table,
  handleEditTable,
  handleDeleteTable,
  className = "",
}) => {
  const onEdit = safeCall(handleEditTable);
  const onDelete = safeCall(handleDeleteTable);

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => onEdit(table)}
        className="p-2 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-orange-50 text-gray-500 hover:text-orange-600"
      >
        <Edit3 size={16} />
      </button>

      <button
        onClick={() => onDelete(table)}
        className="p-2 rounded-xl bg-gray-50 dark:bg-slate-700 hover:bg-red-50 text-gray-500 hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
export default TableActions;
