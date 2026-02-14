import { useLanguage } from "../../../hooks/useLanguage";
import { formatDateTime } from "../../../utils/utils";

const OrderCardFooter = ({ order }) => {
  const { translations } = useLanguage();
  const { created, updated } = translations.pages.orders_page;

  return (
    <footer className="mt-4 text-xs text-gray-400 flex justify-between">
      <span>
        {created}: {formatDateTime(order.createdAt)}
      </span>
      <span>
        {updated}: {formatDateTime(order.updatedAt)}
      </span>
    </footer>
  );
};
export default OrderCardFooter;
