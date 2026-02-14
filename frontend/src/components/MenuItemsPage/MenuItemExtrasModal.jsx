import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import {
  formatMoney,
  safeCall,
  showFail,
  showSuccess,
} from "../../utils/utils";
import { toast } from "../../utils/toastHelper";
import { create, remove } from "../../api/apiWrapper";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmModal from "../UI/ConfirmModal";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import ExtraGroupSelect from "../ExtraGroupSelect";

const initialFormState = {
  id: null,
  menuItemId: "",
  extrasGroupId: "",
};

const MenuItemExtrasModal = ({ show, onClose, menuItem, onUpdate }) => {
  const [menuItemExtras, setMenuItemExtras] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [
    isDeleteMenuItemExtraConfirmModalOpen,
    setIsDeleteMenuItemExtraConfirmModalOpen,
  ] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedMenuItemExtra, setSelectedMenuItemExtra] = useState(null);

  const { translations, language } = useLanguage();

  const {
    menu_item_extras_group_title,
    extras_group_label,
    menu_item_extras_group_error,
    add_extras_group_button,
    menu_item_add_success,
    menu_item_add_fail,
    menu_item_delete_success,
    menu_item_delete_fail,
    menu_item_delete_modal_title,
    menu_item_delete_modal_message,
    menu_item_delete_modal_confirm,
  } = translations.pages.menu_page.menu_item_extras_group;

  const { default_message } = translations.validations;
  const { cancel } = translations.common;

  const handleClose = safeCall(onClose);
  const handleUpdate = safeCall(onUpdate);

  useEffect(() => {
    setMenuItemExtras(menuItem?.menuItemExtras || []);
    setFormData({ ...initialFormState, menuItemId: menuItem?.id });
    setErrors({});
  }, [menuItem, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteMenuItemExtra = (menuItemExtra) => {
    setIsDeleteMenuItemExtraConfirmModalOpen(true);
    setSelectedMenuItemExtra(menuItemExtra);
  };

  async function addMenuItemExtra() {
    let result;
    try {
      setLoading(true);
      result = await create(`menu-item-extras`, formData);
      const newExtras = [...menuItemExtras, result.data];
      setMenuItemExtras(newExtras);
      handleUpdate(newExtras);
      showSuccess(result?.code, menu_item_add_success);
      setFormData({ ...initialFormState, menuItemId: menuItem?.id });
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, menu_item_add_fail);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMenuItemExtra() {
    let result;
    try {
      setLoading(true);
      result = await remove(`menu-item-extras/${selectedMenuItemExtra?.id}`);
      const newExtras = menuItemExtras.filter(
        (item) => item.id !== selectedMenuItemExtra.id,
      );
      setMenuItemExtras(newExtras);
      handleUpdate(newExtras);
      showSuccess(result?.code, menu_item_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, menu_item_delete_fail);
    } finally {
      setLoading(false);
      setIsDeleteMenuItemExtraConfirmModalOpen(false);
    }
  }

  const hanldeSubmit = async (e) => {
    e?.preventDefault();

    if (!validateFormData()) {
      toast.error(default_message);
      return;
    }

    await addMenuItemExtra();
  };

  const validateFormData = () => {
    let temp = {};

    if (!formData.extrasGroupId) {
      temp.extrasGroupId = menu_item_extras_group_error;
    }

    setErrors(temp);

    return Object.keys(temp).length === 0; // true = valid
  };

  return (
    <div>
      <Modal
        show={show}
        title={menu_item_extras_group_title}
        onClose={handleClose}
      >
        {/* Existing sizes */}
        <div className="space-y-2 mb-4">
          {menuItemExtras?.map((item) => (
            <div key={item.id} className="rounded p-2">
              <header className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {language == "en"
                      ? item?.extrasGroup?.nameEn
                      : item?.extrasGroup?.nameAr}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteMenuItemExtra(item)}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </header>
              <ul>
                {item?.extrasGroup?.extras?.map((extra) => (
                  <li
                    key={extra.id}
                    className="text-gray-500 
                    flex items-center justify-between p-1"
                  >
                    <span>
                      {language == "en" ? extra.nameEn : extra.nameAr}
                    </span>
                    <span className=" text-orange-600">
                      ${formatMoney(extra.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Add / Edit form */}
        <div className="border-t pt-4 space-y-3">
          <ExtraGroupSelect
            name="extrasGroupId"
            value={formData.extrasGroupId}
            onChange={handleChange}
            label={extras_group_label}
            showLabel={true}
            errorMessage={errors.extrasGroupId}
          />

          <Button onClick={hanldeSubmit} disabled={loading} className="w-full">
            <Plus size={16} />

            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              add_extras_group_button
            )}
          </Button>
        </div>
      </Modal>

      <ConfirmModal
        show={isDeleteMenuItemExtraConfirmModalOpen}
        onClose={() => setIsDeleteMenuItemExtraConfirmModalOpen(false)}
        onConfirm={deleteMenuItemExtra}
        title={menu_item_delete_modal_title}
        message={menu_item_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={menu_item_delete_modal_confirm}
        loading={loading}
      />
    </div>
  );
};
export default MenuItemExtrasModal;
