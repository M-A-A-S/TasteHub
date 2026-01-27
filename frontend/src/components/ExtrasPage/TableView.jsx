import { useLanguage } from "../../hooks/useLanguage";
import { safeCall } from "../../utils/utils";

const TableView = ({ extras, handleEditExtra, handleDeleteExtra }) => {
  const { translations } = useLanguage();

  const onEdit = safeCall(handleEditExtra);
  const onDelete = safeCall(handleDeleteExtra);

  return <div>TableView</div>;
};
export default TableView;
