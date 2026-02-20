import {
  Calendar,
  DollarSign,
  Edit3,
  IdCardLanyard,
  Mail,
  Phone,
  Shield,
  Trash2,
  VenusAndMars,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { formatMoney } from "../../utils/utils";
import EmployeeActions from "./EmployeeActions";

const EmployeeCard = ({
  employee,
  handleEditEmployee,
  handleDeleteEmployee,
  getFullName,
  getGenderName,
  GetEmploymentStatusName,
}) => {
  const { translations, language } = useLanguage();

  const {
    table_headers: { hire_date, base_salary },
    form: { gender_label, employment_status_label, date_of_birth_label },
  } = translations.pages.employees_page;

  const activityLabel = employee?.userInfo?.isActive
    ? language === "ar"
      ? "نشط"
      : "Active"
    : language === "ar"
      ? "غير نشط"
      : "Inactive";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border overflow-hidden border-gray-100 dark:border-gray-700 hover:shadow-md transition relative group">
      {/* Status Stripe */}
      <div
        className={`absolute left-0 top-0 h-full w-1.5  rounded-3xl ${
          employee?.userInfo?.isActive
            ? "bg-green-500"
            : "bg-gray-300 dark:bg-slate-500"
        }`}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-700 overflow-hidden">
            {employee.person?.imageUrl ? (
              <img
                src={employee.person.imageUrl}
                alt={getFullName(employee.person)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-xl font-bold">
                {getFullName(employee.person).charAt(0)}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {getFullName(employee.person)}
            </h3>
            <p className="text-xs text-gray-400">
              {employee?.jobTitle
                ? language === "en"
                  ? employee.jobTitle?.nameEn
                  : employee.jobTitle?.nameAr
                : language === "ar"
                  ? "غير محدد"
                  : "Not Assigned"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <EmployeeActions
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
          employee={employee}
          className="opacity-0 group-hover:opacity-100 transition"
        />
      </div>

      {/* Info Section */}
      <div className="space-y-3 text-sm">
        {employee.userInfo?.email && (
          <div className="flex items-center gap-2 text-gray-500">
            <Mail size={14} />
            <span>{employee.userInfo.email}</span>
          </div>
        )}

        {employee.person?.phone && (
          <div className="flex items-center gap-2 text-gray-500">
            <Phone size={14} />
            <span>{employee.person.phone}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-500">
          <VenusAndMars size={14} />
          <span>
            {gender_label}: {getGenderName(employee.person.gender)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={14} />
          <span>
            {date_of_birth_label}: {employee.person.dateOfBirth}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={14} />
          <span>
            {hire_date}: {employee.hireDate}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <DollarSign size={14} />
          <span>
            {base_salary}: {formatMoney(employee.baseSalary)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <IdCardLanyard size={14} />
          <span className="flex items-center gap-2">
            <span>{employment_status_label}: </span>
            <span className="text-xs px-3 py-1 rounded-xl bg-orange-50 text-orange-600 font-semibold flex items-center gap-1">
              {GetEmploymentStatusName(employee.employmentStatus)}
            </span>
          </span>
        </div>

        {/* Roles */}
        {employee?.userInfo?.roles?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {employee?.userInfo?.roles?.map((userRole, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-xl bg-orange-50 text-orange-600 font-semibold flex items-center gap-1"
              >
                <Shield size={12} />
                {language == "en"
                  ? userRole?.role?.nameEn
                  : userRole?.role?.nameAr}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              employee?.userInfo?.isActive
                ? "bg-green-500 animate-pulse"
                : "bg-gray-300"
            }`}
          />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {activityLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
export default EmployeeCard;
