import { useLanguage } from "../../../hooks/useLanguage";
import ExtrasButton from "./ExtrasButton";

const ExtrasGroup = ({ extrasGroup, selectedExtras, toggleExtra }) => {
  const { translations, language } = useLanguage();

  const { extras_max_select } = translations.pages.point_of_sale_page;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">
          {language == "en" ? extrasGroup?.nameEn : extrasGroup?.nameAr}
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {extrasGroup?.extras?.map((extra) => {
          const isSelected = selectedExtras.find((e) => e.id === extra.id);

          return (
            <ExtrasButton
              isSelected={isSelected}
              extra={extra}
              extrasGroup={extrasGroup}
              onToggle={toggleExtra}
            />
          );
        })}
      </div>
      {extrasGroup?.maxSelect && (
        <p className="text-gray-400 mt-1">
          {`${extras_max_select} - (${extrasGroup?.maxSelect})`}
        </p>
      )}
    </div>
  );
};
export default ExtrasGroup;
