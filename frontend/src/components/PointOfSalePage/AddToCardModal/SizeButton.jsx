import { useLanguage } from "../../../hooks/useLanguage";

const SizeButton = ({ menuItemSize, isSelected, onSelect }) => {
  const { language } = useLanguage();

  return (
    <button
      key={menuItemSize?.id}
      onClick={() => onSelect(menuItemSize)}
      className={`p-4 rounded-2xl border-2 font-bold text-sm  transition-all
        ${language == "en" ? "text-left" : "text-right"}
                      ${
                        isSelected
                          ? "border-orange-600  text-orange-600 bg-orange-50/30 dark:bg-orange-50/5"
                          : "border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-300"
                      }`}
    >
      {language == "en"
        ? menuItemSize?.size?.nameEn
        : menuItemSize?.size?.nameAr}{" "}
      <span className="block text-[10px] opacity-60">
        +{menuItemSize?.size?.priceModifier}
      </span>
    </button>
  );
};
export default SizeButton;
