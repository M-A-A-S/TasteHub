import {
  formatNumber,
  isAdditionReason,
  isDeductionReason,
  safeCall,
} from "../../utils/utils";
import AddEditModal from "../UI/AddEditModal";
import Input from "../UI/Input";
import StockMovementReasonSelect from "../StockMovementReasonSelect";
import { useEffect, useState } from "react";
import { toast } from "../../utils/toastHelper";
import { useLanguage } from "../../hooks/useLanguage";

const initialFormState = {
  reason: "",
  quantity: "",
  costPerUnit: "",
  expiryDate: "",
  batchNumber: "",
};

const AdjustStockModal = ({
  show,
  onClose,
  onConfirm,
  ingredient,
  loading,
}) => {
  const handleClose = safeCall(onClose);

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const { translations, language } = useLanguage();

  const { default_message } = translations.validations;

  const {
    title,

    form: {
      reason_label,
      reason_error,

      quantity_label,
      quantity_placeholder,
      quantity_error,
      quantity_invalid_error,

      cost_per_unit_label,
      cost_per_unit_placeholder,

      expiry_date_label,

      batch_number_label,
      batch_number_placeholder,

      note_label,
      note_placeholder,
    },

    summary: { current_stock, new_stock_estimate },
  } = translations.pages.ingredients_page.adjust_stock;

  useEffect(() => {
    if (show) {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [show, ingredient]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function validateFormData() {
    let newErrors = {};
    const quantity = Number(formData.quantity);
    const reason = formData.reason;

    if (formData.reason === null || formData.reason == "") {
      newErrors.reason = reason_error;
    }

    if (!formData.quantity) {
      newErrors.quantity = quantity_error;
    } else if (quantity <= 0) {
      newErrors.quantity = quantity_invalid_error;
    } else if (
      (isDeductionReason(reason) && quantity > ingredient?.currentStock) ||
      0
    ) {
      newErrors.quantity = quantity_invalid_error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const buildPayload = () => {
    const reason = Number(formData.reason);
    const quantity = Number(formData.quantity);

    const payload = {
      reason,
      note: formData.note || null,
    };

    if (isAdditionReason(reason)) {
      payload.additions = [
        {
          ingredientId: ingredient.id,
          quantity,
          costPerUnit: formData.costPerUnit
            ? Number(formData.costPerUnit)
            : null,
          expiryDate: formData.expiryDate || null,
          batchNumber: formData.batchNumber || null,
        },
      ];
    }

    if (isDeductionReason(reason)) {
      payload.deductions = [
        {
          ingredientId: ingredient.id,
          quantity,
        },
      ];
    }

    return payload;
  };

  function handleSubmit() {
    if (!validateFormData() || !ingredient?.id) {
      toast.error(default_message);
      return;
    }

    const payload = buildPayload();

    safeCall(onConfirm)(payload);
  }

  const calculateNewStock = () => {
    const current = Number(ingredient?.currentStock || 0);
    const qty = Number(formData.quantity || 0);

    switch (Number(formData.reason)) {
      case 1: // Purchase
      case 5: // Return
        return current + qty;

      case 0: // Sale
      case 3: // Waste
      case 4: // Usage
        return current - qty;

      default:
        return current;
    }
  };

  return (
    <AddEditModal
      show={show}
      onClose={handleClose}
      title={`${title} - ${language == "en" ? ingredient?.nameEn : ingredient?.nameAr}`}
      onSave={handleSubmit}
      loading={loading}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        {/* <StockMovementReasonSelect value={""} onChange={} /> */}

        <StockMovementReasonSelect
          value={formData.reason}
          onChange={(e) => updateField("reason", e.target.value)}
          label={reason_label}
          errorMessage={errors.reason}
        />

        <Input
          label={quantity_label}
          name="quantity"
          type="number"
          placeholder={quantity_placeholder}
          value={formData.quantity}
          errorMessage={errors.quantity}
          showLabel={true}
          onChange={(e) => updateField("quantity", e.target.value)}
        />
        {(formData.reason == 1 || formData.reason == 5) && (
          <>
            <Input
              label={cost_per_unit_label}
              name="costPerUnit"
              type="number"
              placeholder={cost_per_unit_placeholder}
              value={formData.costPerUnit}
              errorMessage={errors.costPerUnit}
              showLabel={true}
              onChange={(e) => updateField("costPerUnit", e.target.value)}
            />

            <Input
              label={expiry_date_label}
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              errorMessage={errors.expiryDate}
              showLabel={true}
              onChange={(e) => updateField("expiryDate", e.target.value)}
            />

            <Input
              label={batch_number_label}
              name="batchNumber"
              placeholder={batch_number_placeholder}
              value={formData.batchNumber}
              errorMessage={errors.batchNumber}
              showLabel={true}
              onChange={(e) => updateField("batchNumber", e.target.value)}
            />
          </>
        )}

        {/* Stock Summary */}
        <div className="mt-4 p-4 bg-orange-50 dark:bg-slate-700 rounded-xl text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-orange-600 dark:text-orange-400 font-medium">
              {current_stock}
            </span>
            <span className="font-bold text-orange-700 dark:text-orange-500">
              {formatNumber(ingredient?.currentStock || 0)}
            </span>
          </div>

          <div className="flex justify-between border-t pt-1">
            <span className="text-orange-600 dark:text-orange-400 font-medium">
              {new_stock_estimate}
            </span>
            <span className="font-bold text-orange-900 dark:text-orange-600">
              {formatNumber(calculateNewStock())}
            </span>
          </div>
        </div>
      </form>
    </AddEditModal>
  );
};
export default AdjustStockModal;
