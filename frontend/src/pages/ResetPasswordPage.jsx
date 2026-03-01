import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "../utils/toastHelper";
import { create } from "../api/apiWrapper";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { Loader2 } from "lucide-react";
import { showFail, showSuccess } from "../utils/utils";

const ResetPasswordPage = () => {
  const { translations, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  // if (!token) throw new Error("Token is required to reset password");

  const {
    form: {
      title,
      subtitle,
      submit_button,
      back_to_login,
      input_placeholder_confirm_password,
      input_placeholder_password,
      weak_password,
      passwords_do_not_match,
    },
  } = translations.pages.reset_password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      toast.show(translations.general.form.messages.general_error, "error");
      return;
    }

    await resetPassword();
  };

  async function resetPassword() {
    try {
      setIsLoading(true);

      const result = await create("auth/reset-password", {
        token,
        newPassword: password,
      });

      showSuccess(result?.code);
      navigate(`/login`);
    } catch (error) {
      console.log("error -> ", error);
      showFail(error?.code);
    } finally {
      setIsLoading(false);
    }
  }

  const validateFormData = () => {
    let temp = {};

    if (password.length < 6) {
      temp.password = weak_password;
    }
    if (confirmPassword !== password) {
      temp.confirmPassword = passwords_do_not_match;
    }
    setErrors(temp);
    console.log(temp);
    return Object.keys(temp).length === 0; // true = valid
  };
  const [errors, setErrors] = useState({});
  useEffect(() => {
    // Re-validate form whenever language changes
    if (Object.keys(errors).length > 0) {
      validateFormData();
    }
  }, [language]);

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
          type="password"
          placeholder={input_placeholder_password}
          required
          value={password}
          showLabel={true}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={errors.password}
        />

        <Input
          type="password"
          label={"Confirm Password"}
          placeholder={input_placeholder_confirm_password}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          errorMessage={errors.confirmPassword}
        />

        <div className="flex items-center justify-center text-sm">
          <Button
            disabled={isLoading}
            className="btn btn-primary btn-block"
            type="submit"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : submit_button}
          </Button>
        </div>

        <div className="flex items-center justify-center">
          <Link to="/login" className="text-orange-600 hover:underline">
            {back_to_login}
          </Link>
        </div>
      </form>
    </div>
  );
};
export default ResetPasswordPage;
