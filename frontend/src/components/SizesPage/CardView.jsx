import SizeCard from "./SizeCard";

const CardView = ({ sizes, handleEditSize, handleDeleteSize }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {sizes?.map((size) => (
        <SizeCard
          key={size.id}
          size={size}
          handleEditExtra={handleEditSize}
          handleDeleteExtra={handleDeleteSize}
        />
      ))}
    </div>
  );
};

export default CardView;
