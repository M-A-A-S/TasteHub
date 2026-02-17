import SupplierCardHeader from "./SupplierCard/SupplierCardHeader";
import SupplierCardActions from "./SupplierCard/SupplierCardActions";
import SupplierCardDetails from "./SupplierCard/SupplierCardDetails";

const SupplierCard = ({
  supplier,
  handleEditSupplier,
  handleDeleteSupplier,
  getFullName,
  getGenderName,
}) => {
  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm 
      hover:shadow-md transition border border-transparent p-3"
    >
      <SupplierCardHeader supplier={supplier} getFullName={getFullName} />

      <SupplierCardDetails supplier={supplier} getGenderName={getGenderName} />

      <SupplierCardActions
        supplier={supplier}
        handleEditSupplier={handleEditSupplier}
        handleDeleteSupplier={handleDeleteSupplier}
        className="mt-4 pt-4 border-t border-gray-100"
      />
    </div>
  );
};
export default SupplierCard;
