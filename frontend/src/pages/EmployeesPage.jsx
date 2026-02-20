import { useEffect, useState } from "react";

import CardView from "../components/EmployeesPage/CardView";
import TableView from "../components/EmployeesPage/TableView";
import AddEditEmployeeModal from "../components/EmployeesPage/AddEditEmployeeModal";
import { useLanguage } from "../hooks/useLanguage";
import { create, read, remove, update } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import { EmploymentStatuses, Genders } from "../utils/constants";
import PageHeader from "../components/PageHeader";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import ConfirmModal from "../components/UI/ConfirmModal";

const EmployeesPage = () => {
  const [view, setView] = useState("card"); // 'table' or 'card'
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [isAddEditEmployeeModalOpen, setIsAddEditEmployeeModalOpen] =
    useState(false);
  const [
    isDeleteEmployeeConfirmModalOpen,
    setIsDeleteEmployeeConfirmModalOpen,
  ] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { translations } = useLanguage();
  const {
    title,
    description,
    add_new_employee,
    edit_employee,

    employee_add_success,
    employee_add_fail,

    employee_update_success,
    employee_update_fail,
    employee_delete_success,
    employee_delete_fail,

    employee_delete_modal_title,
    employee_delete_modal_message,
    employee_delete_modal_confirm,
  } = translations.pages.employees_page;

  const { cancel, empty_state, loading_error } = translations.common;

  const fetchEmployees = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");
      result = await read("employees");
      console.log("result", result);
      setEmployees(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  function handleDeleteEmployee(Employee) {
    setSelectedEmployee(Employee);
    setIsDeleteEmployeeConfirmModalOpen(true);
    console.log("Employee -> ", Employee);
  }
  function handleEditEmployee(Employee) {
    setSelectedEmployee(Employee);
    setIsAddEditEmployeeModalOpen(true);
    console.log("Employee -> ", Employee);
  }

  function handleAddEmployee() {
    setSelectedEmployee(null);
    setIsAddEditEmployeeModalOpen(true);
  }

  const closeModal = () => {
    setIsAddEditEmployeeModalOpen(false);
    setIsDeleteEmployeeConfirmModalOpen(false);
    setSelectedEmployee(null);
  };

  function addEditEmployee(payload) {
    if (selectedEmployee) {
      updateEmployee(payload);
    } else {
      addEmployee(payload);
    }
  }

  async function addEmployee(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`Employees`, payload);
      setEmployees((prev) => [...prev, result.data]);
      showSuccess(result?.code, employee_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, employee_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateEmployee(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await update(`employees/${selectedEmployee?.id}`, payload);
      setEmployees((prev) =>
        prev.map((cat) => (cat.id === result?.data?.id ? result.data : cat)),
      );
      showSuccess(result?.code, employee_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, employee_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteEmployee() {
    let result;
    try {
      setActionLoading(true);
      result = await remove(`employees/${selectedEmployee.id}`);

      setEmployees((prev) =>
        prev.filter((cat) => cat.id != selectedEmployee.id),
      );

      showSuccess(result?.code, employee_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, employee_delete_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  const getFullName = (person) =>
    `${person.firstName || ""} ${person.lastName || ""}`;

  const getGenderName = (genderValue) => {
    const gender = Genders?.find((g) => g.value === genderValue);
    return gender
      ? translations.genders[gender.key]
      : translations.genders.unknown;
  };

  const GetEmploymentStatusName = (employmentStatus) => {
    const employment_status = EmploymentStatuses?.find(
      (item) => item.value === employmentStatus,
    );
    return employment_status
      ? translations.employment_status[employment_status.key]
      : "-";
  };

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleAddEmployee}>
            <Plus /> {add_new_employee}
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
      ) : employees?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />
          {view == "card" && (
            <CardView
              employees={employees}
              handleEditEmployee={handleEditEmployee}
              handleDeleteEmployee={handleDeleteEmployee}
              getFullName={getFullName}
              getGenderName={getGenderName}
              GetEmploymentStatusName={GetEmploymentStatusName}
            />
          )}
          {view == "table" && (
            <TableView
              employees={employees}
              handleEditEmployee={handleEditEmployee}
              handleDeleteEmployee={handleDeleteEmployee}
              getFullName={getFullName}
              getGenderName={getGenderName}
              GetEmploymentStatusName={GetEmploymentStatusName}
            />
          )}
        </>
      )}

      <AddEditEmployeeModal
        show={isAddEditEmployeeModalOpen}
        onClose={closeModal}
        onConfirm={addEditEmployee}
        employee={selectedEmployee}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isDeleteEmployeeConfirmModalOpen}
        onClose={closeModal}
        onConfirm={deleteEmployee}
        title={employee_delete_modal_title}
        message={employee_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={employee_delete_modal_confirm}
        loading={actionLoading}
      />
    </div>
  );
};
export default EmployeesPage;
