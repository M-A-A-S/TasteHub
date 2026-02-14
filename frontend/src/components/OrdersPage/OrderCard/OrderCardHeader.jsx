import { useLanguage } from "../../../hooks/useLanguage";
import { formatDateTime } from "../../../utils/utils";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderTypeBadge from "./OrderTypeBadge";

const OrderCardHeader = ({ order }) => {
  const { translations } = useLanguage();
  const { orderNumber } = translations.pages.orders_page;

  return (
    <div className="flex flex-wrap justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-bold">
          {orderNumber} #{order.id}
        </h2>
        <p className="text-sm text-gray-500">
          {formatDateTime(order.orderDateTime)}
        </p>
      </div>
      <div className="flex gap-2">
        <OrderStatusBadge status={order?.orderStatus} />
        <OrderTypeBadge type={order?.orderType} />
      </div>
    </div>
  );
};
export default OrderCardHeader;
