import { useLanguage } from "../../hooks/useLanguage";
import { PayrollStatus } from "../../utils/constants";
import Button from "../UI/Button";

const PayrollActions = ({
  className,
  payroll,
  approvePayroll,
  markAsPaid,
  loading,
}) => {
  const { translations } = useLanguage();
  const { approve_btn, mark_paid_btn } = translations.pages.payroll_page;

  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {payroll.payrollStatus === PayrollStatus.draft && (
        <Button onClick={() => approvePayroll(payroll.id)} disabled={loading}>
          {approve_btn}
        </Button>
      )}

      {payroll.payrollStatus === PayrollStatus.approved && (
        <Button onClick={() => markAsPaid(payroll.id)} disabled={loading}>
          {mark_paid_btn}
        </Button>
      )}
    </div>
  );
};
export default PayrollActions;
