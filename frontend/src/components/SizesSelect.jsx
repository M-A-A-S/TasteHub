import { useEffect, useState } from "react";
import Select from "./UI/Select";
import { useLanguage } from "../hooks/useLanguage";
import { read } from "../api/apiWrapper";

const SizesSelect = ({
  value,
  onChange,
  required = false,
  disabled = false,
  errorMessage = "",
  showLabel = false,
  label,
  name,
}) => {
  const [sizes, setSizes] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const result = await read("sizes");
        const options = result?.data.map((size) => ({
          value: size.id,
          label: language === "en" ? size.nameEn : size.nameAr,
        }));
        setSizes(options);
        console.log("options", options);
      } catch (error) {
        console.error("Failed to fetch sizes:", error);
      }
    };

    fetchSizes();
  }, [language]);

  return (
    <Select
      options={sizes}
      label={label ? label : language == "en" ? "Size" : "الحجم"}
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
export default SizesSelect;
