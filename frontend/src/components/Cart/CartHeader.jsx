import { ShoppingBag } from "lucide-react";

const CartHeader = ({ title, tableNumber }) => {
  return (
    <header
      className="flex items-center justify-between gap-1 py-2
        font-medium"
    >
      <h3>
        {title} <span className="text-orange-500">. T{tableNumber}</span>
      </h3>
      <ShoppingBag />
    </header>
  );
};
export default CartHeader;
