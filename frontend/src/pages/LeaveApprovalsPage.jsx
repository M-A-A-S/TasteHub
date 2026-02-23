import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { read, update } from "../api/apiWrapper";
import { useEffect } from "react";
import { LeaveStatuses } from "../utils/constants";
import { showFail, showSuccess } from "../utils/utils";
import PageHeader from "../components/PageHeader";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import CardView from "../components/LeaveApprovalsPage/CardView";
import TableView from "../components/LeaveApprovalsPage/TableView";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import ConfirmModal from "../components/UI/ConfirmModal";

const LeaveApprovalsPage = () => {
  const { translations, language } = useLanguage();

  const {
    title,
    description,
    approve_success,
    approve_fail,
    reject_success,
    reject_fail,
    approve_modal_title,
    approve_modal_message,
    confirm_approve,
    reject_modal_title,
    reject_modal_message,
    confirm_reject,
  } = translations.pages.leave_approvals_page;

  const { loading_error, empty_state, cancel } = translations.common;

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [isApproveLeaveModal, setIsApproveLeaveModal] = useState(false);
  const [isRejectLeaveModal, setIsRejectLeaveModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

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

  function handleApproveLeave(leave) {
    setIsApproveLeaveModal(true);
    setSelectedLeave(leave);
  }

  function handleRejectLeave(leave) {
    setIsRejectLeaveModal(true);
    setSelectedLeave(leave);
  }

  function closeModal() {
    setIsApproveLeaveModal(false);
    setIsRejectLeaveModal(false);
    setSelectedLeave(null);
  }

  async function approveLeave() {
    let result;
    try {
      setActionLoading(true);
      const payload = {
        id: selectedLeave.id,
        isApprove: true,
      };
      result = await update(`leaves/approve`, payload);
      showSuccess(result?.code, approve_success);
      await fetchLeaves();
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, approve_fail);
    } finally {
      setActionLoading(false);
      closeModal();
    }
  }

  async function rejectLeave() {
    let result;
    try {
      setActionLoading(true);
      const payload = {
        id: selectedLeave.id,
        isApprove: false,
      };
      result = await update(`leaves/approve`, payload);
      showSuccess(result?.code, reject_success);
      await fetchLeaves();
    } catch (error) {
      console.log("error -> ", error);
      showFail(result?.code, reject_fail);
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
      <PageHeader title={title} description={description} />

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
              handleApproveLeave={handleApproveLeave}
              handleRejectLeave={handleRejectLeave}
              loading={actionLoading}
              getPersonFullName={getPersonFullName}
              getLeaveTypeName={getLeaveTypeName}
              getLeaveStatusName={getLeaveStatusName}
            />
          )}

          {view === "table" && (
            <TableView
              leaves={leaves}
              handleApproveLeave={handleApproveLeave}
              handleRejectLeave={handleRejectLeave}
              loading={actionLoading}
              getPersonFullName={getPersonFullName}
              getLeaveTypeName={getLeaveTypeName}
              getLeaveStatusName={getLeaveStatusName}
            />
          )}
        </>
      )}

      <ConfirmModal
        show={isApproveLeaveModal}
        onClose={closeModal}
        onConfirm={approveLeave}
        title={approve_modal_title}
        message={approve_modal_message}
        cancelLabel={cancel}
        confirmLabel={confirm_approve}
        loading={actionLoading}
      />

      <ConfirmModal
        show={isRejectLeaveModal}
        onClose={closeModal}
        onConfirm={rejectLeave}
        title={reject_modal_title}
        message={reject_modal_message}
        cancelLabel={cancel}
        confirmLabel={confirm_reject}
        loading={actionLoading}
      />
    </div>
  );
};
export default LeaveApprovalsPage;
