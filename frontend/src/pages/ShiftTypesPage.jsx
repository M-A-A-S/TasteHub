import CardView from "../components/ShiftTypesPage/CardView";
import TableView from "../components/ShiftTypesPage/TableView";
import AddEditShiftTypeModal from "../components/ShiftTypesPage/AddEditShiftTypeModal";
import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { create, read, remove, update } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import PageHeader from "../components/PageHeader";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import ConfirmModal from "../components/UI/ConfirmModal";

const ShiftTypesPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [shiftTypes, setShiftTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditShiftTypeModalOpen, setIsAddEditShiftTypeModalOpen] =
    useState(false);
  const [
    isDeleteShiftTypeConfirmModalOpen,
    setIsDeleteShiftTypeConfirmModalOpen,
  ] = useState(false);
  const [selectedShiftType, setSelectedShiftType] = useState(null);

  const { translations } = useLanguage();
  const {
    title,
    description,
    add_new_shift_type,

    shift_type_add_success,
    shift_type_add_fail,
    shift_type_update_success,
    shift_type_update_fail,
    shift_type_delete_success,
    shift_type_delete_fail,

    shift_type_delete_modal_title,
    shift_type_delete_modal_message,
    shift_type_delete_modal_confirm,
  } = translations.pages.shift_types_page;

  const { cancel, loading_error, empty_state } = translations.common;

  const fetchShiftTypes = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("shift-types");
      console.log("result", result);
      setShiftTypes(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShiftTypes();
  }, []);

  function handleDeleteShiftType(shiftType) {
    setSelectedShiftType(shiftType);
    setIsDeleteShiftTypeConfirmModalOpen(true);
    console.log("shiftType -> ", shiftType);
  }
  function handleEditShiftType(shiftType) {
    setSelectedShiftType(shiftType);
    setIsAddEditShiftTypeModalOpen(true);
    console.log("shiftType -> ", shiftType);
  }

  function handleAddShiftType() {
    setSelectedShiftType(null);
    setIsAddEditShiftTypeModalOpen(true);
  }

  const closeModal = () => {
    setIsAddEditShiftTypeModalOpen(false);
    setIsDeleteShiftTypeConfirmModalOpen(false);
    setSelectedShiftType(null);
  };

  function addEditShiftType(payload) {
    if (selectedShiftType) {
      updateShiftType(payload);
    } else {
      addShiftType(payload);
    }
  }

  async function addShiftType(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`shift-types`, payload);
      setShiftTypes((prev) => [...prev, result.data]);
      showSuccess(result?.code, shift_type_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, shift_type_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateShiftType(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await update(`shift-types/${selectedShiftType?.id}`, payload);
      setShiftTypes((prev) =>
        prev.map((cat) => (cat.id === result?.data?.id ? result.data : cat)),
      );
      showSuccess(result?.code, shift_type_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, shift_type_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteShiftType() {
    let result;
    try {
      setActionLoading(true);
      result = await remove(`shift-types/${selectedShiftType.id}`);

      setShiftTypes((prev) =>
        prev.filter((cat) => cat.id != selectedShiftType.id),
      );

      showSuccess(result?.code, shift_type_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, shift_type_delete_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleAddShiftType}>
            <Plus /> {add_new_shift_type}
          </Button>
        }
      />

      {loading ? (
        <div className="grid place-items-center h-[60vh]">
          <SpinnerLoader />
        </div>
      ) : errorCode ? (
        <div className="grid place-items-center h-[60vh] text-red-500">
          {translations.server_codes[errorCode] || loading_error}
        </div>
      ) : shiftTypes?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              shiftTypes={shiftTypes}
              handleEditShiftType={handleEditShiftType}
              handleDeleteShiftType={handleDeleteShiftType}
            />
          )}
          {view == "table" && (
            <TableView
              shiftTypes={shiftTypes}
              handleEditShiftType={handleEditShiftType}
              handleDeleteShiftType={handleDeleteShiftType}
            />
          )}
        </>
      )}

      <AddEditShiftTypeModal
        show={isAddEditShiftTypeModalOpen}
        onClose={closeModal}
        onConfirm={addEditShiftType}
        shiftType={selectedShiftType}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteShiftTypeConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteShiftType}
        title={shift_type_delete_modal_title}
        message={shift_type_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={shift_type_delete_modal_confirm}
        loading={actionLoading}
      />
    </div>
  );
};
export default ShiftTypesPage;
