import { MapPin, Users, Hash } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import TableActions from "./TableActions";

const TableCard = ({
  table,
  handleEditTable,
  handleDeleteTable,
  getTableStatusName,
}) => {
  const { translations } = useLanguage();

  const {
    table_headers: { table_number, seats, location, status },
  } = translations.pages.tables_page;

  const statusColor = {
    0: "bg-green-500", // Available
    1: "bg-red-500", // Occupied
    2: "bg-yellow-500", // Reserved
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border overflow-hidden border-gray-100 dark:border-gray-700 hover:shadow-md transition relative group">
      {/* Status Stripe */}
      <div
        className={`absolute left-0 top-0 h-full w-1.5 rounded-3xl ${
          statusColor[table.tableStatus] || "bg-gray-400"
        }`}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          {/* Table Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 font-bold text-lg">
            {table.tableNumber}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {table_number}: {table.tableNumber}
            </h3>
            <p className="text-xs text-gray-400">
              {status}: {getTableStatusName(table.tableStatus)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <TableActions
          table={table}
          handleEditTable={handleEditTable}
          handleDeleteTable={handleDeleteTable}
          className="opacity-0 group-hover:opacity-100 transition"
        />
      </div>

      {/* Info Section */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Hash size={14} />
          <span>
            {table_number}: {table.tableNumber}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Users size={14} />
          <span>
            {seats}: {table.numberOfSeats}
          </span>
        </div>

        {table.location && (
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin size={14} />
            <span>
              {location}: {table.location}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
        <span className="text-xs px-3 py-1 rounded-xl bg-orange-50 text-orange-600 font-semibold">
          {getTableStatusName(table.tableStatus)}
        </span>
      </div>
    </div>
  );
};

export default TableCard;
