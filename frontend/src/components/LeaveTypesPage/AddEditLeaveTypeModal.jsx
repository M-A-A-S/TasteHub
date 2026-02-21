import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import AddEditModal from "../UI/AddEditModal";
import Input from "../UI/Input";
import Checkbox from "../UI/Checkbox";

const initialFormState = {
  nameEn: "",
  nameAr: "",
  isPaid: true,
  defaultDaysPerYear: "",
};

const AddEditLeaveTypeModal = ({
  show,
  onClose,
  onConfirm,
  leaveType,
  loading,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations } = useLanguage();

  const {
    add_new_leave_type,
    edit_leave_type,
    form: {
      name_en_label,
      name_en_placeholder,
      name_en_error,
      name_ar_label,
      name_ar_placeholder,
      name_ar_error,
      is_paid_label,
      default_days_label,
      default_days_placeholder,
      default_days_error,
      default_days_negative_error,
    },
  } = translations.pages.leave_types_page;

  const { default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (leaveType) {
      setFormData({
        nameEn: leaveType?.nameEn || "",
        nameAr: leaveType?.nameAr || "",
        isPaid: leaveType?.isPaid ?? true,
        defaultDaysPerYear: leaveType?.defaultDaysPerYear ?? "",
      });
    } else {
      setFormData(initialFormState);
    }

    setErrors({});
  }, [leaveType, show]);

  const validateFormData = () => {
    let temp = {};

    if (!formData.nameEn.trim()) {
      temp.nameEn = name_en_error;
    }

    if (!formData.nameAr.trim()) {
      temp.nameAr = name_ar_error;
    }

    if (formData.defaultDaysPerYear === "") {
      temp.defaultDaysPerYear = default_days_error;
    }

    if (formData.defaultDaysPerYear < 0) {
      temp.defaultDaysPerYear = default_days_negative_error;
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  function handleSubmit() {
    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    const payload = {
      nameEn: formData.nameEn,
      nameAr: formData.nameAr,
      isPaid: formData.isPaid,
      defaultDaysPerYear: Number(formData.defaultDaysPerYear),
    };

    safeCall(onConfirm)(payload);
  }

  return (
    <AddEditModal
      show={show}
      onClose={handleClose}
      title={leaveType ? edit_leave_type : add_new_leave_type}
      onSave={handleSubmit}
      loading={loading}
    >
      <Input
        label={name_en_label}
        name="nameEn"
        placeholder={name_en_placeholder}
        value={formData.nameEn}
        errorMessage={errors.nameEn}
        onChange={(e) => updateField("nameEn", e.target.value)}
        showLabel={true}
      />
      <Input
        label={name_ar_label}
        name="nameAr"
        placeholder={name_ar_placeholder}
        value={formData.nameAr}
        errorMessage={errors.nameAr}
        onChange={(e) => updateField("nameAr", e.target.value)}
        showLabel={true}
      />

      <Input
        label={default_days_label}
        name="defaultDaysPerYear"
        type="number"
        placeholder={default_days_placeholder}
        value={formData.defaultDaysPerYear}
        errorMessage={errors.defaultDaysPerYear}
        onChange={(e) => updateField("defaultDaysPerYear", e.target.value)}
        showLabel={true}
      />

      <Checkbox
        label={is_paid_label}
        checked={formData.isPaid}
        onChange={(e) => updateField("isPaid", e.target.checked)}
        className="accent-orange-600"
      />
    </AddEditModal>
  );
};
export default AddEditLeaveTypeModal;
