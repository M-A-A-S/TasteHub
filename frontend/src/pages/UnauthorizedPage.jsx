import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

const UnauthorizedPage = () => {
  const { translations } = useLanguage();

  const { title, subtitle, back_to_login } = translations.pages.unauthorized;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-orange-500 mb-4">403</h1>
        <h2 className="text-2xl md:text-3xl font-semibold  mb-3">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400  max-w-md mb-6">
          {subtitle}
        </p>
        <Link
          to="/login"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          {back_to_login}
        </Link>
      </div>
    </div>
  );
};
export default UnauthorizedPage;
