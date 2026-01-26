import { useLanguage } from "../../hooks/useLanguage";
import Select from "../UI/Select";
import { SORTING_TERMS } from "../../utils/constants";

const SortingFilter = ({
  value,
  onChange,
  required = false,
  disabled = false,
  errorMessage = "",
}) => {
  const { language } = useLanguage();
  const sortingOptions =
    language === "en"
      ? [
          { value: SORTING_TERMS.PRICE_ASC, label: "Price: Low to High" },
          { value: SORTING_TERMS.PRICE_DESC, label: "Price: High to Low" },
          { value: SORTING_TERMS.NEWEST, label: "Newest" },
          { value: SORTING_TERMS.OLDEST, label: "Oldest" },
        ]
      : [
          {
            value: SORTING_TERMS.PRICE_ASC,
            label: "السعر: من الأقل إلى الأعلى",
          },
          {
            value: SORTING_TERMS.PRICE_DESC,
            label: "السعر: من الأعلى إلى الأقل",
          },
          { value: SORTING_TERMS.NEWEST, label: "الأحدث" },
          { value: SORTING_TERMS.OLDEST, label: "الأقدم" },
        ];
  return (
    <Select
      options={sortingOptions}
      label={language == "en" ? "Sort By" : "ترتيب حسب"}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
    />
  );
};
export default SortingFilter;
