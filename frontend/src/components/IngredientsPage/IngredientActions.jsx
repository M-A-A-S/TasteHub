import { Pencil, Trash2, Warehouse } from "lucide-react";
import { safeCall } from "../../utils/utils";

const IngredientActions = ({
  handleEditIngredient,
  handleDeleteIngredient,
  handleAdjustStock,
  ingredient,
  className,
}) => {
  const onEdit = safeCall(handleEditIngredient);
  const onDelete = safeCall(handleDeleteIngredient);
  const onAdjustStock = safeCall(handleAdjustStock);

  return (
    <div className={`flex items-center justify-end gap-3 ${className}`}>
      <button
        onClick={() => onEdit(ingredient)}
        className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={() => onDelete(ingredient)}
        className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
      >
        <Trash2 size={18} />
      </button>
      <button
        onClick={() => onAdjustStock(ingredient)}
        className="p-2 rounded-lg text-gray-600 hover:text-orange-500 transition"
      >
        <Warehouse size={18} />
      </button>
    </div>
  );
};
export default IngredientActions;
