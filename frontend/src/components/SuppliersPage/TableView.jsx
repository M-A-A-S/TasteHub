import { Pencil, User } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";
import SupplierCardActions from "./SupplierCard/SupplierCardActions";
import Table from "../UI/Table";

const TableView = ({
  suppliers,
  handleEditSupplier,
  handleDeleteSupplier,
  getFullName,
  getGenderName,
}) => {
  const { translations } = useLanguage();

  const onEdit = safeCall(handleEditSupplier);
  const onDelete = safeCall(handleDeleteSupplier);

  const {
    table_headers: {
      image,
      first_name,
      last_name,
      phone,
      gender,
      date_of_birth,
      actions,
    },
  } = translations.pages.suppliers_page;

  const headers = [
    image,
    first_name,
    last_name,
    phone,
    gender,
    date_of_birth,
    actions,
  ];

  const data = suppliers?.map((supplier) => {
    const person = supplier?.person || {};

    return {
      image: (
        <div className="flex justify-center">
          {person.imageUrl ? (
            <img
              src={person.imageUrl}
              alt={person.firstName}
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-orange-500">
              <User size={16} />
            </span>
          )}
        </div>
      ),

      first_name: <small>{person.firstName || "—"}</small>,

      last_name: <small>{person.lastName || "—"}</small>,

      phone: <small>{person.phone || "—"}</small>,

      gender: <small>{getGenderName(person.gender)}</small>,

      date_of_birth: <small>{person.dateOfBirth || "—"}</small>,

      actions: (
        <SupplierCardActions
          handleDeleteSupplier={handleDeleteSupplier}
          handleEditSupplier={handleEditSupplier}
          supplier={supplier}
          className="justify-center"
        />
      ),
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
