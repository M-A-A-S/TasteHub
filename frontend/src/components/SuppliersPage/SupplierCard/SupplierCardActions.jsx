import { Pencil, Trash2 } from "lucide-react";
import { safeCall } from "../../../utils/utils";

const SupplierCardActions = ({
  supplier,
  handleEditSupplier,
  handleDeleteSupplier,
  className = "",
}) => {
  const onEdit = safeCall(handleEditSupplier);
  const onDelete = safeCall(handleDeleteSupplier);

  return (
    <div className={`flex items-center justify-end gap-3 ${className}`}>
      <button
        onClick={() => onEdit(supplier)}
        className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={() => onDelete(supplier)}
        className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
export default SupplierCardActions;
