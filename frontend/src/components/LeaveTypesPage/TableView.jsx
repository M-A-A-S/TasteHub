import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";
import LeaveTypeActions from "./LeaveTypeActions";

const TableView = ({
  leaveTypes,
  handleEditLeaveType,
  handleDeleteLeaveType,
}) => {
  const { translations, language } = useLanguage();

  const {
    paid,
    unpaid,
    days,
    table_headers: { name, is_paid, default_days_per_year, actions },
  } = translations.pages.leave_types_page;

  const headers = [name, is_paid, default_days_per_year, actions];

  const data = leaveTypes?.map((leaveType) => {
    return {
      name: (
        <small>
          {(language === "en" ? leaveType.nameEn : leaveType.nameAr) || "—"}
        </small>
      ),

      is_paid: <small>{leaveType.isPaid ? paid : unpaid}</small>,

      default_days_per_year: (
        <small>
          {leaveType.defaultDaysPerYear ?? "—"}{" "}
          {leaveType.defaultDaysPerYear ? days : ""}
        </small>
      ),

      actions: (
        <LeaveTypeActions
          leaveType={leaveType}
          handleEditLeaveType={handleEditLeaveType}
          handleDeleteLeaveType={handleDeleteLeaveType}
          className="justify-center"
        />
      ),
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
