import CardView from "../components/LeaveTypesPage/CardView";
import TableView from "../components/LeaveTypesPage/TableView";
import AddEditLeaveTypeModal from "../components/LeaveTypesPage/AddEditLeaveTypeModal";
import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { create, read, remove, update } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import PageHeader from "../components/PageHeader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import ConfirmModal from "../components/UI/ConfirmModal";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import SpinnerLoader from "../components/UI/SpinnerLoader";

const LeaveTypesPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditLeaveTypeModalOpen, setIsAddEditLeaveTypeModalOpen] =
    useState(false);
  const [
    isDeleteLeaveTypeConfirmModalOpen,
    setIsDeleteLeaveTypeConfirmModalOpen,
  ] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);

  const { translations } = useLanguage();
  const {
    title,
    description,
    add_new_leave_type,

    leave_type_add_success,
    leave_type_add_fail,
    leave_type_update_success,
    leave_type_update_fail,
    leave_type_delete_success,
    leave_type_delete_fail,

    leave_type_delete_modal_title,
    leave_type_delete_modal_message,
    leave_type_delete_modal_confirm,
  } = translations.pages.leave_types_page;

  const { cancel, loading_error, empty_state } = translations.common;

  const fetchLeaveTypes = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("leave-types");
      console.log("result", result);
      setLeaveTypes(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  function handleDeleteLeaveType(leaveType) {
    setSelectedLeaveType(leaveType);
    setIsDeleteLeaveTypeConfirmModalOpen(true);
    console.log("LeaveType -> ", leaveType);
  }
  function handleEditLeaveType(leaveType) {
    setSelectedLeaveType(leaveType);
    setIsAddEditLeaveTypeModalOpen(true);
    console.log("LeaveType -> ", leaveType);
  }

  function handleAddLeaveType() {
    setSelectedLeaveType(null);
    setIsAddEditLeaveTypeModalOpen(true);
  }

  const closeModal = () => {
    setIsAddEditLeaveTypeModalOpen(false);
    setIsDeleteLeaveTypeConfirmModalOpen(false);
    setSelectedLeaveType(null);
  };

  function addEditLeaveType(payload) {
    if (selectedLeaveType) {
      updateLeaveType(payload);
    } else {
      addLeaveType(payload);
    }
  }

  async function addLeaveType(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`leave-types`, payload);
      setLeaveTypes((prev) => [...prev, result.data]);
      showSuccess(result?.code, leave_type_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, leave_type_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateLeaveType(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await update(`leave-types/${selectedLeaveType?.id}`, payload);
      setLeaveTypes((prev) =>
        prev.map((cat) => (cat.id === result?.data?.id ? result.data : cat)),
      );
      showSuccess(result?.code, leave_type_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, leave_type_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteLeaveType() {
    let result;
    try {
      setActionLoading(true);
      result = await remove(`leave-types/${selectedLeaveType.id}`);

      setLeaveTypes((prev) =>
        prev.filter((cat) => cat.id != selectedLeaveType.id),
      );

      showSuccess(result?.code, leave_type_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, leave_type_delete_fail);
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
          <Button onClick={handleAddLeaveType}>
            <Plus /> {add_new_leave_type}
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
      ) : leaveTypes?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              leaveTypes={leaveTypes}
              handleEditLeaveType={handleEditLeaveType}
              handleDeleteLeaveType={handleDeleteLeaveType}
            />
          )}
          {view == "table" && (
            <TableView
              leaveTypes={leaveTypes}
              handleEditLeaveType={handleEditLeaveType}
              handleDeleteLeaveType={handleDeleteLeaveType}
            />
          )}
        </>
      )}

      <AddEditLeaveTypeModal
        show={isAddEditLeaveTypeModalOpen}
        onClose={closeModal}
        onConfirm={addEditLeaveType}
        leaveType={selectedLeaveType}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteLeaveTypeConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteLeaveType}
        title={leave_type_delete_modal_title}
        message={leave_type_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={leave_type_delete_modal_confirm}
        loading={actionLoading}
      />
    </div>
  );
};
export default LeaveTypesPage;
