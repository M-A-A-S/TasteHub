import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { create } from "../api/apiWrapper";
import { toast } from "../utils/toastHelper";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { Loader2 } from "lucide-react";
import { showFail, showSuccess } from "../utils/utils";
import { ConfirmationPurpose } from "../utils/constants";

const VerifyCodePage = () => {
  const { translations } = useLanguage();
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const {
    title,
    message_prefix,
    message_suffix,
    back_to_login,
    form: { input_placeholder, submit_button, resend_code },
  } = translations.pages.verify_code;

  const handleCodeChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setCode(e.target.value);
    }
  };
  const maskedEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    if (user.length <= 2) return `**@${domain}`;
    const visible = user.slice(0, 2);
    return `${visible}****@${domain}`;
  };
  const location = useLocation();
  const email = location.state?.email || "";
  if (!email)
    throw new Error(
      "Email is required to display VerifyCodePage. Please navigate here from the appropriate flow.",
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyCode();
  };
  const handleResend = async () => {
    await resendCode();
  };

  async function verifyCode() {
    try {
      setIsVerifying(true);

      const result = await create("auth/verify-code", { code });

      if (result.data.purpose == ConfirmationPurpose.verifyEmail) {
        navigate(`/confirm-account?token=${result.data.token}`);
      } else if (result.data.purpose == ConfirmationPurpose.resetPassword) {
        navigate(`/reset-password?token=${result.data.token}`);
      } else {
        throw new Error("Unknown verification purpose.");
      }

      showSuccess(result?.code);
    } catch (error) {
      console.log("error -> ", error);
      showFail(error?.code);
    } finally {
      setIsVerifying(false);
    }
  }

  async function resendCode() {
    try {
      setIsResending(true);

      const result = await create("auth/resend-code", { email });
      showSuccess(result?.code);
    } catch (error) {
      console.log("error -> ", error);
      showFail(error?.code);
    } finally {
      setIsResending(false);
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
          <p className="text-gray-500 text-sm">
            {message_prefix} <strong>{maskedEmail(email)}</strong>.{" "}
            {message_suffix}
          </p>
        </div>

        <div>
          <Input
            type="text"
            label="Verification Code"
            name="code"
            placeholder={input_placeholder}
            showLabel={true}
            maxLength={4}
            minLength={4}
            value={code}
            onChange={handleCodeChange}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <Button
            disabled={isVerifying || isResending}
            className="btn btn-primary btn-block"
            type="submit"
          >
            {isVerifying ? <Loader2 className="animate-spin" /> : submit_button}
          </Button>
          <Button
            disabled={isResending || isVerifying}
            className=" btn btn-primary-outline "
            onClick={handleResend}
          >
            {isResending ? <Loader2 className="animate-spin" /> : resend_code}
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
export default VerifyCodePage;
