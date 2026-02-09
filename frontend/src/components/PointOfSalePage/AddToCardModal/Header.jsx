import { X } from "lucide-react";
import { useLanguage } from "../../../hooks/useLanguage";
import { safeCall } from "../../../utils/utils";

const Header = ({ menuItem, onClose }) => {
  const handleClose = safeCall(onClose);
  const { language } = useLanguage();

  return (
    <header className={`relative h-64 flex-shrink-0`}>
      <img
        alt={language == "en" ? menuItem?.nameEn : menuItem?.nameAr}
        class="w-full h-full object-cover"
        src={menuItem?.imageUrl}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md text-white rounded-full"
      >
        <X />
      </button>
      <div className="absolute bottom-8 left-8 text-white">
        <h3 className="text-3xl font-black">
          {language == "en" ? menuItem?.nameEn : menuItem?.nameAr}
        </h3>
        <p className="text-sm opacity-80">
          {language == "en" ? menuItem?.descriptionEn : menuItem?.descriptionAr}
        </p>
      </div>
    </header>
  );
};
export default Header;
