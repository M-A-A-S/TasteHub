import { useLanguage } from "../../hooks/useLanguage";
import { formatMoney } from "../../utils/utils";
import Table from "../UI/Table";
import PayrollActions from "./PayrollActions";

const TableView = ({
  payrolls,
  approvePayroll,
  markAsPaid,
  loading,
  getPayrollStatusName,
  getPersonFullName,
}) => {
  const { translations } = useLanguage();
  const {
    table_headers: {
      employee,
      base_salary,
      prorated_salary,
      overtime,
      deductions,
      net_salary,
      status,
      actions,
    },
  } = translations.pages.payroll_page;

  const headers = [
    employee,
    base_salary,
    prorated_salary,
    overtime,
    deductions,
    net_salary,
    status,
    actions,
  ];

  const data = payrolls.map((p) => ({
    employee: <small>{getPersonFullName(p?.employee?.person)}</small>,

    base_salary: <small>{formatMoney(p.baseSalary)}</small>,

    prorated_salary: <small>{formatMoney(p.proratedSalary)}</small>,

    overtime: <small>{formatMoney(p.overtime)}</small>,

    deductions: <small>{formatMoney(p.deductions)}</small>,

    net_salary: (
      <strong className="text-orange-600">{formatMoney(p.netSalary)}</strong>
    ),

    status: (
      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-gray-800 inline-block">
        {getPayrollStatusName(p.payrollStatus)}
      </span>
    ),
    actions: (
      <PayrollActions
        className="justify-center"
        payroll={p}
        approvePayroll={approvePayroll}
        markAsPaid={markAsPaid}
        loading={loading}
      />
    ),
  }));

  return <Table headers={headers} data={data} />;
};
export default TableView;
