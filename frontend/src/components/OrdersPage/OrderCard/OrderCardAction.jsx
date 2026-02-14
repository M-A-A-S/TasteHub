import { Printer } from "lucide-react";
import { printBill } from "../../../utils/printBill";

const OrderCardAction = ({ order }) => {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
      <button
        onClick={() => printBill(order)}
        aria-label="Edit menu item"
        className="text-gray-500 p-2 rounded-lg 
          hover:text-orange-500 transition "
      >
        <Printer size={18} />
      </button>
    </div>
  );
};
export default OrderCardAction;
