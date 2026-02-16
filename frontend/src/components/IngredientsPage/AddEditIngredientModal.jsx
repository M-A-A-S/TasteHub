import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import AddEditModal from "../UI/AddEditModal";
import IngredientUnitSelect from "../IngredientUnitSelect";
import Input from "../UI/Input";

const initialFormState = {
  nameEn: "",
  nameAr: "",
  unit: "",
  lowStockThreshold: "",
  supplierId: "",
};

const AddEditIngredientModal = ({
  show,
  onClose,
  onConfirm,
  ingredient,
  loading,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations, language } = useLanguage();
  const { add_new_ingredient, edit_ingredient } =
    translations.pages.ingredients_page;

  const {
    ingredient_name_en_label,
    ingredient_name_en_placeholder,
    ingredient_name_en_error,
    ingredient_name_ar_label,
    ingredient_name_ar_placeholder,
    ingredient_name_ar_error,
    unit_label,
    unit_placeholder,
    unit_error,
    low_stock_threshold_label,
    low_stock_threshold_placeholder,
    low_stock_threshold_error,
    low_stock_threshold_invalid_error,
    supplier_label,
    supplier_placeholder,
  } = translations.pages.ingredients_page.form;

  const { required, default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (ingredient) {
      setFormData({
        nameEn: ingredient?.nameEn || "",
        nameAr: ingredient?.nameAr || "",
        unit: ingredient?.unit || "",
        lowStockThreshold: ingredient?.lowStockThreshold || "",
        supplierId: ingredient?.supplierId || "",
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [ingredient, show]);

  useEffect(() => {
    validateFormData();
  }, [language]);

  const validateFormData = () => {
    let temp = {};

    if (!formData.nameEn.trim()) {
      temp.nameEn = ingredient_name_en_error;
    }

    if (!formData.nameAr.trim()) {
      temp.nameAr = ingredient_name_ar_error;
    }

    if (formData.unit == "") {
      temp.unit = unit_error;
    }

    if (formData.lowStockThreshold === "") {
      temp.lowStockThreshold = low_stock_threshold_error;
    } else if (Number(formData.lowStockThreshold) < 1) {
      temp.lowStockThreshold = low_stock_threshold_invalid_error;
    }

    setErrors(temp);

    return Object.keys(temp).length === 0; // true = valid
  };

  function handleSubmit() {
    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    let payload = {};

    if (formData.nameEn) {
      payload.nameEn = formData.nameEn;
    }
    if (formData.nameAr) {
      payload.nameAr = formData.nameAr;
    }
    if (formData.unit != "") {
      payload.unit = Number(formData.unit);
    }
    if (formData.lowStockThreshold != "") {
      payload.lowStockThreshold = Number(formData.lowStockThreshold);
    }
    if (formData.supplierId != "") {
      payload.supplierId = Number(formData.supplierId);
    }

    // onConfirm?.(payload);
    safeCall(onConfirm)(payload);
  }

  return (
    <div>
      <AddEditModal
        show={show}
        onClose={handleClose}
        title={ingredient ? edit_ingredient : add_new_ingredient}
        onSave={handleSubmit}
        loading={loading}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            label={ingredient_name_en_label}
            name="nameEn"
            placeholder={ingredient_name_en_placeholder}
            value={formData.nameEn}
            errorMessage={errors.nameEn}
            onChange={(e) => updateField("nameEn", e.target.value)}
          />
          <Input
            label={ingredient_name_ar_label}
            name="nameAr"
            placeholder={ingredient_name_ar_placeholder}
            value={formData.nameAr}
            errorMessage={errors.nameAr}
            onChange={(e) => updateField("nameAr", e.target.value)}
          />
          <IngredientUnitSelect
            value={formData.unit}
            onChange={(e) => updateField("unit", e.target.value)}
            label={unit_label}
            errorMessage={errors.unit}
          />
          <Input
            label={low_stock_threshold_label}
            name="lowStockThreshold"
            placeholder={low_stock_threshold_placeholder}
            value={formData.lowStockThreshold}
            errorMessage={errors.lowStockThreshold}
            onChange={(e) => updateField("lowStockThreshold", e.target.value)}
          />
          {/* TODO: add suppliery input */}
        </form>
      </AddEditModal>
    </div>
  );
};
export default AddEditIngredientModal;
