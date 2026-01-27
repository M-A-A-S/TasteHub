import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { create, read, remove, update } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import PageHeader from "../components/PageHeader";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import ConfirmModal from "../components/UI/ConfirmModal";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import CardView from "../components/ExtrasPage/CardView";
import TableView from "../components/ExtrasPage/TableView";
import AddEditExtraModal from "../components/ExtrasPage/AddEditExtraModal";

const ExtrasPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditExtraModalOpen, setIsAddEditExtraModalOpen] = useState(false);
  const [isDeleteExtraConfirmModalOpen, setIsDeleteExtraConfirmModalOpen] =
    useState(false);
  const [selectedExtra, setSelectedExtra] = useState(null);

  const { translations } = useLanguage();

  const {
    title,
    description,
    add_new_extra,
    extra_add_success,
    extra_add_fail,
    extra_update_success,
    extra_update_fail,
    extra_delete_success,
    extra_delete_fail,
    extra_delete_modal_title,
    extra_delete_modal_message,
  } = translations.pages.extras_page;

  const {
    cancel,
    loading_error,
    empty_state,
    delete: delete_label,
  } = translations.common;

  const fetchExtras = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("extras");
      console.log("result", result);
      setExtras(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExtras();
  }, []);

  function handleDeleteExtra(extra) {
    setSelectedExtra(extra);
    setIsDeleteExtraConfirmModalOpen(true);
    console.log("extra -> ", extra);
  }
  function handleEditExtra(extra) {
    setSelectedExtra(extra);
    setIsAddEditExtraModalOpen(true);
    console.log("extra -> ", extra);
  }

  function handleAddExtra() {
    setSelectedExtra(null);
    setIsAddEditExtraModalOpen(true);
  }

  const closeModal = () => {
    setIsAddEditExtraModalOpen(false);
    setIsDeleteExtraConfirmModalOpen(false);
    setSelectedExtra(null);
  };

  function addEditExtra(payload) {
    if (selectedExtra) {
      updateExtra(payload);
    } else {
      addExtra(payload);
    }
  }

  async function addExtra(payload) {
    let result;
    try {
      setActionLoading(true);
      console.log(payload);
      result = await create(`extras`, payload);
      setExtras((prev) => [...prev, result.data]);
      showSuccess(result?.code, extra_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, extra_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateExtra(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await update(`extras/${selectedExtra?.id}`, payload);
      setExtras((prev) =>
        prev.map((extra) =>
          extra.id === result?.data?.id ? result.data : extra,
        ),
      );
      showSuccess(result?.code, extra_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, extra_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteExtra() {
    let result;
    try {
      setActionLoading(true);
      result = await remove(`extras/${selectedExtra.id}`);

      setExtras((prev) => prev.filter((extra) => extra.id != selectedExtra.id));

      showSuccess(result?.code, extra_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, extra_delete_fail);
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
          <Button onClick={handleAddExtra}>
            <Plus /> {add_new_extra}
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
      ) : extras?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              extras={extras}
              handleEditExtra={handleEditExtra}
              handleDeleteExtra={handleDeleteExtra}
            />
          )}
          {view == "table" && (
            <TableView
              extras={extras}
              handleEditExtra={handleEditExtra}
              handleDeleteExtra={handleDeleteExtra}
            />
          )}
        </>
      )}

      <AddEditExtraModal
        show={isAddEditExtraModalOpen}
        onClose={closeModal}
        onConfirm={addEditExtra}
        extra={selectedExtra}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteExtraConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteExtra}
        title={extra_delete_modal_title}
        message={extra_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={delete_label}
        loading={actionLoading}
      />
    </div>
  );
};
export default ExtrasPage;
