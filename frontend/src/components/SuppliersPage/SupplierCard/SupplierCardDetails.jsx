import { Calendar, Phone } from "lucide-react";
import { useLanguage } from "../../../hooks/useLanguage";

const SupplierCardDetails = ({ getGenderName, supplier }) => {
  const { translations } = useLanguage();
  const person = supplier?.person || {};

  return (
    <div className="mt-3 text-sm space-y-2">
      {/* Phone */}
      <p className="flex items-center gap-2">
        <Phone size={14} />
        <span className="font-medium">
          {translations.pages.suppliers_page.form.phone_label}:
        </span>
        {person.phone || "-"}
      </p>

      {/* Gender */}
      <p>
        <span className="font-medium">
          {translations.pages.suppliers_page.form.gender_label}:{" "}
        </span>
        {getGenderName(person.gender)}
      </p>

      {/* Date of Birth */}
      <p className="flex items-center gap-2">
        <Calendar size={14} />
        <span className="font-medium">
          {translations.pages.suppliers_page.form.date_of_birth_label}:{" "}
        </span>
        {person.dateOfBirth || "-"}
      </p>
    </div>
  );
};
export default SupplierCardDetails;
