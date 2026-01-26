import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import MenuCategoriesSelect from "../MenuCategoriesSelect";
import ImagePicker from "../ImagePicker";

const initialFormState = {
  nameEn: "",
  nameAr: "",
  descriptionEn: "",
  descriptionAr: "",
  menuCategoryId: "",
  price: "",
  imageUrl: "",
  imageFile: null,
};

const AddEditMenuItemModal = ({ show, onClose, onConfirm, menuItem }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations, language } = useLanguage();
  const {
    menu_item_add_title,
    menu_item_edit_title,
    menu_item_name_en_label,
    menu_item_name_en_placeholder,
    menu_item_name_en_error,
    menu_item_name_ar_label,
    menu_item_name_ar_placeholder,
    menu_item_name_ar_error,
    menu_item_description_en_label,
    menu_item_description_en_placeholder,
    menu_item_description_ar_label,
    menu_item_description_ar_placeholder,
    menu_item_category_label,
    menu_item_category_error,
    menu_item_price_label,
    menu_item_price_placeholder,
    menu_item_price_error,
    menu_item_image_label,
    menu_item_image_error,
  } = translations.pages.menu_page;
  const { cancel, save } = translations.common;
  const { default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (menuItem) {
      setFormData({
        nameEn: menuItem?.nameEn || "",
        nameAr: menuItem?.nameAr || "",
        descriptionEn: menuItem?.descriptionEn || "",
        descriptionAr: menuItem?.descriptionAr || "",
        menuCategoryId: menuItem?.menuCategoryId || "",
        price: menuItem?.price || "",
        imageUrl: menuItem?.imageUrl || "",
        imageFile: null,
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [menuItem, show]);

  useEffect(() => {
    validateFormData();
  }, [language]);

  const validateFormData = () => {
    let temp = {};

    if (!formData.nameEn.trim()) {
      temp.nameEn = menu_item_name_en_error;
    }

    if (!formData.nameAr.trim()) {
      temp.nameAr = menu_item_name_ar_error;
    }

    if (!formData.menuCategoryId) {
      temp.menuCategoryId = menu_item_category_error;
    }

    const price = Number(formData.price);
    if (!price || price <= 1) {
      temp.price = menu_item_price_error;
    }

    if (!formData.imageFile && !formData.imageUrl) {
      temp.imageUrl = menu_item_image_error;
      temp.imageFile = menu_item_image_error;
    }

    setErrors(temp);

    return Object.keys(temp).length === 0; // true = valid
  };

  function handleSubmit() {
    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    const payload = new FormData();

    payload.append("nameEn", formData.nameEn);
    payload.append("nameAr", formData.nameAr);
    payload.append("descriptionEn", formData.descriptionEn);
    payload.append("descriptionAr", formData.descriptionAr);
    payload.append("menuCategoryId", formData.menuCategoryId);
    payload.append("price", formData.price);

    if (formData.imageFile) {
      payload.append("imageFile", formData.imageFile);
    }

    if (formData.imageUrl && !formData.imageFile) {
      payload.append("imageUrl", formData.imageUrl);
    }

    // onConfirm?.(payload);
    safeCall(onConfirm)(payload);
  }

  return (
    <div>
      <Modal
        show={show}
        onClose={handleClose}
        title={menuItem ? menu_item_edit_title : menu_item_add_title}
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
            label={menu_item_name_en_label}
            name="nameEn"
            placeholder={menu_item_name_en_placeholder}
            value={formData.nameEn}
            errorMessage={errors.nameEn}
            onChange={(e) => updateField("nameEn", e.target.value)}
          />
          <Input
            label={menu_item_name_ar_label}
            name="nameAr"
            placeholder={menu_item_name_ar_placeholder}
            value={formData.nameAr}
            errorMessage={errors.nameAr}
            onChange={(e) => updateField("nameAr", e.target.value)}
          />
          <MenuCategoriesSelect
            name="menuCategoryId"
            value={formData.menuCategoryId}
            onChange={(e) => updateField("menuCategoryId", e.target.value)}
            label={menu_item_category_label}
            showLabel={true}
            errorMessage={errors.menuCategoryId}
          />
          <Input
            label={menu_item_description_en_label}
            name="descriptionEn"
            placeholder={menu_item_description_en_placeholder}
            value={formData.descriptionEn}
            errorMessage={errors.descriptionEn}
            onChange={(e) => updateField("descriptionEn", e.target.value)}
          />
          <Input
            label={menu_item_description_ar_label}
            name="descriptionAr"
            placeholder={menu_item_description_ar_placeholder}
            value={formData.descriptionAr}
            errorMessage={errors.descriptionAr}
            onChange={(e) => updateField("descriptionAr", e.target.value)}
          />
          <Input
            label={menu_item_price_label}
            type="number"
            name="price"
            placeholder={menu_item_price_placeholder}
            value={formData.price}
            errorMessage={errors.price}
            onChange={(e) => updateField("price", e.target.value)}
          />
          <ImagePicker
            label={menu_item_image_label}
            imageUrl={formData.imageUrl}
            imageFile={formData.imageFile}
            onChange={({ imageUrl, imageFile }) =>
              setFormData((prev) => ({ ...prev, imageUrl, imageFile }))
            }
          />
          {(errors.imageUrl || errors.imageFile) && (
            <small className="text-red-500">
              {errors.imageUrl || errors.imageFile}
            </small>
          )}
        </form>
      </Modal>
    </div>
  );
};
export default AddEditMenuItemModal;
