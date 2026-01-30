import React, { useEffect, useState } from "react";
import { create, read, remove, update } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import PageHeader from "../components/PageHeader";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import TableView from "../components/SizesPage/TableView";
import AddEditSizeModal from "../components/SizesPage/AddEditSizeModal";
import CardView from "../components/SizesPage/CardView";
import { useLanguage } from "../hooks/useLanguage";
import ConfirmModal from "../components/UI/ConfirmModal";

const SizePage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditSizeModalOpen, setIsAddEditSizeModalOpen] = useState(false);
  const [isDeleteSizeConfirmModalOpen, setIsDeleteSizeConfirmModalOpen] =
    useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const { translations } = useLanguage();
  const {
    title,
    description,
    add_new_size,
    size_add_success,
    size_add_fail,
    size_update_success,
    size_update_fail,
    size_delete_success,
    size_delete_fail,
    size_delete_modal_title,
    size_delete_modal_message,
  } = translations.pages.sizes_page;
  const {
    cancel,
    loading_error,
    empty_state,
    delete: delete_label,
  } = translations.common;
  const fetchSizes = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("sizes");
      setSizes(result.data);
    } catch (error) {
      console.error("Failed to fetch sizes:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSizes();
  }, []);
  function handleDeleteSize(size) {
    setSelectedSize(size);
    setIsDeleteSizeConfirmModalOpen(true);
  }
  function handleEditSize(size) {
    setSelectedSize(size);
    setIsAddEditSizeModalOpen(true);
  }
  function handleAddSize() {
    setSelectedSize(null);
    setIsAddEditSizeModalOpen(true);
  }
  const closeModal = () => {
    setIsAddEditSizeModalOpen(false);
    setIsDeleteSizeConfirmModalOpen(false);
    setSelectedSize(null);
  };
  function AddEditSize(payload) {
    if (selectedSize) {
      updateSize(payload);
    } else {
      addSize(payload);
    }
  }
  async function addSize(payload) {
    let result;
    try {
      setActionLoading(true);

      result = await create(`sizes`, payload); // API endpoint for sizes
      setSizes((prev) => [...prev, result.data]); // add new size to state

      showSuccess(result?.code, size_add_success); // toast success
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, size_add_fail); // toast fail
    } finally {
      setActionLoading(false);
      closeModal(); // close modal after action
    }
  }

  async function updateSize(payload) {
    let result;
    try {
      setActionLoading(true);

      result = await update(`sizes/${selectedSize?.id}`, payload); // update API

      setSizes((prev) =>
        prev.map(
          (size) => (size.id === result?.data?.id ? result.data : size), // update in state
        ),
      );

      showSuccess(result?.code, size_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, size_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteSize() {
    let result;
    try {
      setActionLoading(true);

      result = await remove(`sizes/${selectedSize.id}`); // delete API

      setSizes((prev) => prev.filter((size) => size.id !== selectedSize.id)); // remove from state

      showSuccess(result?.code, size_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, size_delete_fail);
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
          <Button onClick={handleAddSize}>
            <Plus /> {add_new_size}
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
      ) : sizes?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              sizes={sizes}
              handleEditSize={handleEditSize}
              handleDeleteSize={handleDeleteSize}
            />
          )}
          {view == "table" && (
            <TableView
              sizes={sizes}
              handleEditSize={handleEditSize}
              handleDeleteSize={handleDeleteSize}
            />
          )}
        </>
      )}

      <AddEditSizeModal
        show={isAddEditSizeModalOpen}
        onClose={closeModal}
        onConfirm={AddEditSize}
        size={selectedSize}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteSizeConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteSize}
        title={size_delete_modal_title}
        message={size_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={delete_label}
        loading={actionLoading}
      />
    </div>
  );
};

export default SizePage;
