import { useLanguage } from "../../../hooks/useLanguage";
import OrderItemRow from "./OrderItemRow";

const OrderItemsList = ({ orderItems }) => {
  const { translations } = useLanguage();
  const { items } = translations.pages.orders_page;

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2 text-orange-600">{items}</h3>
      <div className="space-y-2">
        {orderItems?.map((item) => (
          <OrderItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default OrderItemsList;
