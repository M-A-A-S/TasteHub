import { useLanguage } from "../../hooks/useLanguage";
import { formatMoney } from "../../utils/utils";
import EmployeeActions from "./EmployeeActions";
import Table from "../UI/Table";

const TableView = ({
  employees,
  handleEditEmployee,
  handleDeleteEmployee,
  getFullName,
  getGenderName,
  GetEmploymentStatusName,
}) => {
  const { translations, language } = useLanguage();

  const {
    table_headers: {
      image,
      first_name,
      last_name,
      email,
      phone,
      gender,
      date_of_birth,
      hire_date,
      base_salary,
      employment_status,
      job_title,
      actions,
    },
  } = translations.pages.employees_page;

  const headers = [
    image,
    first_name,
    last_name,
    email,
    phone,
    gender,
    date_of_birth,
    hire_date,
    base_salary,
    employment_status,
    job_title,
    actions,
  ];

  const data = employees?.map((employee) => {
    const person = employee?.person || {};
    const userInfo = employee?.userInfo || {};

    return {
      image: (
        <div className="flex justify-center">
          {person.imageUrl ? (
            <img
              src={person.imageUrl}
              alt={getFullName(person)}
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-orange-500 font-semibold">
              {getFullName(person)?.charAt(0) || <User size={16} />}
            </span>
          )}
        </div>
      ),

      first_name: <small>{person.firstName || "—"}</small>,

      last_name: <small>{person.lastName || "—"}</small>,

      email: <small>{userInfo.email || "—"}</small>,

      phone: <small>{person.phone || "—"}</small>,

      gender: <small>{getGenderName(person.gender)}</small>,

      date_of_birth: <small>{person.dateOfBirth || "—"}</small>,

      hire_date: <small>{employee.hireDate || "—"}</small>,

      base_salary: (
        <small>
          {employee.baseSalary ? formatMoney(employee.baseSalary) : "—"}
        </small>
      ),

      employment_status: (
        <span className="text-xs px-3 py-1 rounded-xl bg-orange-50 text-orange-600 font-semibold">
          {GetEmploymentStatusName(employee.employmentStatus)}
        </span>
      ),

      job_title: (
        <small>
          {employee?.jobTitle
            ? language === "en"
              ? employee.jobTitle?.nameEn
              : employee.jobTitle?.nameAr
            : language === "ar"
              ? "غير محدد"
              : "Not Assigned"}
        </small>
      ),

      actions: (
        <EmployeeActions
          employee={employee}
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
          className="justify-center"
        />
      ),
    };
  });

  return <Table headers={headers} data={data} />;
};
export default TableView;
