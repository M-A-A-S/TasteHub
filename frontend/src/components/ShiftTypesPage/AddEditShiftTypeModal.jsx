import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { formatTime, safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import AddEditModal from "../UI/AddEditModal";
import Input from "../UI/Input";

const initialFormState = {
  shiftNameEn: "",
  shiftNameAr: "",
  startTime: "",
  endTime: "",
  breakMinutes: "",
  description: "",
};

const AddEditShiftTypeModal = ({
  show,
  onClose,
  onConfirm,
  shiftType,
  loading,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations, language } = useLanguage();
  const {
    add_new_shift_type,
    edit_shift_type,
    form: {
      shift_name_en_label,
      shift_name_en_placeholder,
      shift_name_en_error,
      shift_name_ar_label,
      shift_name_ar_placeholder,
      shift_name_ar_error,
      start_time_label,
      start_time_placeholder,
      start_time_error,
      end_time_label,
      end_time_placeholder,
      end_time_error,
      break_minutes_label,
      break_minutes_placeholder,
      description_label,
      description_placeholder,
      break_minutes_negative_error,
      time_order_error,
    },
  } = translations.pages.shift_types_page;
  const { default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (shiftType) {
      setFormData({
        shiftNameEn: shiftType?.shiftNameEn || "",
        shiftNameAr: shiftType?.shiftNameAr || "",
        startTime: shiftType?.startTime || "",
        endTime: shiftType?.endTime || "",
        breakMinutes: shiftType?.breakMinutes || "",
        description: shiftType?.description || "",
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [shiftType, show]);

  useEffect(() => {
    validateFormData();
  }, [language]);

  const validateFormData = () => {
    let temp = {};

    if (!formData.shiftNameEn.trim()) {
      temp.shiftNameEn = shift_name_en_error;
    }

    if (!formData.shiftNameAr.trim()) {
      temp.shiftNameAr = shift_name_ar_error;
    }

    if (!formData.startTime.trim()) {
      temp.startTime = start_time_error;
    }

    if (!formData.endTime.trim()) {
      temp.endTime = end_time_error;
    }

    if (formData.startTime && formData.endTime) {
      if (formData.endTime <= formData.startTime) {
        temp.endTime = time_order_error;
      }
    }

    if (formData.breakMinutes < 0) {
      temp.breakMinutes = break_minutes_negative_error;
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

    if (formData.shiftNameEn) {
      payload.shiftNameEn = formData.shiftNameEn;
    }
    if (formData.shiftNameAr) {
      payload.shiftNameAr = formData.shiftNameAr;
    }
    if (formData.startTime) {
      payload.startTime = formatTime(formData.startTime);
    }
    if (formData.endTime) {
      payload.endTime = formatTime(formData.endTime);
    }

    if (formData.description) {
      payload.description = formData.description;
    }

    payload.breakMinutes = Number(formData.breakMinutes);

    safeCall(onConfirm)(payload);
  }

  return (
    <div>
      <AddEditModal
        show={show}
        onClose={handleClose}
        title={shiftType ? edit_shift_type : add_new_shift_type}
        onSave={handleSubmit}
        loading={loading}
      >
        <Input
          label={shift_name_en_label}
          name="shiftNameEn"
          placeholder={shift_name_en_placeholder}
          value={formData.shiftNameEn}
          errorMessage={errors.shiftNameEn}
          onChange={(e) => updateField("shiftNameEn", e.target.value)}
          showLabel={true}
        />
        <Input
          label={shift_name_ar_label}
          name="shiftNameAr"
          placeholder={shift_name_ar_placeholder}
          value={formData.shiftNameAr}
          errorMessage={errors.shiftNameAr}
          onChange={(e) => updateField("shiftNameAr", e.target.value)}
          showLabel={true}
        />
        <Input
          label={start_time_label}
          name="startTime"
          type="time"
          placeholder={start_time_placeholder}
          value={formData.startTime}
          errorMessage={errors.startTime}
          onChange={(e) => updateField("startTime", e.target.value)}
          showLabel={true}
        />
        <Input
          label={end_time_label}
          name="endTime"
          type="time"
          placeholder={end_time_placeholder}
          value={formData.endTime}
          errorMessage={errors.endTime}
          onChange={(e) => updateField("endTime", e.target.value)}
          showLabel={true}
        />
        <Input
          label={break_minutes_label}
          name="breakMinutes"
          type="number"
          placeholder={break_minutes_placeholder}
          value={formData.breakMinutes}
          errorMessage={errors.breakMinutes}
          onChange={(e) => updateField("breakMinutes", e.target.value)}
          showLabel={true}
        />
        <Input
          label={description_label}
          name="description"
          placeholder={description_placeholder}
          value={formData.description}
          errorMessage={errors.description}
          onChange={(e) => updateField("description", e.target.value)}
          showLabel={true}
        />
      </AddEditModal>
    </div>
  );
};
export default AddEditShiftTypeModal;
