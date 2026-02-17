import { useLanguage } from "../hooks/useLanguage";
import { Genders } from "../utils/constants";
import { safeCall } from "../utils/utils";
import Select from "./UI/Select";

const GenderSelect = ({ value, onChange, label, errorMessage }) => {
  const { translations } = useLanguage();
  const handleChange = safeCall(onChange);

  const options = Genders?.map((gender) => ({
    value: gender.value,
    label: translations?.genders?.[gender.key] ?? gender.key,
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
export default GenderSelect;
