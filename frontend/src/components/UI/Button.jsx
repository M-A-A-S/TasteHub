import { safeCall } from "../../utils/utils";

const Button = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
  loading = false,
  ...props
}) => {
  const handleClick = safeCall(onClick);
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
      className={`${className} bg-orange-600 
        text-white px-4 py-2 rounded-xl 
        font-medium flex items-center gap-1 
        hover:bg-orange-700 transition-colors 
        shadow-lg shadow-sm cursor-pointer disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};
export default Button;
