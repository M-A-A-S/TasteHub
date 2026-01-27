import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { useLanguage } from "../hooks/useLanguage";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import CardView from "../components/ExtrasGroupsPage/CardView";
import TableView from "../components/ExtrasGroupsPage/TableView";
import PageHeader from "../components/PageHeader";
import { create, read, remove, update } from "../api/apiWrapper";
import Button from "../components/UI/Button";
import { showFail, showSuccess } from "../utils/utils";
import AddEditExtrasGroupModal from "../components/ExtrasGroupsPage/AddEditExtrasGroupModal";
import ConfirmModal from "../components/UI/ConfirmModal";

const ExtrasGroupsPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [extrasGroups, setExtrasGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditExtrasGroupModalOpen, setIsAddEditExtrasGroupModalOpen] =
    useState(false);

  const [selectedExtrasGroup, setSelectedExtrasGroup] = useState(null);
  const [
    isDeleteExtrasGroupConfirmModalOpen,
    setIsDeleteExtrasGroupConfirmModalOpen,
  ] = useState(false);
  const { translations } = useLanguage();
  const {
    empty_state,
    add_new_group,
    description,
    title,
    group_add_success,
    group_add_fail,
    group_update_success,
    group_update_fail,
    group_delete_success,
    group_delete_modal_title,
    group_delete_modal_message,
    group_delete_modal_confirm,
  } = translations.pages.extras_groups_page;
  const { cancel, loading_error } = translations.common;

  const fetchExtrasGroups = async () => {
    setLoading(true);
    let result;
    try {
      result = await read("extras-groups");
      console.log("result", result);
      setExtrasGroups(result.data);
    } catch (error) {
      console.error("Failed to fetch extras groups:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExtrasGroups();
  }, []);
  const closeModal = () => {
    setIsAddEditExtrasGroupModalOpen(false);
    setIsDeleteExtrasGroupConfirmModalOpen(false);
    setSelectedExtrasGroup(null);
    // toast.success("Success! Operation completed.");
    // toast.error("Error! Something went wrong.");
    // toast.warning("Warning! Check this out.");
    // toast.default("Default info message.");
  };
  function addEditExtrasGroup(payload) {
    if (selectedExtrasGroup) {
      updateExtrasGroup(payload);
    } else {
      addExtrasGroup(payload);
    }
  }

  async function addExtrasGroup(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`extras-groups`, payload);
      setExtrasGroups((prev) => [...prev, result.data]);
      showSuccess(result?.code, group_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, group_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateExtrasGroup(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await update(
        `extras-groups/${selectedExtrasGroup?.id}`,
        payload,
      );
      setExtrasGroups((prev) =>
        prev.map((group) =>
          group.id === result?.data?.id ? result.data : group,
        ),
      );
      showSuccess(result?.code, group_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, group_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }
  function handleDeleteExtrasGroup(extrasGroup) {
    setSelectedExtrasGroup(extrasGroup);
    setIsDeleteExtrasGroupConfirmModalOpen(true);
    console.log("ExtrasGroup -> ", extrasGroup);
  }
  function handleEditExtrasGroup(extrasGroup) {
    setSelectedExtrasGroup(extrasGroup);
    setIsAddEditExtrasGroupModalOpen(true);
    console.log("ExtrasGroup -> ", extrasGroup);
  }
  async function deleteExtrasGroup() {
    let result;
    try {
      console.log(selectedExtrasGroup);
      setActionLoading(true);
      result = await remove(`extras-groups/${selectedExtrasGroup.id}`);

      setExtrasGroups((prev) =>
        prev.filter((g) => g.id != selectedExtrasGroup.id),
      );

      showSuccess(result?.code, group_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, group_delete_success);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }
  function handleAddExtrasGroup() {
    setSelectedExtrasGroup(null);
    setIsAddEditExtrasGroupModalOpen(true);
  }
  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleAddExtrasGroup}>
            <Plus /> {add_new_group}
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
      ) : extrasGroups?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              extrasGroups={extrasGroups}
              handleEditExtrasGroup={handleEditExtrasGroup}
              handleDeleteExtrasGroup={handleDeleteExtrasGroup}
            />
          )}
          {view == "table" && (
            <TableView
              extrasGroups={extrasGroups}
              handleEditExtrasGroup={handleEditExtrasGroup}
              handleDeleteExtrasGroup={handleDeleteExtrasGroup}
            />
          )}
        </>
      )}
      <AddEditExtrasGroupModal
        show={isAddEditExtrasGroupModalOpen}
        onClose={closeModal}
        onConfirm={addEditExtrasGroup}
        extrasGroup={selectedExtrasGroup}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteExtrasGroupConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteExtrasGroup}
        title={group_delete_modal_title}
        message={group_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={group_delete_modal_confirm}
        loading={actionLoading}
      />
    </div>
  );
};
export default ExtrasGroupsPage;
