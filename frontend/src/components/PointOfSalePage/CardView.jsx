import MenuItemCard from "./MenuItemCard";

const CardView = ({ menuItems, onAddToCart }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 transition-all duration-300">
      {menuItems?.map((menuItem) => (
        <MenuItemCard
          key={menuItem.id}
          menuItem={menuItem}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
export default CardView;
