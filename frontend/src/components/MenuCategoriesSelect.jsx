import { useEffect, useState } from "react";
import { read } from "../api/apiWrapper";
import { useLanguage } from "../hooks/useLanguage";
import Select from "./UI/Select";

const MenuCategoriesSelect = ({
  value,
  onChange,
  required = false,
  disabled = false,
  errorMessage = "",
  showLabel = false,
  label,
  name,
}) => {
  const [categories, setCategories] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await read("menu-categories");
        const options = result?.data.map((cat) => ({
          value: cat.id,
          label: language === "en" ? cat.nameEn : cat.nameAr,
        }));
        setCategories(options);
        console.log("options", options);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [language]);

  return (
    <Select
      options={categories}
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
export default MenuCategoriesSelect;
