import { useLanguage } from "../../../hooks/useLanguage";
import { ORDER_STATUS, STATUS_STYLES } from "../../../utils/orderHelpers";

const OrderStatusBadge = ({ status }) => {
  const { translations } = useLanguage();

  const statusKey = ORDER_STATUS[status];
  const statusStyle = STATUS_STYLES[statusKey] ?? "bg-gray-100 text-gray-600";
  const statusText = translations.pages.orders_page.status ?? "Status";
  const translatedStatus =
    translations.pages.orders_page.statuses[statusKey] ?? statusKey ?? status;

  return (
    <span
      className={`
    px-3 py-1 text-sm rounded-full
    ${statusStyle}`}
    >
      {statusText}: {translatedStatus}
    </span>
  );
};
export default OrderStatusBadge;
