import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";
import ShiftTypeActions from "./ShiftTypeActions";

const TableView = ({
  shiftTypes,
  handleEditShiftType,
  handleDeleteShiftType,
}) => {
  const { translations, language } = useLanguage();

  const {
    table_headers: {
      shift_name,
      start_time,
      end_time,
      break_minutes,
      description,
      actions,
    },
  } = translations.pages.shift_types_page;

  const headers = [
    shift_name,
    start_time,
    end_time,
    break_minutes,
    description,
    actions,
  ];

  const data = shiftTypes?.map((shiftType) => {
    return {
      shift_name: (
        <small>
          {(language == "en" ? shiftType.shiftNameEn : shiftType.shiftNameAr) ||
            "—"}
        </small>
      ),

      start_time: <small>{shiftType.startTime || "—"}</small>,

      end_time: <small>{shiftType.endTime || "—"}</small>,

      break_minutes: <small>{shiftType.breakMinutes || "—"}</small>,

      description: <small>{shiftType.description || "—"}</small>,

      actions: (
        <ShiftTypeActions
          shiftType={shiftType}
          handleEditShiftType={handleEditShiftType}
          handleDeleteShiftType={handleDeleteShiftType}
          className="justify-center"
        />
      ),
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
