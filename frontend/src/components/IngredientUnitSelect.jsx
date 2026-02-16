import { useLanguage } from "../hooks/useLanguage";
import { IngredientUnits } from "../utils/constants";
import { safeCall } from "../utils/utils";
import Select from "./UI/Select";

const IngredientUnitSelect = ({ value, onChange, label, errorMessage }) => {
  const { translations } = useLanguage();
  const handleChange = safeCall(onChange);

  const options = IngredientUnits?.map((unit) => ({
    value: unit.value,
    label: translations?.ingredient_units?.[unit.key] ?? unit.key,
  }));

  return (
    <Select
      options={options}
      label={label}
      showLabel={true}
      value={value}
      onChange={handleChange}
      errorMessage={errorMessage}
    />
  );
};
export default IngredientUnitSelect;
