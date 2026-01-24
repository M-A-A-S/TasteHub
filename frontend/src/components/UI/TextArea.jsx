import { safeCall } from "../../utils/utils";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
  disabled = false,
  maxLength = null,
  errorMessage = "",
  rows = 4, // Default rows
  cols = 50, // Default columns
  showLabel,
  ...props
}) => {
  const handleChange = safeCall(onChange);

  return (
    <div className={className}>
      {label && (
        <label
          className={`${showLabel ? "" : "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)] [clip-path:inset(50%)]"}`}
        >
          <span>{label}</span>
        </label>
      )}
      <textarea
        className={`w-full px-4 py-2 bg-gray-50 dark:bg-slate-800
             border border-gray-200 dark:border-gray-700 
             rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-24 resize-none`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        cols={cols}
        {...props}
      />
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};
export default TextArea;
