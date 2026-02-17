const SupplierCardHeader = ({ supplier, getFullName }) => {
  const person = supplier?.person || {};
  const fullName = getFullName(person);

  return (
    <div className="flex items-center gap-3">
      {/* Image */}
      {person.imageUrl ? (
        <img
          src={person.imageUrl}
          alt={fullName}
          className="w-12 h-12 rounded-full object-cover border"
        />
      ) : (
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 text-orange-500">
          <User size={20} />
        </span>
      )}

      {/* Name */}
      <h3 className="font-semibold text-lg">{fullName}</h3>
    </div>
  );
};
export default SupplierCardHeader;
