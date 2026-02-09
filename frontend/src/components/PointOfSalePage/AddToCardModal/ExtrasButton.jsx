import { useLanguage } from "../../../hooks/useLanguage";

const ExtrasButton = ({ extra, extrasGroup, onToggle, isSelected }) => {
  const { language } = useLanguage();

  return (
    <button
      onClick={() => onToggle(extra, extrasGroup)}
      className={`p-4 rounded-2xl border-2 font-bold text-sm  
                        flex justify-between items-center transition-all
                        ${language == "en" ? "text-left" : "text-right"}
                        ${
                          isSelected
                            ? "border-orange-600 bg-orange-50/30 dark:bg-orange-50/5 text-orange-600"
                            : "border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-300"
                        }
                        `}
    >
      <span>
        {language == "en" ? extra.nameEn : extra.nameAr}{" "}
        <span className="block text-[10px] opacity-60">+{extra?.price}</span>
      </span>
    </button>
  );
};
export default ExtrasButton;
