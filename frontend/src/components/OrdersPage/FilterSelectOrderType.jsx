import { useLanguage } from "../../hooks/useLanguage";
import { ORDER_TYPES } from "../../utils/orderHelpers";
import { safeCall } from "../../utils/utils";
import Select from "../UI/Select";

const FilterSelectOrderType = ({ value, onChange, label }) => {
  const { translations, language } = useLanguage();
  const { all } = translations.common;
  const handleChange = safeCall(onChange);

  const options = Object.entries(ORDER_TYPES).map(([key, val]) => ({
    value: Number(key),
    label:
      language === "ar"
        ? (translations.pages.orders_page.types[val] ?? val)
        : (translations.pages.orders_page.types[val] ?? val),
  }));

  options.unshift({
    value: "",
    label: all,
  });

  return (
    <Select
      options={options}
      label={label}
      value={value}
      onChange={handleChange}
    />
  );
};
export default FilterSelectOrderType;
