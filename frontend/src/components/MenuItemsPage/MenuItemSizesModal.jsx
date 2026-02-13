import { useEffect, useState } from "react";
import {
  formatMoney,
  safeCall,
  showFail,
  showSuccess,
} from "../../utils/utils";
import Modal from "../UI/Modal";
import { create, remove, update } from "../../api/apiWrapper";
import Button from "../UI/Button";
import SizesSelect from "../SizesSelect";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import Input from "../UI/Input";
import { toast } from "../../utils/toastHelper";
import ConfirmModal from "../UI/ConfirmModal";
import { useLanguage } from "../../hooks/useLanguage";

const initialFormState = {
  id: null,
  menuItemId: "",
  sizeId: "",
  price: "",
};

const MenuItemSizesModal = ({ show, onClose, menuItem, onUpdate }) => {
  const [menuItemSizes, setMenuItemSizes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [
    isDeleteMenuItemSizeConfirmModalOpen,
    setIsDeleteMenuItemSizeConfirmModalOpen,
  ] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedMenuItemSize, setSelectedMenuItemSize] = useState(null);

  const { translations, language } = useLanguage();

  const {
    menu_item_sizes_title,
    size_label,
    price_label,
    price_placeholder,
    menu_item_size_error,
    menu_item_price_error,
    add_size_button,
    update_size_button,
    menu_item_add_success,
    menu_item_add_fail,
    menu_item_update_success,
    menu_item_update_fail,
    menu_item_delete_success,
    menu_item_delete_fail,
    menu_item_delete_modal_title,
    menu_item_delete_modal_message,
    menu_item_delete_modal_confirm,
  } = translations.pages.menu_page.menu_item_sizes;
  const { default_message } = translations.validations;
  const { cancel } = translations.common;

  const handleClose = safeCall(onClose);

  useEffect(() => {
    setMenuItemSizes(menuItem?.menuItemSizes || []);
    setFormData({ ...initialFormState, menuItemId: menuItem?.id });
    setErrors({});
  }, [menuItem, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      menuItemId: item.menuItemId,
      sizeId: item.sizeId,
      price: item.price,
    });
  };

  const handleDeleteMenuItemSize = (menuItemSize) => {
    setIsDeleteMenuItemSizeConfirmModalOpen(true);
    setSelectedMenuItemSize(menuItemSize);
  };

  const handleAddOrUpdate = async () => {
    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    if (formData.id) {
      await updateMenuItemSize(formData);
    } else {
      await addMenuItemSize(formData);
    }
  };

  async function addMenuItemSize(payload) {
    let result;
    try {
      setLoading(true);
      result = await create(`menu-item-sizes`, payload);
      const newSizes = [...menuItemSizes, result.data];
      setMenuItemSizes(newSizes);
      onUpdate && onUpdate(newSizes);
      showSuccess(result?.code, menu_item_add_success);
      setFormData({ ...initialFormState, menuItemId: menuItem?.id });
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, menu_item_add_fail);
    } finally {
      setLoading(false);
    }
  }

  async function updateMenuItemSize(payload) {
    let result;
    try {
      setLoading(true);
      result = await update(`menu-item-sizes/${payload.id}`, payload);
      const newSizes = menuItemSizes.map((item) =>
        item.id === result.data.id ? result.data : item,
      );
      setMenuItemSizes(newSizes);
      onUpdate && onUpdate(newSizes);
      showSuccess(result?.code, menu_item_update_success);
      setFormData({ ...initialFormState, menuItemId: menuItem?.id });
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, menu_item_update_fail);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMenuItemSize() {
    let result;
    try {
      setLoading(true);
      result = await remove(`menu-item-sizes/${selectedMenuItemSize?.id}`);
      const newSizes = menuItemSizes.filter(
        (item) => item.id !== selectedMenuItemSize.id,
      );
      setMenuItemSizes(newSizes);
      onUpdate && onUpdate(newSizes);
      showSuccess(result?.code, menu_item_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, menu_item_delete_fail);
    } finally {
      setLoading(false);
      setIsDeleteMenuItemSizeConfirmModalOpen(false);
    }
  }

  const validateFormData = () => {
    let temp = {};

    if (!formData.sizeId) {
      temp.sizeId = menu_item_size_error;
    }
    const price = Number(formData.price);
    if (!price || price <= 1) {
      temp.price = menu_item_price_error;
    }

    setErrors(temp);

    return Object.keys(temp).length === 0; // true = valid
  };

  return (
    <div>
      <Modal show={show} title={menu_item_sizes_title} onClose={handleClose}>
        {/* Existing sizes */}
        <div className="space-y-2 mb-4">
          {menuItemSizes?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center rounded p-2"
            >
              <div>
                <p className="font-medium">
                  {language == "en" ? item?.size?.nameEn : item?.size?.nameAr}
                </p>
                <p className=" text-gray-500">${formatMoney(item.price)}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-gray-500 hover:text-green-500 transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDeleteMenuItemSize(item)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add / Edit form */}
        <div className="border-t pt-4 space-y-3">
          <SizesSelect
            name="sizeId"
            value={formData.sizeId}
            onChange={handleChange}
            label={size_label}
            showLabel={true}
            errorMessage={errors.sizeId}
          />
          <Input
            label={price_label}
            name="price"
            type="number"
            placeholder={price_placeholder}
            value={formData.price}
            errorMessage={errors.price}
            onChange={handleChange}
          />

          <Button
            onClick={handleAddOrUpdate}
            disabled={loading}
            className="w-full"
          >
            <Plus size={16} />

            {loading ? (
              <Loader2 className="animate-spin" />
            ) : formData.id ? (
              update_size_button
            ) : (
              add_size_button
            )}
          </Button>
        </div>
      </Modal>

      <ConfirmModal
        show={isDeleteMenuItemSizeConfirmModalOpen}
        onClose={() => setIsDeleteMenuItemSizeConfirmModalOpen(false)}
        onConfirm={deleteMenuItemSize}
        title={menu_item_delete_modal_title}
        message={menu_item_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={menu_item_delete_modal_confirm}
        loading={loading}
      />
    </div>
  );
};
export default MenuItemSizesModal;
