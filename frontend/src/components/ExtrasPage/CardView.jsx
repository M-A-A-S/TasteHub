import ExtraCard from "./ExtraCard";

const CardView = ({ extras, handleEditExtra, handleDeleteExtra }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {extras?.map((extra) => (
        <ExtraCard
          key={extra.id}
          extra={extra}
          handleEditExtra={handleEditExtra}
          handleDeleteExtra={handleDeleteExtra}
        />
      ))}
    </div>
  );
};
export default CardView;
