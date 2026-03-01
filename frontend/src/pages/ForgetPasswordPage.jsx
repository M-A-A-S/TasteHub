import { Loader2 } from "lucide-react";
import { create } from "../api/apiWrapper";
import Input from "../components/UI/Input";
import { useLanguage } from "../hooks/useLanguage";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/UI/Button";
import { showFail, showSuccess } from "../utils/utils";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { translations } = useLanguage();
  const navigate = useNavigate();

  const {
    title,
    subtitle,
    form: { submit_button, back_to_login, email: emailText },
  } = translations.pages.forget_password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPassword();
  };

  async function forgetPassword() {
    try {
      setIsLoading(true);

      const result = await create("auth/forget-password", { email });

      navigate("/verify-code", { state: { email } });

      showSuccess(result?.code);
    } catch (error) {
      console.log("error -> ", error);
      showFail(error?.code);
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
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
        <Input
          label={emailText}
          name="email"
          placeholder={emailText}
          type="email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex items-center justify-between text-sm">
          <Button type="submit">
            {isLoading ? <Loader2 className="animate-spin" /> : submit_button}
          </Button>

          <Link to="/login" className="text-orange-600 hover:underline">
            {back_to_login}
          </Link>
        </div>
      </form>
    </div>
  );
};
export default ForgetPasswordPage;
