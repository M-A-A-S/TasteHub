import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import AddEditModal from "../UI/AddEditModal";
import Input from "../UI/Input";
import TableStatusSelect from "../TableStatusSelect";

const initialFormState = {
  tableNumber: "",
  numberOfSeats: "",
  location: "",
  tableStatus: 0, // default to available
};

const AddEditTableModal = ({ show, onClose, onConfirm, table, loading }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleClose = safeCall(onClose);

  const { translations, language } = useLanguage();

  const {
    table_number_label,
    table_number_placeholder,
    table_number_error,
    seats_label,
    seats_placeholder,
    seats_error,
    location_label,
    location_placeholder,
    status_label,
  } = translations.pages.tables_page.form;

  const { add_new_table, edit_table } = translations.pages.tables_page;

  const { default_message } = translations.validations;

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (table) {
      setFormData({
        tableNumber: table?.tableNumber !== "" ? table?.tableNumber : "",
        numberOfSeats: table?.numberOfSeats !== "" ? table?.numberOfSeats : "",
        location: table?.location || "",
        tableStatus: table?.tableStatus !== "" ? table?.tableStatus : 0,
      });
    } else {
      setFormData(initialFormState);
    }

    setErrors({});
  }, [table, show]);

  useEffect(() => {
    validateFormData();
  }, [language]);

  const validateFormData = () => {
    let temp = {};

    if (formData.tableNumber === "") {
      temp.tableNumber = table_number_error;
    }

    if (formData.numberOfSeats === "") {
      temp.numberOfSeats = seats_error;
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
      tableNumber: Number(formData.tableNumber),
      numberOfSeats: Number(formData.numberOfSeats),
      location: formData.location || null,
      tableStatus: Number(formData?.tableStatus),
    };

    safeCall(onConfirm)(payload);
  }

  return (
    <AddEditModal
      show={show}
      onClose={handleClose}
      title={table ? edit_table : add_new_table}
      onSave={handleSubmit}
      loading={loading}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          label={table_number_label}
          type="number"
          name="tableNumber"
          placeholder={table_number_placeholder}
          value={formData.tableNumber}
          errorMessage={errors.tableNumber}
          showLabel={true}
          onChange={(e) => updateField("tableNumber", e.target.value)}
        />

        <Input
          label={seats_label}
          type="number"
          name="numberOfSeats"
          placeholder={seats_placeholder}
          value={formData.numberOfSeats}
          errorMessage={errors.numberOfSeats}
          showLabel={true}
          onChange={(e) => updateField("numberOfSeats", e.target.value)}
        />

        <Input
          label={location_label}
          name="location"
          placeholder={location_placeholder}
          value={formData.location}
          showLabel={true}
          onChange={(e) => updateField("location", e.target.value)}
        />

        {table && (
          <TableStatusSelect
            value={formData.tableStatus}
            label={status_label}
            onChange={(e) => updateField("tableStatus", e.target.value)}
          />
        )}
      </form>
    </AddEditModal>
  );
};
export default AddEditTableModal;
