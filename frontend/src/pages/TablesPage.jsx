import CardView from "../components/TablesPage/CardView";
import TableView from "../components/TablesPage/TableView";
import AddEditTableModal from "../components/TablesPage/AddEditTableModal";
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
import { TableStatuses } from "../utils/constants";

const TablesPage = () => {
  const [view, setView] = useState("card");
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditTableModalOpen, setIsAddEditTableModalOpen] = useState(false);
  const [isDeleteTableConfirmModalOpen, setIsDeleteTableConfirmModalOpen] =
    useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const { translations } = useLanguage();
  const {
    title,
    description,
    add_new_table,
    table_add_success,
    table_add_fail,
    table_update_success,
    table_update_fail,
    table_delete_success,
    table_delete_fail,
    table_delete_modal_title,
    table_delete_modal_message,
  } = translations.pages.tables_page;

  const {
    cancel,
    loading_error,
    empty_state,
    delete: delete_label,
  } = translations.common;

  const fetchTables = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("tables");
      setTables(result.data);
    } catch (error) {
      console.error("Failed to fetch tables:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  function handleDeleteTable(table) {
    setSelectedTable(table);
    setIsDeleteTableConfirmModalOpen(true);
  }

  function handleEditTable(table) {
    setSelectedTable(table);
    setIsAddEditTableModalOpen(true);
  }

  function handleAddTable() {
    setSelectedTable(null);
    setIsAddEditTableModalOpen(true);
  }

  const closeModal = () => {
    setIsAddEditTableModalOpen(false);
    setIsDeleteTableConfirmModalOpen(false);
    setSelectedTable(null);
  };

  function AddEditTable(payload) {
    if (selectedTable) {
      updateTable(payload);
    } else {
      addTable(payload);
    }
  }

  async function addTable(payload) {
    try {
      setActionLoading(true);
      const result = await create("tables", payload);
      setTables((prev) => [...prev, result.data]);
      showSuccess(result?.code, table_add_success);
    } catch (error) {
      console.error("error ->", error);
      showFail(error?.code, table_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateTable(payload) {
    try {
      setActionLoading(true);
      const result = await update(`tables/${selectedTable?.id}`, payload);
      setTables((prev) =>
        prev.map((table) =>
          table.id === result?.data?.id ? result.data : table,
        ),
      );
      showSuccess(result?.code, table_update_success);
    } catch (error) {
      console.error("error ->", error);
      showFail(error?.code, table_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteTable() {
    try {
      setActionLoading(true);
      const result = await remove(`tables/${selectedTable.id}`);
      setTables((prev) =>
        prev.filter((table) => table.id !== selectedTable.id),
      );
      showSuccess(result?.code, table_delete_success);
    } catch (error) {
      console.error("error ->", error);
      showFail(error?.code, table_delete_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  const getTableStatusName = (status) => {
    const table_status = TableStatuses?.find((item) => item.value === status);
    return table_status ? translations.table_statuses[table_status.key] : "";
  };

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleAddTable}>
            <Plus /> {add_new_table}
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
      ) : tables?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view === "card" && (
            <CardView
              tables={tables}
              handleEditTable={handleEditTable}
              handleDeleteTable={handleDeleteTable}
              getTableStatusName={getTableStatusName}
            />
          )}
          {view === "table" && (
            <TableView
              tables={tables}
              handleEditTable={handleEditTable}
              handleDeleteTable={handleDeleteTable}
              getTableStatusName={getTableStatusName}
            />
          )}
        </>
      )}

      <AddEditTableModal
        show={isAddEditTableModalOpen}
        onClose={closeModal}
        onConfirm={AddEditTable}
        table={selectedTable}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteTableConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteTable}
        title={table_delete_modal_title}
        message={table_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={delete_label}
        loading={actionLoading}
      />
    </div>
  );
};
export default TablesPage;
