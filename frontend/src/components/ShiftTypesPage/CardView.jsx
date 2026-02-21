import ShiftTypeCard from "./ShiftTypeCard";

const CardView = ({
  shiftTypes,
  handleEditShiftType,
  handleDeleteShiftType,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {shiftTypes?.map((shiftType) => (
        <ShiftTypeCard
          key={shiftType.id}
          shiftType={shiftType}
          handleEditShiftType={handleEditShiftType}
          handleDeleteShiftType={handleDeleteShiftType}
        />
      ))}
    </div>
  );
};
export default CardView;
