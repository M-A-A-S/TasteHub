import { useLanguage } from "../../../hooks/useLanguage";
import SizeButton from "./SizeButton";

const SizeSelector = ({
  menuItemSizes,
  selectedMenuItemSize,
  setSelectedMenuItemSize,
}) => {
  const { translations } = useLanguage();

  const { size_selection } = translations.pages.point_of_sale_page;

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">
        {size_selection}
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {menuItemSizes?.map((menuItemSize) => {
          const isSelected = selectedMenuItemSize?.id === menuItemSize?.id;

          return (
            <SizeButton
              menuItemSize={menuItemSize}
              isSelected={isSelected}
              onSelect={setSelectedMenuItemSize}
            />
          );
        })}
      </div>
    </div>
  );
};
export default SizeSelector;
