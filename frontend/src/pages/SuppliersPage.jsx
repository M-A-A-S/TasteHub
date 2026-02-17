import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { create, read, remove, update } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import PageHeader from "../components/PageHeader";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import CardView from "../components/SuppliersPage/CardView";
import TableView from "../components/SuppliersPage/TableView";
import AddEditSupplierModal from "../components/SuppliersPage/AddEditSupplierModal";
import ConfirmModal from "../components/UI/ConfirmModal";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";

const SuppliersPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditSupplierModalOpen, setIsAddEditSupplierModalOpen] =
    useState(false);
  const [
    isDeleteSupplierConfirmModalOpen,
    setIsDeleteSupplierConfirmModalOpen,
  ] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const { translations } = useLanguage();
  const {
    title,
    description,
    add_new_supplier,
    edit_supplier,

    supplier_add_success,
    supplier_add_fail,

    supplier_update_success,
    supplier_update_fail,
    supplier_delete_success,
    supplier_delete_fail,

    supplier_delete_modal_confirm,
    supplier_delete_modal_message,
    supplier_delete_modal_title,
  } = translations.pages.suppliers_page;

  const { cancel, empty_state, loading_error } = translations.common;

  const fetchSuppliers = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("suppliers");
      console.log("result", result);
      setSuppliers(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  function handleDeleteSupplier(Supplier) {
    setSelectedSupplier(Supplier);
    setIsDeleteSupplierConfirmModalOpen(true);
    console.log("Supplier -> ", Supplier);
  }
  function handleEditSupplier(Supplier) {
    setSelectedSupplier(Supplier);
    setIsAddEditSupplierModalOpen(true);
    console.log("Supplier -> ", Supplier);
  }

  function handleAddSupplier() {
    setSelectedSupplier(null);
    setIsAddEditSupplierModalOpen(true);
  }

  const closeModal = () => {
    setIsAddEditSupplierModalOpen(false);
    setIsDeleteSupplierConfirmModalOpen(false);
    setSelectedSupplier(null);
  };

  function addEditSupplier(payload) {
    if (selectedSupplier) {
      updateSupplier(payload);
    } else {
      addSupplier(payload);
    }
  }

  async function addSupplier(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`suppliers`, payload);
      setSuppliers((prev) => [...prev, result.data]);
      showSuccess(result?.code, supplier_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, supplier_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateSupplier(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await update(`suppliers/${selectedSupplier?.id}`, payload);
      setSuppliers((prev) =>
        prev.map((cat) => (cat.id === result?.data?.id ? result.data : cat)),
      );
      showSuccess(result?.code, supplier_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, supplier_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteSupplier() {
    let result;
    try {
      setActionLoading(true);
      result = await remove(`suppliers/${selectedSupplier.id}`);

      setSuppliers((prev) =>
        prev.filter((cat) => cat.id != selectedSupplier.id),
      );

      showSuccess(result?.code, supplier_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, supplier_delete_fail);
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
          <Button onClick={handleAddSupplier}>
            <Plus /> {add_new_supplier}
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
      ) : suppliers?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              suppliers={suppliers}
              handleEditSupplier={handleEditSupplier}
              handleDeleteSupplier={handleDeleteSupplier}
            />
          )}
          {view == "table" && (
            <TableView
              suppliers={suppliers}
              handleEditSupplier={handleEditSupplier}
              handleDeleteSupplier={handleDeleteSupplier}
            />
          )}
        </>
      )}

      <AddEditSupplierModal
        show={isAddEditSupplierModalOpen}
        onClose={closeModal}
        onConfirm={addEditSupplier}
        supplier={selectedSupplier}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteSupplierConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteSupplier}
        title={supplier_delete_modal_title}
        message={supplier_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={supplier_delete_modal_confirm}
        loading={actionLoading}
      />
    </div>
  );
};
export default SuppliersPage;
