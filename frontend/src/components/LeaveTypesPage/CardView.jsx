import LeaveTypeCard from "./LeaveTypeCard";

const CardView = ({
  leaveTypes,
  handleEditLeaveType,
  handleDeleteLeaveType,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {leaveTypes?.map((leaveType) => (
        <LeaveTypeCard
          key={leaveType.id}
          leaveType={leaveType}
          handleEditLeaveType={handleEditLeaveType}
          handleDeleteLeaveType={handleDeleteLeaveType}
        />
      ))}
    </div>
  );
};
export default CardView;
