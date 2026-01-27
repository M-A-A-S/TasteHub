import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { read } from "../api/apiWrapper";
import Select from "./UI/Select";

const ExtraGroupSelect = ({
  value,
  onChange,
  required = false,
  disabled = false,
  errorMessage = "",
  showLabel = false,
  label,
  name,
}) => {
  const [extraGroups, setExtraGroups] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await read("extras-groups");
        const options = result?.data.map((cat) => ({
          value: cat.id,
          label: language === "en" ? cat.nameEn : cat.nameAr,
        }));
        setExtraGroups(options);
        console.log("options", options);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [language]);

  return (
    <Select
      options={extraGroups}
      label={label ? label : language == "en" ? "Category" : "التصنيف"}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      showLabel={showLabel}
      name={name}
      errorMessage={errorMessage}
    />
  );
};
export default ExtraGroupSelect;
