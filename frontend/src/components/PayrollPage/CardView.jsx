import PayrollCard from "./PayrollCard";

const CardView = ({
  payrolls,
  approvePayroll,
  markAsPaid,
  loading,
  getPayrollStatusName,
  getPersonFullName,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {payrolls?.map((payroll) => {
        return (
          <PayrollCard
            key={payroll.id}
            payroll={payroll}
            approvePayroll={approvePayroll}
            markAsPaid={markAsPaid}
            loading={loading}
            getPayrollStatusName={getPayrollStatusName}
            getPersonFullName={getPersonFullName}
          />
        );
      })}
    </div>
  );
};
export default CardView;
