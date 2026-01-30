import { Minus, Plus } from "lucide-react";
import { safeCall } from "../utils/utils";

const Counter = ({ value = 1, onChange }) => {
  const handleCountChange = safeCall(onChange);

  const increment = () => {
    handleCountChange(value + 1);
  };

  const decrement = () => {
    if (value <= 0) {
      return;
    }
    handleCountChange(value - 1);
  };

  return (
    <div
      className="flex items-center gap-3 
    bg-white dark:bg-slate-800 border 
    border-gray-100 dark:border-slate-700
     rounded-xl px-2 py-1 shadow-sm"
    >
      <button onClick={decrement} className="p-1">
        <Minus size={12} />
      </button>
      <span className="text-xs font-black">{value}</span>
      <button onClick={increment} className="p-1 ">
        <Plus size={12} />
      </button>
    </div>
  );
};

export default Counter;
