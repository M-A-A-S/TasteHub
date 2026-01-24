const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  required = false,
  disabled = false,
  maxLength = null,
  errorMessage = "",
  showLabel = false,
  ...props
}) => {
  const handleChange = (e) => {
    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label
          className={`${showLabel ? "" : "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)] [clip-path:inset(50%)]"}`}
        >
          <span>{label}</span>
        </label>
      )}
      <input
        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 
        border border-gray-200 dark:border-gray-700 
        rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        {...props}
      />
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};
export default Input;
