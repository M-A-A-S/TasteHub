import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { toast } from "../../utils/toastHelper";

const initialFormState = {
  nameEn: "",
  nameAr: "",
  descriptionEn: "",
  descriptionAr: "",
};

const AddEditCategoryModal = ({ show, onClose, onConfirm, category }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations, language } = useLanguage();
  const {
    add_new_category,
    edit_category,
    nameEn,
    nameAr,
    descriptionEn,
    descriptionAr,
  } = translations.pages.categories_page;
  const { cancel, save } = translations.common;
  const { required, default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (category) {
      setFormData({
        nameEn: category?.nameEn || "",
        nameAr: category?.nameAr || "",
        descriptionEn: category?.descriptionEn || "",
        descriptionAr: category?.descriptionAr || "",
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [category, show]);

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
    if (formData.descriptionEn) {
      payload.descriptionEn = formData.descriptionEn;
    }
    if (formData.descriptionAr) {
      payload.descriptionAr = formData.descriptionAr;
    }

    // onConfirm?.(payload);
    safeCall(onConfirm)(payload);
  }

  return (
    <div>
      <Modal
        show={show}
        onClose={handleClose}
        title={category ? edit_category : add_new_category}
        footer={
          <>
            <Button isCancelBtn={true} onClick={onClose}>
              {cancel}
            </Button>
            <Button className="btn btn-primary" onClick={handleSubmit}>
              {save}
            </Button>
          </>
        }
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
            label={descriptionEn}
            name="descriptionEn"
            placeholder={descriptionEn}
            value={formData.descriptionEn}
            errorMessage={errors.descriptionEn}
            onChange={(e) => updateField("descriptionEn", e.target.value)}
          />
          <Input
            label={descriptionAr}
            name="descriptionAr"
            placeholder={descriptionAr}
            value={formData.descriptionAr}
            errorMessage={errors.descriptionAr}
            onChange={(e) => updateField("descriptionAr", e.target.value)}
          />
        </form>
      </Modal>
    </div>
  );
};
export default AddEditCategoryModal;
