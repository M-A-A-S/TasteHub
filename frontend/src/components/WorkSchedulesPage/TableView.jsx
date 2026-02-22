import { useLanguage } from "../../hooks/useLanguage";
import Table from "../UI/Table";
import WorkScheduleActions from "./WorkScheduleActions";

const TableView = ({
  workSchedules,
  handleEditWorkSchedule,
  handleDeleteWorkSchedule,
  getDayOfWeekName,
}) => {
  const { translations, language } = useLanguage();

  const {
    active,
    inactive,
    table_headers: {
      employee,
      shift_type,
      day_of_week,
      is_active,
      notes,
      actions,
    },
  } = translations.pages.work_schedules_page;

  const headers = [
    employee,
    shift_type,
    day_of_week,
    is_active,
    notes,
    actions,
  ];

  const data = workSchedules?.map((workSchedule) => {
    const employeeName = `${workSchedule?.employee?.person?.firstName || ""} ${
      workSchedule?.employee?.person?.lastName || ""
    }`.trim();

    const shiftName =
      language === "en"
        ? workSchedule?.shiftType?.shiftNameEn
        : workSchedule?.shiftType?.shiftNameAr;

    return {
      employee: <small>{employeeName || "—"}</small>,

      shift_type: <small>{shiftName || "—"}</small>,

      day_of_week: (
        <small>{getDayOfWeekName(workSchedule?.dayOfWeek) || "—"}</small>
      ),

      is_active: (
        <small>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              workSchedule?.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {workSchedule?.isActive ? active : inactive}
          </span>
        </small>
      ),

      notes: <small>{workSchedule?.additionalNotes || "—"}</small>,

      actions: (
        <WorkScheduleActions
          workSchedule={workSchedule}
          handleEditWorkSchedule={handleEditWorkSchedule}
          handleDeleteWorkSchedule={handleDeleteWorkSchedule}
          className="justify-center"
        />
      ),
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
