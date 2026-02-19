import EmployeeCard from "./EmployeeCard";

const CardView = ({
  employees,
  handleEditEmployee,
  handleDeleteEmployee,
  getFullName,
  getGenderName,
  GetEmploymentStatusName,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {employees?.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
          getFullName={getFullName}
          getGenderName={getGenderName}
          GetEmploymentStatusName={GetEmploymentStatusName}
        />
      ))}
    </div>
  );
};
export default CardView;
