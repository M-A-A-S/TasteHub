import { useLanguage } from "../../hooks/useLanguage";
import { LeaveStatus } from "../../utils/constants";
import { safeCall } from "../../utils/utils";
import Button from "../UI/Button";

const LeaveActions = ({
  leave,
  hanldeCancelLeave,
  handleApproveLeave,
  handleRejectLeave,
  loading,
  className,
}) => {
  const onApprove = safeCall(handleApproveLeave);
  const onReject = safeCall(handleRejectLeave);
  const onCancel = safeCall(hanldeCancelLeave);

  const { translations } = useLanguage();

  const {
    actions: { approve, reject, cancel },
  } = translations.pages.leave_requests_page;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* <Button onClick={() => onApprove(leave)} disabled={loading}>
        {approve}
      </Button>
      <Button
        onClick={() => onReject(leave)}
        className="bg-red-500 hover:bg-red-600"
        disabled={loading}
      >
        {reject}
      </Button> */}
      {leave.leaveStatus != LeaveStatus.cancelled && (
        <Button onClick={() => onCancel(leave?.id)} disabled={loading}>
          {cancel}
        </Button>
      )}
    </div>
  );
};
export default LeaveActions;
