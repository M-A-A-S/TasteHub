import { X } from "lucide-react";

const Modal = ({ show, onClose, title, children, footer, className }) => {
  if (!show) {
    return null;
  }

  const handleClose = (e) => {
    if (typeof onClose === "function") {
      onClose(e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 
    flex items-center justify-center p-4 
    bg-black/50 backdrop-blur-sm animate-fadeIn"
    >
      {/* Modal */}
      <div
        className={`${className} bg-white dark:bg-slate-800 
        rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl`}
      >
        {/* Header */}
        <header
          className="p-6 border-b border-gray-100 
        border-gray-700 flex justify-between items-center"
        >
          <h3 className="text-xl font-medium">{title}</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
             text-gray-400"
          >
            <X />
          </button>
        </header>
        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div
            className="p-6 bg-gray-50 dark:bg-slate-800 
          border-t border-gray-100 border-gray-700
          flex gap-3"
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;
