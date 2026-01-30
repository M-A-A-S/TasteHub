import React, { useEffect, useState } from "react";
import AddEditModal from "../UI/AddEditModal";
import { safeCall } from "../../utils/utils";
import { useLanguage } from "../../hooks/useLanguage";
import { toast } from "../../utils/toastHelper";
import Input from "../UI/Input";
const initialFormState = {
  nameEn: "",
  nameAr: "",
  priceModifier: 0,
};
const AddEditSizeModal = ({ show, onClose, onConfirm, size, loading }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const handleClose = safeCall(onClose);
  const { translations, language } = useLanguage();
  const {
    size_name_en_label,
    size_name_en_placeholder,
    size_name_en_error,
    size_name_ar_label,
    size_name_ar_placeholder,
    size_name_ar_error,
    size_price_modifier_label,
    size_price_modifier_placeholder,
    size_price_modifier_invalid_error,
    size_price_modifier_error,
  } = translations.pages.sizes_page.form;
  const { add_new_size, edit_size } = translations.pages.sizes_page;
  const { default_message } = translations.validations;

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (size) {
      setFormData({
        nameEn: size?.nameEn || "",
        nameAr: size?.nameAr || "",
        priceModifier: size?.priceModifier || 0,
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [size, show]);
  useEffect(() => {
    validateFormData();
  }, [language]);
  const validateFormData = () => {
    let temp = {};

    if (!formData.nameEn.trim()) {
      temp.nameEn = size_name_en_error;
    }

    if (!formData.nameAr.trim()) {
      temp.nameAr = size_name_ar_error;
    }

    const priceModifier = Number(formData.priceModifier);
    if (formData.priceModifier === "") {
      temp.priceModifier = size_price_modifier_error;
    } else if (priceModifier <= 0) {
      temp.priceModifier = size_price_modifier_invalid_error;
    }
    console.log("Validation errors:", temp);
    setErrors(temp);

    return Object.keys(temp).length === 0; // true = valid
  };

  function handleSubmit() {
    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    const payload = {};

    payload.nameEn = formData.nameEn;
    payload.nameAr = formData.nameAr;
    payload.priceModifier = formData.priceModifier;

    safeCall(onConfirm)(payload);
  }
  return (
    <AddEditModal
      show={show}
      onClose={handleClose}
      title={size ? edit_size : add_new_size}
      onSave={handleSubmit}
      loading={loading}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          label={size_name_en_label}
          name="nameEn"
          placeholder={size_name_en_placeholder}
          value={formData.nameEn}
          errorMessage={errors.nameEn}
          onChange={(e) => updateField("nameEn", e.target.value)}
        />
        <Input
          label={size_name_ar_label}
          name="nameAr"
          placeholder={size_name_ar_placeholder}
          value={formData.nameAr}
          errorMessage={errors.nameAr}
          onChange={(e) => updateField("nameAr", e.target.value)}
        />
        <Input
          label={size_price_modifier_label}
          type="number"
          name="priceModifier"
          showLabel={true}
          placeholder={size_price_modifier_placeholder}
          value={formData.priceModifier}
          errorMessage={errors.priceModifier}
          onChange={(e) => updateField("priceModifier", e.target.value)}
        />
      </form>
    </AddEditModal>
  );
};

export default AddEditSizeModal;
