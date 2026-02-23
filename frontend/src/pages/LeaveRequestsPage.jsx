import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { create, read, update } from "../api/apiWrapper";
import PageHeader from "../components/PageHeader";
import Button from "../components/UI/Button";
import { Plus } from "lucide-react";
import CardView from "../components/LeaveRequestsPage/CardView";
import TableView from "../components/LeaveRequestsPage/TableView";
import RequestLeaveModal from "../components/LeaveRequestsPage/RequestLeaveModal";
import { showFail, showSuccess } from "../utils/utils";
import ConfirmModal from "../components/UI/ConfirmModal";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import { LeaveStatuses } from "../utils/constants";

const LeaveRequestsPage = () => {
  const { translations, language } = useLanguage();

  const {
    title,
    description,
    request_leave_btn,
    leave_request_success,
    leave_request_fail,
    leave_cancel_success,
    leave_cancel_fail,
    leave_cancel_modal_title,
    leave_cancel_modal_message,
    cancel,
    confirm_cancel,
  } = translations.pages.leave_requests_page;

  const { loading_error, empty_state } = translations.common;

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [isRequestLeaveModal, setIsRequestLeaveModal] = useState(false);
  const [isCancelLeaveModal, setIsCancelLeaveModal] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);

  const [view, setView] = useState("card");
  const [errorCode, setErrorCode] = useState("");

  const fetchLeaves = async () => {
    let result;
    try {
      setLoading(true);
      setErrorCode("");

      result = await read("leaves");
      setLeaves(result.data);
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
      setErrorCode(error?.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  function handleRequestLeave() {
    setIsRequestLeaveModal(true);
  }

  function handleCancelLeave(id) {
    setIsCancelLeaveModal(true);
    setSelectedLeaveId(id);
  }

  function closeModal() {
    setIsRequestLeaveModal(false);
    setIsCancelLeaveModal(false);
    setSelectedLeaveId(null);
  }

  async function submitLeaveRequest(payload) {
    let result;
    try {
      setActionLoading(true);
      result = await create(`leaves/request`, payload);
      showSuccess(result?.code, leave_request_success);
      await fetchLeaves();
    } catch (error) {
      console.log("error -> ", error);
      showFail(error?.code, leave_request_fail);
    } finally {
      setActionLoading(false);
      closeModal(); // close modal after action
    }
  }

  async function cancelLeave() {
    let result;
    try {
      setActionLoading(true);
      result = await update(`leaves/cancel/${selectedLeaveId}`);
      showSuccess(result?.code, leave_cancel_success);
      await fetchLeaves();
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, leave_cancel_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  function getPersonFullName(person) {
    return `${person.firstName} ${person.lastName}`;
  }

  function getLeaveTypeName(leaveType) {
    return language == "en" ? leaveType.nameEn : leaveType.nameAr;
  }

  function getLeaveStatusName(status) {
    const leaveStatus = LeaveStatuses?.find((g) => g.value === status);
    return leaveStatus ? translations.leave_statuses[leaveStatus.key] : "";
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <Button onClick={handleRequestLeave}>
            <Plus /> {request_leave_btn}
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
      ) : leaves?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />

          {view === "card" && (
            <CardView
              leaves={leaves}
              handleCancelLeave={handleCancelLeave}
              loading={actionLoading}
              getPersonFullName={getPersonFullName}
              getLeaveTypeName={getLeaveTypeName}
              getLeaveStatusName={getLeaveStatusName}
            />
          )}

          {view === "table" && (
            <TableView
              leaves={leaves}
              handleCancelLeave={handleCancelLeave}
              loading={actionLoading}
              getPersonFullName={getPersonFullName}
              getLeaveTypeName={getLeaveTypeName}
              getLeaveStatusName={getLeaveStatusName}
            />
          )}
        </>
      )}

      <RequestLeaveModal
        show={isRequestLeaveModal}
        onClose={closeModal}
        onConfirm={submitLeaveRequest}
        loading={actionLoading}
      />
      <ConfirmModal
        show={isCancelLeaveModal}
        onClose={closeModal}
        onConfirm={cancelLeave}
        title={leave_cancel_modal_title}
        message={leave_cancel_modal_message}
        cancelLabel={cancel}
        confirmLabel={confirm_cancel}
        loading={actionLoading}
      />
    </div>
  );
};
export default LeaveRequestsPage;
