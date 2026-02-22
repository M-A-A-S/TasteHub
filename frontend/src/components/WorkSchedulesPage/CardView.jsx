import WorkScheduleCard from "./WorkScheduleCard";

const CardView = ({
  workSchedules,
  handleEditWorkSchedule,
  handleDeleteWorkSchedule,
  getDayOfWeekName,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {workSchedules?.map((workSchedule) => (
        <WorkScheduleCard
          key={workSchedule.id}
          workSchedule={workSchedule}
          handleEditWorkSchedule={handleEditWorkSchedule}
          handleDeleteWorkSchedule={handleDeleteWorkSchedule}
          getDayOfWeekName={getDayOfWeekName}
        />
      ))}
    </div>
  );
};
export default CardView;
