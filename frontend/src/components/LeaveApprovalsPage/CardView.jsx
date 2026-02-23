import LeaveCard from "./LeaveCard";
const CardView = ({
  leaves,
  handleApproveLeave,
  handleRejectLeave,
  loading,
  getPersonFullName,
  getLeaveTypeName,
  getLeaveStatusName,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {leaves?.map((leave) => {
        return (
          <LeaveCard
            key={leave.id}
            leave={leave}
            handleApproveLeave={handleApproveLeave}
            handleRejectLeave={handleRejectLeave}
            loading={loading}
            getPersonFullName={getPersonFullName}
            getLeaveTypeName={getLeaveTypeName}
            getLeaveStatusName={getLeaveStatusName}
          />
        );
      })}
    </div>
  );
};
export default CardView;
