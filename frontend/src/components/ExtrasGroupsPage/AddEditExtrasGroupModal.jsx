import React, { useEffect, useState } from "react";
import { toast } from "../../utils/toastHelper";
import { safeCall } from "../../utils/utils";
import { useLanguage } from "../../hooks/useLanguage";
import AddEditModal from "../UI/AddEditModal";
import Checkbox from "../UI/Checkbox";
import Input from "../UI/Input";
const initialFormState = {
  nameEn: "",
  nameAr: "",
  required: false,
  maxSelect: 1,
};

const AddEditExtrasGroupModal = ({
  show,
  onClose,
  onConfirm,
  extrasGroup,
  loading,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const { translations, language } = useLanguage();
  const {
    add_new_group,
    edit_group,
    nameEn,
    nameAr,
    maxSelect,
    is_it_required,
  } = translations.pages.extras_groups_page;

  const { required, default_message } = translations.validations;
  const handleClose = safeCall(onClose);
  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (extrasGroup) {
      setFormData({
        nameEn: extrasGroup?.nameEn || "",
        nameAr: extrasGroup?.nameAr || "",
        required: extrasGroup?.required || false,
        maxSelect: extrasGroup?.maxSelect || 1,
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [extrasGroup, show]);
  useEffect(() => {
    validateFormData();
  }, [language]);
  const validateFormData = () => {
    let temp = {};

    if (!formData.nameEn.trim()) {
      temp.nameEn = required;
    }

    if (!formData.nameAr.trim()) {
      temp.nameAr = required;
    }
    if (!formData.maxSelect || formData.maxSelect < 1) {
      temp.maxSelect = required;
    }
    setErrors(temp);

    return Object.keys(temp).length === 0; // true = valid
  };

  function handleSubmit() {
    if (!validateFormData()) {
      toast.error(default_message);
      console.log("validation failed");
      return;
    }
    let payload = {};
    if (formData.nameEn) {
      payload.nameEn = formData.nameEn;
    }
    if (formData.nameAr) {
      payload.nameAr = formData.nameAr;
    }
    if (formData.required !== undefined) {
      payload.required = formData.required;
    }
    if (formData.maxSelect !== undefined) {
      payload.maxSelect = formData.maxSelect;
    }
    safeCall(onConfirm)(payload);
  }
  return (
    <div>
      <AddEditModal
        show={show}
        onClose={handleClose}
        title={extrasGroup ? edit_group : add_new_group}
        onSave={handleSubmit}
        loading={loading}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            label={nameEn}
            name="nameEn"
            placeholder={nameEn}
            value={formData.nameEn}
            errorMessage={errors.nameEn}
            onChange={(e) => updateField("nameEn", e.target.value)}
          />
          <Input
            label={nameAr}
            name="nameAr"
            placeholder={nameAr}
            value={formData.nameAr}
            errorMessage={errors.nameAr}
            onChange={(e) => updateField("nameAr", e.target.value)}
          />

          <Input
            label={maxSelect}
            type="number"
            name="maxSelect"
            placeholder={maxSelect}
            value={formData.maxSelect}
            errorMessage={errors.maxSelect}
            onChange={(e) => updateField("maxSelect", Number(e.target.value))}
          />
          <Checkbox
            label={is_it_required}
            name="required"
            checked={formData.required}
            onChange={(e) => updateField("required", e.target.checked)}
            className="accent-orange-600"
          />
        </form>
      </AddEditModal>
    </div>
  );
};

export default AddEditExtrasGroupModal;
