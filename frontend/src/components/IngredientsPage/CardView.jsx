import IngredientCard from "./IngredientCard";

const CardView = ({
  ingredients,
  handleEditIngredient,
  handleDeleteIngredient,
  getUnitName,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {ingredients?.map((ingredient) => (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
          handleEditIngredient={handleEditIngredient}
          handleDeleteIngredient={handleDeleteIngredient}
          getUnitName={getUnitName}
        />
      ))}
    </div>
  );
};
export default CardView;
