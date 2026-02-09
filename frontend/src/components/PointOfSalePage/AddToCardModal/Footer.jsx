import { useLanguage } from "../../../hooks/useLanguage";
import Button from "../../ui/Button";

const Footer = ({ totalPrice, canAddToCart, onAddToCart }) => {
  const { translations } = useLanguage();

  const { add_to_cart } = translations.pages.point_of_sale_page;

  return (
    <footer className="p-8  border-t border-gray-100 dark:border-gray-700">
      <Button
        disabled={!canAddToCart}
        onClick={onAddToCart}
        className="w-full justify-center"
      >
        {`${add_to_cart} - $${totalPrice.toFixed(2)}`}
      </Button>
    </footer>
  );
};
export default Footer;
