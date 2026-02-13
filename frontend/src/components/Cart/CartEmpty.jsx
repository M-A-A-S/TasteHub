import { ClipboardList } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

const CartEmpty = () => {
  const { translations } = useLanguage();
  const { empty } = translations.pages.point_of_sale_page;

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <ClipboardList size={36} />
      <span>{empty}</span>
    </div>
  );
};
export default CartEmpty;
