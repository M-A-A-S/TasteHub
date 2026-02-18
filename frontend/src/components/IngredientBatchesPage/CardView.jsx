import IngredientBatchCard from "./IngredientBatchCard";

const CardView = ({ ingredientBatches }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {ingredientBatches?.map((ingredientBatch) => (
        <IngredientBatchCard
          key={ingredientBatch.id}
          ingredientBatch={ingredientBatch}
        />
      ))}
    </div>
  );
};
export default CardView;
