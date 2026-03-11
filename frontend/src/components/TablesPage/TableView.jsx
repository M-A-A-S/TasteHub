import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";
import TableActions from "./TableActions";

const TableView = ({
  tables,
  handleEditTable,
  handleDeleteTable,
  getTableStatusName,
}) => {
  const { translations } = useLanguage();

  const {
    table_headers: { table_number, seats, location, status, actions },
  } = translations.pages.tables_page;

  const headers = [table_number, seats, location, status, actions];

  const data = tables?.map((table) => ({
    table_number: <small>{table.tableNumber}</small>,

    seats: <small>{table.numberOfSeats}</small>,

    location: <small>{table.location || "—"}</small>,

    status: (
      <span className="text-xs px-3 py-1 rounded-xl bg-orange-50 text-orange-600 font-semibold">
        {getTableStatusName(table.tableStatus)}
      </span>
    ),

    actions: (
      <TableActions
        table={table}
        handleEditTable={handleEditTable}
        handleDeleteTable={handleDeleteTable}
        className="justify-center"
      />
    ),
  }));

  return <Table headers={headers} data={data} />;
};
export default TableView;
