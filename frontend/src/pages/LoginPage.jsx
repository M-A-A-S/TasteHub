import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { create, setAuthToken } from "../api/apiWrapper";
import { showFail, showSuccess } from "../utils/utils";

const LoginPage = () => {
  const { translations } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, currentRole } = useAuth();
  const navigate = useNavigate();

  const {
    login_success,
    login_failed,
    form: {
      login_title,
      login_subtitle,
      email: emailText,
      password: passwordText,
      remember_me,
      forgot_password,
      login_button,
      no_account,
      register_title,
    },
  } = translations.pages.login_page;

  function navigateBasedOnRole(role) {
    switch (role) {
      case "cashier":
        navigate("/point-of-sale");
        break;
      case "hr":
        navigate("/hr/employees");
        break;
      case "administrator":
        navigate("/");
        break;
      default:
        navigate("/login");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login();
  };

  async function Login() {
    try {
      setIsLoading(true);

      const result = await create("auth/login", { email, password });

      login(result.data.user, result.data.accessToken);
      setAuthToken(result.data.accessToken.token);
      navigateBasedOnRole(
        result?.data?.user?.roles[0]?.role?.nameEn?.toLowerCase(),
      );

      showSuccess(result?.code, login_success);
    } catch (error) {
      console.log("error -> ", error);
      showFail(error?.code, login_failed);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-sm 
    hover:shadow-md transition border border-transparent p-8 space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{login_title}</h2>
          <p className="text-gray-500 text-sm">{login_subtitle}</p>
        </div>
        <div>
          <Input
            label={emailText}
            name="email"
            placeholder={emailText}
            required={true}
            type="email"
            showLabel={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={passwordText}
            name="password"
            placeholder={passwordText}
            type="password"
            required={true}
            showLabel={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <Link
            to="/forget-password"
            className="text-orange-600 hover:underline"
          >
            {forgot_password}
          </Link>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : login_button}
        </Button>
        {/* <p className="text-center text-sm text-gray-600">
          {no_account}{" "}
          <Link
            to="/register"
            className="text-orange-600 hover:underline font-medium"
          >
            {register_title}
          </Link>
        </p> */}
      </form>
    </div>
  );
};
export default LoginPage;
