import MenuItemCard from "./MenuItemCard";

const CardView = ({ menuItems, handleEditMenuItem, handleDeleteMenuItem }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {menuItems?.map((menuItem) => (
        <MenuItemCard
          key={menuItem.id}
          menuItem={menuItem}
          handleEditMenuItem={handleEditMenuItem}
          handleDeleteMenuItem={handleDeleteMenuItem}
        />
      ))}
    </div>
  );
};
export default CardView;
