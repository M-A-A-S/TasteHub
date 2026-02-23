import { useLanguage } from "../../hooks/useLanguage";
import { LeaveStatus } from "../../utils/constants";
import { safeCall } from "../../utils/utils";
import Button from "../UI/Button";

const LeaveActions = ({
  leave,
  handleApproveLeave,
  handleRejectLeave,
  loading,
  className,
}) => {
  const onApprove = safeCall(handleApproveLeave);
  const onReject = safeCall(handleRejectLeave);

  const { translations } = useLanguage();

  const {
    actions: { approve, reject },
  } = translations.pages.leave_requests_page;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {leave.leaveStatus === LeaveStatus.pending && (
        <>
          <Button onClick={() => onApprove(leave)} disabled={loading}>
            {approve}
          </Button>

          <Button
            onClick={() => onReject(leave)}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600"
          >
            {reject}
          </Button>
        </>
      )}
    </div>
  );
};
export default LeaveActions;
