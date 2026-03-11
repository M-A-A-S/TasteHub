import TableCard from "./TableCard";

const CardView = ({
  tables,
  handleEditTable,
  handleDeleteTable,
  getTableStatusName,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {tables?.map((table) => (
        <TableCard
          key={table.id}
          table={table}
          handleEditTable={handleEditTable}
          handleDeleteTable={handleDeleteTable}
          getTableStatusName={getTableStatusName}
        />
      ))}
    </div>
  );
};
export default CardView;
