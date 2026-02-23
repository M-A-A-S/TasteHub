import { useLanguage } from "../../hooks/useLanguage";
import { LeaveStatus } from "../../utils/constants";
import Table from "../UI/Table";
import LeaveActions from "./LeaveActions";

const TableView = ({
  leaves,
  handleCancelLeave,
  loading,
  getPersonFullName,
  getLeaveTypeName,
  getLeaveStatusName,
}) => {
  const { translations } = useLanguage();

  const {
    table_headers: {
      employee,
      leave_type,
      start_date,
      end_date,
      total_days,
      status,
      actions,
    },
  } = translations.pages.leave_requests_page;

  const headers = [
    employee,
    leave_type,
    start_date,
    end_date,
    total_days,
    status,
    actions,
  ];

  const data = leaves.map((leave) => {
    return {
      employee: <small>{getPersonFullName(leave?.employee?.person)}</small>,

      leave_type: <small>{getLeaveTypeName(leave?.leaveType)}</small>,

      start_date: <small>{leave?.startDate || "—"}</small>,

      end_date: <small>{leave?.endDate || "—"}</small>,

      total_days: <small>{leave?.totalDays || 0}</small>,

      status: (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            leave?.leaveStatus === LeaveStatus.approved
              ? "bg-green-100 text-green-700"
              : leave?.leaveStatus === LeaveStatus.rejected
                ? "bg-red-100 text-red-700"
                : leave?.leaveStatus === LeaveStatus.cancelled
                  ? "bg-gray-100 text-gray-700"
                  : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {getLeaveStatusName(leave?.leaveStatus) || leave?.leaveStatus}
        </span>
      ),

      actions: (
        <LeaveActions
          leave={leave}
          handleCancelLeave={handleCancelLeave}
          loading={loading}
          className="justify-center"
        />
      ),
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
