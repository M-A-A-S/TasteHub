import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import AddEditModal from "../UI/AddEditModal";
import Input from "../UI/Input";
import ExtraGroupSelect from "../ExtraGroupSelect";

const initialFormState = {
  groupId: "",
  nameEn: "",
  nameAr: "",
  price: "",
};

const AddEditExtraModal = ({ show, onClose, onConfirm, extra, loading }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations, language } = useLanguage();

  const { add_new_extra, edit_extra } = translations.pages.extras_page;

  const {
    extra_name_en_label,
    extra_name_en_placeholder,
    extra_name_en_error,
    extra_name_ar_label,
    extra_name_ar_placeholder,
    extra_name_ar_error,
    extra_price_label,
    extra_price_placeholder,
    extra_price_error,
    extra_price_invalid_error,
    extra_extra_group_label,
    extra_extra_group_placeholder,
    extra_extra_group_error,
  } = translations.pages.extras_page.form;
  const { default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (extra) {
      setFormData({
        nameEn: extra?.nameEn || "",
        nameAr: extra?.nameAr || "",
        groupId: extra?.groupId || "",
        price: extra?.price || "",
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [extra, show]);

  useEffect(() => {
    validateFormData();
  }, [language]);

  const validateFormData = () => {
    let temp = {};

    if (!formData.nameEn.trim()) {
      temp.nameEn = extra_name_en_error;
    }

    if (!formData.nameAr.trim()) {
      temp.nameAr = extra_name_ar_error;
    }

    if (!formData.groupId) {
      temp.groupId = extra_extra_group_error;
    }

    const price = Number(formData.price);
    if (formData.price === "") {
      temp.price = extra_price_error;
    } else if (price <= 0) {
      temp.price = extra_price_invalid_error;
    }
    setErrors(temp);

    return Object.keys(temp).length === 0; // true = valid
  };

  function handleSubmit() {
    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    const payload = {};

    payload.groupId = formData.groupId;
    payload.nameEn = formData.nameEn;
    payload.nameAr = formData.nameAr;
    payload.price = formData.price;

    // onConfirm?.(payload);
    safeCall(onConfirm)(payload);
  }

  return (
    <AddEditModal
      show={show}
      onClose={handleClose}
      title={extra ? edit_extra : add_new_extra}
      onSave={handleSubmit}
      loading={loading}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          label={extra_name_en_label}
          name="nameEn"
          placeholder={extra_name_en_placeholder}
          value={formData.nameEn}
          errorMessage={errors.nameEn}
          onChange={(e) => updateField("nameEn", e.target.value)}
        />
        <Input
          label={extra_name_ar_label}
          name="nameAr"
          placeholder={extra_name_ar_placeholder}
          value={formData.nameAr}
          errorMessage={errors.nameAr}
          onChange={(e) => updateField("nameAr", e.target.value)}
        />
        <ExtraGroupSelect
          name="groupId"
          value={formData.groupId}
          onChange={(e) => updateField("groupId", e.target.value)}
          label={extra_extra_group_label}
          showLabel={true}
          errorMessage={errors.groupId}
        />
        <Input
          label={extra_price_label}
          type="number"
          name="price"
          placeholder={extra_price_placeholder}
          value={formData.price}
          errorMessage={errors.price}
          onChange={(e) => updateField("price", e.target.value)}
        />
      </form>
    </AddEditModal>
  );
};
export default AddEditExtraModal;
