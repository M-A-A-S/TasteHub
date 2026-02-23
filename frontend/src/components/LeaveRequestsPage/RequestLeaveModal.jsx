import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import AddEditModal from "../UI/AddEditModal";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import EmployeeSelect from "../EmployeeSelect";
import LeaveTypeSelect from "../LeaveTypeSelect";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";

const initialFormState = {
  employeeId: "",
  leaveTypeId: "",
  startDate: "",
  endDate: "",
  reason: "",
};

const RequestLeaveModal = ({ show, onClose, onConfirm, loading }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const handleClose = safeCall(onClose);

  const { translations, language } = useLanguage();

  const {
    request_leave_btn,
    form: {
      employee_label,
      employee_placeholder,
      employee_error,
      leave_type_label,
      leave_type_placeholder,
      leave_type_error,
      start_date_label,
      start_date_placeholder,
      start_date_error,
      end_date_label,
      end_date_placeholder,
      end_date_error,
      reason_label,
      reason_placeholder,
      additional_notes_label,
      additional_notes_placeholder,
      date_invalid_error,
      balance_exceeded_error,
    },
  } = translations.pages.leave_requests_page;

  const { add_new_size, edit_size } = translations.pages.sizes_page;
  const { default_message } = translations.validations;

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData(initialFormState);
    setErrors({});
  }, [show]);

  useEffect(() => {
    validateFormData();
  }, [language]);
  const validateFormData = () => {
    let temp = {};

    if (!formData.employeeId) {
      temp.employeeId = employee_error;
    }

    if (!formData.leaveTypeId) {
      temp.leaveTypeId = leave_type_error;
    }

    if (!formData.startDate) {
      temp.startDate = start_date_error;
    }

    if (!formData.endDate) {
      temp.endDate = end_date_error;
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        temp.endDate = date_invalid_error;
      }
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
      leaveTypeId: Number(formData.leaveTypeId),
      employeeId: Number(formData.employeeId),
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    if (formData.reason) {
      payload.reason = formData.reason;
    }

    safeCall(onConfirm)(payload);
  }

  return (
    <AddEditModal
      show={show}
      onClose={handleClose}
      title={request_leave_btn}
      onSave={handleSubmit}
      loading={loading}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <EmployeeSelect
          name="employeeId"
          value={formData.employeeId}
          onChange={(e) => updateField("employeeId", e.target.value)}
          label={employee_label}
          showLabel={true}
          errorMessage={errors.employeeId}
        />

        <LeaveTypeSelect
          name="leaveTypeId"
          value={formData.leaveTypeId}
          onChange={(e) => updateField("leaveTypeId", e.target.value)}
          label={leave_type_label}
          showLabel={true}
          errorMessage={errors.leaveTypeId}
        />

        <Input
          label={start_date_label}
          name="startDate"
          type="date"
          value={formData.startDate}
          errorMessage={errors.startDate}
          onChange={(e) => updateField("startDate", e.target.value)}
          showLabel={true}
        />

        <Input
          label={end_date_label}
          name="endDate"
          type="date"
          value={formData.endDate}
          errorMessage={errors.endDate}
          onChange={(e) => updateField("endDate", e.target.value)}
          showLabel={true}
        />

        <TextArea
          name="reason"
          label={reason_label}
          placeholder={reason_placeholder}
          showLabel={true}
          value={formData.reason}
          errorMessage={errors.reason}
          onChange={(e) => updateField("reason", e.target.value)}
        />
      </form>
    </AddEditModal>
  );
};
export default RequestLeaveModal;
