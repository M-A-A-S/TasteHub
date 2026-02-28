import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { create, read } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";
import PageHeader from "../components/PageHeader";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { ViewSwitcher } from "../components/UI/ViewSwitcher";
import SpinnerLoader from "../components/UI/SpinnerLoader";
import TableView from "../components/PayrollPage/TableView";
import CardView from "../components/PayrollPage/CardView";
import { PayrollStatuses } from "../utils/constants";

const PayrollPage = () => {
  const { translations } = useLanguage();

  const {
    title,
    description,
    generate_success,
    generate_fail,
    approve_success,
    approve_fail,
    paid_success,
    paid_fail,
    generate_btn,
  } = translations.pages.payroll_page;

  const { loading_error, empty_state } = translations.common;

  const [view, setView] = useState("table");
  const [payrolls, setPayrolls] = useState([]);
  const [errorCode, setErrorCode] = useState("");

  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1,
  );
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      setErrorCode("");

      const result = await read(
        `payrolls?payrollMonth=${selectedMonth}&payrollYear=${selectedYear}`,
      );

      setPayrolls(result.data);
    } catch (error) {
      setErrorCode(error?.code);
    } finally {
      setLoading(false);
    }
  };

  const generatePayroll = async () => {
    try {
      setActionLoading(true);

      const result = await create(
        `payrolls/generate?month=${selectedMonth}&year=${selectedYear}`,
      );

      showSuccess(result?.code, generate_success);
      await fetchPayrolls();
    } catch (error) {
      showFail(error?.code, generate_fail);
    } finally {
      setActionLoading(false);
    }
  };

  const approvePayroll = async (id) => {
    try {
      setActionLoading(true);

      const result = await create(`payrolls/${id}/approve`);

      showSuccess(result?.code, approve_success);
      await fetchPayrolls();
    } catch (error) {
      showFail(error?.code, approve_fail);
    } finally {
      setActionLoading(false);
    }
  };

  const markAsPaid = async (id) => {
    try {
      setActionLoading(true);

      const result = await create(`payrolls/${id}/mark-paid`);

      showSuccess(result?.code, paid_success);
      await fetchPayrolls();
    } catch (error) {
      showFail(error?.code, paid_fail);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, [selectedMonth, selectedYear]);

  const getPayrollStatusName = (statusValue) => {
    const status = PayrollStatuses?.find((s) => s.value === statusValue);
    return status ? translations.payroll_status[status.key] : "";
  };

  const getPersonFullName = (person) => {
    return `${person.firstName || ""} ${person.lastName || ""}`;
  };

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        leftSection={
          <div className="flex gap-3 items-center">
            <Input
              type="number"
              min="1"
              max="12"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
            <Input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
            <Button onClick={generatePayroll} disabled={actionLoading}>
              {generate_btn}
            </Button>
          </div>
        }
      />

      {loading ? (
        <div className="grid place-items-center h-[60vh]">
          <SpinnerLoader />
        </div>
      ) : errorCode ? (
        <div className="grid place-items-center h-[60vh] text-red-500">
          {translations.server_codes[errorCode] || loading_error}
        </div>
      ) : payrolls?.length === 0 ? (
        <div className="grid place-items-center h-[60vh] text-gray-500">
          {empty_state}
        </div>
      ) : (
        <>
          <ViewSwitcher view={view} setView={setView} />

          {view === "table" && (
            <TableView
              payrolls={payrolls}
              approvePayroll={approvePayroll}
              markAsPaid={markAsPaid}
              loading={actionLoading}
              getPayrollStatusName={getPayrollStatusName}
              getPersonFullName={getPersonFullName}
            />
          )}
          {view === "card" && (
            <CardView
              payrolls={payrolls}
              approvePayroll={approvePayroll}
              markAsPaid={markAsPaid}
              loading={actionLoading}
              getPayrollStatusName={getPayrollStatusName}
              getPersonFullName={getPersonFullName}
            />
          )}
        </>
      )}
    </div>
  );
};
export default PayrollPage;
