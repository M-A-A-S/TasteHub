import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import AddEditModal from "../UI/AddEditModal";
import EmployeeSelect from "../EmployeeSelect";
import ShiftTypeSelect from "../ShiftTypeSelect";
import DayOfWeekSelect from "../DayOfWeekSelect";
import Input from "../UI/Input";
import Checkbox from "../UI/Checkbox";

const initialFormState = {
  employeeId: "",
  shiftTypeId: "",
  dayOfWeek: "",
  isActive: true,
  additionalNotes: "",
};

const AddEditWorkScheduleModal = ({
  show,
  onClose,
  onConfirm,
  workSchedule,
  loading,
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations } = useLanguage();

  const {
    add_new_work_schedule,
    edit_work_schedule,

    form: {
      employee_label,
      employee_error,

      shift_type_label,
      shift_type_error,

      day_of_week_label,
      day_of_week_error,

      is_active_label,
      notes_label,
      notes_placeholder,
    },
  } = translations.pages.work_schedules_page;

  const { default_message } = translations.validations;

  const handleClose = safeCall(onClose);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (workSchedule) {
      setFormData({
        employeeId: workSchedule?.employeeId || "",
        shiftTypeId: workSchedule?.shiftTypeId || "",
        dayOfWeek: workSchedule?.dayOfWeek ?? "",
        isActive: workSchedule?.isActive ?? true,
        additionalNotes: workSchedule?.additionalNotes || "",
      });
    } else {
      setFormData(initialFormState);
    }

    setErrors({});
  }, [workSchedule, show]);

  const validateFormData = () => {
    let temp = {};

    if (!formData.employeeId) {
      temp.employeeId = employee_error;
    }

    if (!formData.shiftTypeId) {
      temp.shiftTypeId = shift_type_error;
    }

    if (formData.dayOfWeek === "") {
      temp.dayOfWeek = day_of_week_error;
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
      employeeId: Number(formData.employeeId),
      shiftTypeId: Number(formData.shiftTypeId),
      dayOfWeek: Number(formData.dayOfWeek),
      isActive: formData.isActive,
      additionalNotes: formData.additionalNotes,
    };

    safeCall(onConfirm)(payload);
  }

  return (
    <AddEditModal
      show={show}
      onClose={handleClose}
      title={workSchedule ? edit_work_schedule : add_new_work_schedule}
      onSave={handleSubmit}
      loading={loading}
    >
      <EmployeeSelect
        name="employeeId"
        value={formData.employeeId}
        onChange={(e) => updateField("employeeId", e.target.value)}
        label={employee_label}
        showLabel={true}
        errorMessage={errors.employeeId}
      />

      <ShiftTypeSelect
        name="shiftTypeId"
        value={formData.shiftTypeId}
        onChange={(e) => updateField("shiftTypeId", e.target.value)}
        label={shift_type_label}
        showLabel={true}
        errorMessage={errors.shiftTypeId}
      />

      <DayOfWeekSelect
        value={formData.dayOfWeek}
        onChange={(e) => updateField("dayOfWeek", e.target.value)}
        label={day_of_week_label}
        errorMessage={errors.dayOfWeek}
      />

      <Input
        label={notes_label}
        name="additionalNotes"
        placeholder={notes_placeholder}
        value={formData.additionalNotes}
        errorMessage={errors.additionalNotes}
        onChange={(e) => updateField("additionalNotes", e.target.value)}
        showLabel={true}
      />

      <Checkbox
        label={is_active_label}
        checked={formData.isActive}
        onChange={(e) => updateField("isActive", e.target.checked)}
        className="accent-orange-600"
      />
    </AddEditModal>
  );
};
export default AddEditWorkScheduleModal;
