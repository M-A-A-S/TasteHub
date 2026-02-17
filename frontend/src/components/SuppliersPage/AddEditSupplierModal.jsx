import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import AddEditModal from "../UI/AddEditModal";
import Input from "../UI/Input";
import ImagePicker from "../ImagePicker";
import GenderSelect from "../GenderSelect";

const initialFormState = {
  personId: "",
  person: {
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    imageUrl: "",
    imageFile: null,
    deleteImage: false,
  },
};

const AddEditSupplierModal = ({
  show,
  onClose,
  onConfirm,
  supplier,
  loading,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations, language } = useLanguage();
  const {
    first_name_label,
    first_name_placeholder,
    first_name_error,
    last_name_label,
    last_name_placeholder,
    last_name_error,
    phone_label,
    phone_placeholder,
    phone_error,
    gender_label,
    gender_placeholder,
    gender_error,
    date_of_birth_label,
    date_of_birth_placeholder,
    date_of_birth_error,
    image_label,
    image_placeholder,
    delete_image_label,
  } = translations.pages.suppliers_page.form;

  const { add_new_supplier, edit_supplier } = translations.pages.suppliers_page;

  const { default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updatePersonField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      person: {
        ...prev.person,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (supplier) {
      setFormData({
        personId: supplier.personId || "",
        person: {
          firstName: supplier.person.firstName || "",
          lastName: supplier.person.lastName || "",
          phone: supplier.person.phone || "",
          gender: supplier.person.gender || "",
          dateOfBirth: supplier.person.dateOfBirth || "",
          imageUrl: supplier.person.imageUrl || "",
          imageFile: null,
          deleteImage: false,
        },
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [supplier, show]);

  useEffect(() => {
    validateFormData();
  }, [language]);

  const validateFormData = () => {
    let temp = {};

    if (!formData.person.firstName.trim()) {
      temp.firstName = first_name_error;
    }

    if (!formData.person.lastName.trim()) {
      temp.lastName = last_name_error;
    }

    if (!formData.person.phone.trim()) {
      temp.phone = phone_error;
    }

    if (!formData.person.gender) {
      temp.gender = gender_error;
    }

    if (!formData.person.dateOfBirth) {
      temp.dateOfBirth = date_of_birth_error;
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = () => {
    console.log("formData -> ", formData);
    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    const payload = new FormData();

    if (formData.personId) {
      payload.append("personId", formData.personId);
    }

    payload.append("person.firstName", formData.person.firstName);
    payload.append("person.lastName", formData.person.lastName);
    payload.append("person.phone", formData.person.phone);
    payload.append("person.gender", formData.person.gender);
    payload.append("person.dateOfBirth", formData.person.dateOfBirth);

    if (formData.person.imageFile) {
      payload.append("person.imageFile", formData.person.imageFile);
    }

    if (formData.person.imageUrl && !formData.person.imageFile) {
      payload.append("person.imageUrl", formData.person.imageUrl);
    }

    payload.append("person.deleteImage", formData.person.deleteImage);

    safeCall(onConfirm)(payload);
  };

  return (
    <div>
      <AddEditModal
        show={show}
        onClose={handleClose}
        title={supplier ? edit_supplier : add_new_supplier}
        onSave={handleSubmit}
        loading={loading}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            label={first_name_label}
            placeholder={first_name_placeholder}
            value={formData.person.firstName}
            errorMessage={errors.firstName}
            onChange={(e) => updatePersonField("firstName", e.target.value)}
          />

          <Input
            label={last_name_label}
            placeholder={last_name_placeholder}
            value={formData.person.lastName}
            errorMessage={errors.lastName}
            onChange={(e) => updatePersonField("lastName", e.target.value)}
          />

          <Input
            label={phone_label}
            placeholder={phone_placeholder}
            value={formData.person.phone}
            errorMessage={errors.phone}
            onChange={(e) => updatePersonField("phone", e.target.value)}
          />

          <Input
            type="date"
            label={date_of_birth_label}
            value={formData.person.dateOfBirth}
            errorMessage={errors.dateOfBirth}
            onChange={(e) => updatePersonField("dateOfBirth", e.target.value)}
          />

          <GenderSelect
            value={formData.person.gender}
            onChange={(e) => updatePersonField("gender", e.target.value)}
            label={gender_label}
            errorMessage={errors.gender}
          />

          <ImagePicker
            label={image_label}
            imageUrl={formData.person.imageUrl}
            imageFile={formData.person.imageFile}
            onChange={({ imageUrl, imageFile }) =>
              setFormData((prev) => ({
                ...prev,
                person: {
                  ...prev.person,
                  imageUrl,
                  imageFile,
                },
              }))
            }
          />
        </form>
      </AddEditModal>
    </div>
  );
};
export default AddEditSupplierModal;
