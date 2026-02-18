import InventoryTransactionCard from "./InventoryTransactionCard";

const CardView = ({ inventoryTransactions, getReasonName }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {inventoryTransactions?.map((inventoryTransaction) => (
        <InventoryTransactionCard
          key={inventoryTransaction.id}
          inventoryTransaction={inventoryTransaction}
          getReasonName={getReasonName}
        />
      ))}
    </div>
  );
};
export default CardView;
