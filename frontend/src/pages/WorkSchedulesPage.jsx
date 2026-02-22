import TableView from "../components/WorkSchedulesPage/TableView";
import CardView from "../components/WorkSchedulesPage/CardView";
import AddEditWorkScheduleModal from "../components/WorkSchedulesPage/AddEditWorkScheduleModal";
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
import { DaysOfWeek } from "../utils/constants";

const WorkSchedulesPage = () => {
  const [view, setView] = useState("card");

  const [workSchedules, setWorkSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [selectedWorkSchedule, setSelectedWorkSchedule] = useState(null);

  const { translations } = useLanguage();

  const {
    title,
    description,
    add_new_work_schedule,

    work_schedule_add_success,
    work_schedule_add_fail,
    work_schedule_update_success,
    work_schedule_update_fail,
    work_schedule_delete_success,
    work_schedule_delete_fail,

    work_schedule_delete_modal_title,
    work_schedule_delete_modal_message,
    work_schedule_delete_modal_confirm,
  } = translations.pages.work_schedules_page;

  const { cancel, loading_error, empty_state } = translations.common;

  const fetchWorkSchedules = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");

      result = await read("work-schedules");
      setWorkSchedules(result.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setErrorCode(result?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkSchedules();
  }, []);

  function handleAdd() {
    setSelectedWorkSchedule(null);
    setIsAddEditModalOpen(true);
  }

  function handleEdit(schedule) {
    setSelectedWorkSchedule(schedule);
    setIsAddEditModalOpen(true);
  }

  function handleDelete(schedule) {
    setSelectedWorkSchedule(schedule);
    setIsDeleteConfirmOpen(true);
  }

  const closeModal = () => {
    setIsAddEditModalOpen(false);
    setIsDeleteConfirmOpen(false);
    setSelectedWorkSchedule(null);
  };

  async function addEditWorkSchedule(payload) {
    if (selectedWorkSchedule) {
      updateWorkSchedule(payload);
    } else {
      addWorkSchedule(payload);
    }
  }

  async function addWorkSchedule(payload) {
    let result;
    try {
      setActionLoading(true);

      result = await create("work-schedules", payload);

      setWorkSchedules((prev) => [...prev, result.data]);

      showSuccess(result?.code, work_schedule_add_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, work_schedule_add_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function updateWorkSchedule(payload) {
    let result;
    try {
      setActionLoading(true);

      result = await update(
        `work-schedules/${selectedWorkSchedule?.id}`,
        payload,
      );

      setWorkSchedules((prev) =>
        prev.map((item) => (item.id === result?.data?.id ? result.data : item)),
      );

      showSuccess(result?.code, work_schedule_update_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, work_schedule_update_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function deleteWorkSchedule() {
    let result;
    try {
      setActionLoading(true);

      result = await remove(`work-schedules/${selectedWorkSchedule.id}`);

      setWorkSchedules((prev) =>
        prev.filter((x) => x.id !== selectedWorkSchedule.id),
      );

      showSuccess(result?.code, work_schedule_delete_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, work_schedule_delete_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  const getDayOfWeekName = (day) => {
    const dayOfWeek = DaysOfWeek?.find((g) => g.value === day);
    return dayOfWeek
      ? translations.pages?.work_schedules_page?.days?.[dayOfWeek.key]
      : "-";
  };

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleAdd}>
            <Plus /> {add_new_work_schedule}
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
      ) : workSchedules?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />

          {view === "card" && (
            <CardView
              workSchedules={workSchedules}
              handleEditWorkSchedule={handleEdit}
              handleDeleteWorkSchedule={handleDelete}
              getDayOfWeekName={getDayOfWeekName}
            />
          )}

          {view === "table" && (
            <TableView
              workSchedules={workSchedules}
              handleEditWorkSchedule={handleEdit}
              handleDeleteWorkSchedule={handleDelete}
              getDayOfWeekName={getDayOfWeekName}
            />
          )}
        </>
      )}

      <AddEditWorkScheduleModal
        show={isAddEditModalOpen}
        onClose={closeModal}
        onConfirm={addEditWorkSchedule}
        workSchedule={selectedWorkSchedule}
        loading={actionLoading}
      />

      <ConfirmModal
        show={isDeleteConfirmOpen}
        onClose={closeModal}
        onConfirm={deleteWorkSchedule}
        title={work_schedule_delete_modal_title}
        message={work_schedule_delete_modal_message}
        cancelLabel={cancel}
        confirmLabel={work_schedule_delete_modal_confirm}
        loading={actionLoading}
      />
    </div>
  );
};
export default WorkSchedulesPage;
