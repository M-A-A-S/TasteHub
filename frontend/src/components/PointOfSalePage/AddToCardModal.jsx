import { safeCall } from "../../utils/utils";
import { useEffect, useState } from "react";
import Header from "./AddToCardModal/Header";
import SizeSelector from "./AddToCardModal/SizeSelector";
import ExtrasGroup from "./AddToCardModal/ExtrasGroup";
import Footer from "./AddToCardModal/Footer";

const AddToCardModal = ({ show, onClose, className, menuItem, addToCart }) => {
  const [selectedMenuItemSize, setSelectedMenuItemSize] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleClose = safeCall(onClose);
  const handleAddToCart = safeCall(addToCart);

  // Auto select first size when modal opens
  useEffect(() => {
    if (show && menuItem?.menuItemSizes?.length > 0) {
      setSelectedMenuItemSize(menuItem.menuItemSizes[0]);
    }
    if (show) {
      setSelectedExtras([]);
    }
  }, [show, menuItem]);

  // price calculation (no memo)
  const basePrice = Number(menuItem?.price || 0);
  const sizeModifier = Number(selectedMenuItemSize?.size?.priceModifier || 0);
  const extrasTotal = selectedExtras.reduce(
    (sum, extra) => sum + Number(extra?.price || 0),
    0,
  );
  const totalPrice = basePrice + sizeModifier + extrasTotal;

  const toggleExtra = (extra, extrasGroup) => {
    setSelectedExtras((prev) => {
      const groupExtras = prev.filter((e) => e.groupId === extra.groupId);
      const exists = prev.find((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      }

      if (
        extrasGroup?.maxSelect &&
        groupExtras.length >= extrasGroup?.maxSelect
      ) {
        // return prev;
        return [...prev.filter((e) => e.groupId != extra.groupId), extra];
      }

      return [...prev, extra];
    });
  };

  const canAddToCart = menuItem?.menuItemExtras?.every((menuItemExtra) => {
    const extrasGroup = menuItemExtra.extrasGroup;

    if (!extrasGroup) {
      return true;
    }

    const groupExtras = extrasGroup.extras || [];

    if (groupExtras.length === 0) {
      return true;
    }

    const selectedInGroup = selectedExtras.filter(
      (extra) => extra.groupId === extrasGroup.id,
    );

    if (extrasGroup.required) {
      const min = extrasGroup.minSelect ?? 1;

      if (selectedInGroup.length < min) {
        return false;
      }
    }

    if (
      extrasGroup.maxSelect &&
      selectedInGroup.length > extrasGroup.maxSelect
    ) {
      return false;
    }

    return true;
  });

  const onAddToCartClick = () => {
    console.log("Test");
    console.log("menuItem -> ", menuItem);
    console.log("menuItemSize -> ", selectedMenuItemSize);
    console.log("extras -> ", selectedExtras);
    console.log("totalPrice -> ", totalPrice);
    console.log("Test");

    // handleAddToCart({
    //   menuItem,
    //   menuItemSize: selectedMenuItemSize,
    //   extras: selectedExtras,
    //   totalPrice,
    // });

    handleAddToCart(menuItem, selectedMenuItemSize, selectedExtras, totalPrice);
    handleClose();
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 
    flex items-center justify-center p-4 
    bg-black/50 backdrop-blur-sm animate-fadeIn"
    >
      <div
        className={` 
        bg-white dark:bg-slate-800  rounded-[3rem] w-full max-w-xl 
        overflow-hidden shadow-2xl flex flex-col max-h-[85vh]
        ${className}
        `}
      >
        {/* Header */}
        <Header menuItem={menuItem} onClose={handleClose} />
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          {/* Sizes */}
          {menuItem?.menuItemSizes?.length > 0 && (
            <SizeSelector
              menuItemSizes={menuItem?.menuItemSizes}
              selectedMenuItemSize={selectedMenuItemSize}
              setSelectedMenuItemSize={setSelectedMenuItemSize}
            />
          )}

          {/* Extras Groups */}
          {menuItem?.menuItemExtras?.map((menuItemExtra) => (
            <>
              {menuItemExtra?.extrasGroup?.extras?.length > 0 && (
                <ExtrasGroup
                  key={menuItemExtra.id}
                  extrasGroup={menuItemExtra?.extrasGroup}
                  selectedExtras={selectedExtras}
                  toggleExtra={toggleExtra}
                />
              )}
            </>
          ))}
        </div>
        {/* Footer */}
        <Footer
          onAddToCart={onAddToCartClick}
          totalPrice={totalPrice}
          canAddToCart={canAddToCart}
        />
      </div>
    </div>
  );
};
export default AddToCardModal;
