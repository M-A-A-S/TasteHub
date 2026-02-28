import { DollarSign } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import PayrollActions from "./PayrollActions";
import { formatMoney } from "../../utils/utils";

const PayrollCard = ({
  payroll,
  approvePayroll,
  markAsPaid,
  loading,
  getPayrollStatusName,
  getPersonFullName,
}) => {
  const { translations } = useLanguage();

  const {
    table_headers: {
      base_salary,
      overtime,
      deductions,
      net_salary,
      status,
      prorated_salary,
    },
  } = translations.pages.payroll_page;

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm
      hover:shadow-md transition border border-transparent p-4"
    >
      {/* Employee Name */}
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <span className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-orange-500">
          <DollarSign size={18} />
        </span>
        {getPersonFullName(payroll?.employee?.person)}
      </h3>

      {/* Payroll Info */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">{base_salary}</span>
          <span>{formatMoney(payroll.baseSalary)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">{prorated_salary}</span>
          <span>{formatMoney(payroll.proratedSalary)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">{overtime}</span>
          <span>{formatMoney(payroll.overtime)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">{deductions}</span>
          <span className="text-red-500">
            {formatMoney(payroll.deductions)}
          </span>
        </div>

        <div className="flex justify-between font-semibold">
          <span className="text-gray-700">{net_salary}</span>
          <span className="text-orange-600">
            {formatMoney(payroll.netSalary)}
          </span>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500 text-xs">{status}</span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-gray-800">
            {getPayrollStatusName(payroll.payrollStatus)}
          </span>
        </div>
      </div>

      <PayrollActions
        payroll={payroll}
        approvePayroll={approvePayroll}
        markAsPaid={markAsPaid}
        loading={loading}
        className="mt-4 pt-4 border-t dark:border-t-slate-700 justify-end"
      />
    </div>
  );
};
export default PayrollCard;
