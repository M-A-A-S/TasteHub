import { toast } from "./toastHelper";
import { translationsFiles } from "../locales/index.js";
import { ADDITION_REASONS, DEDUCTION_REASONS } from "./constants.jsx";

export const safeCall = (callback) => {
  return (...args) => {
    if (typeof callback === "function") {
      callback(...args);
    }
  };
};

const getTranslations = () => {
  const language = localStorage.getItem("tastehub-language") || "en";
  return language === "en" ? translationsFiles.en : translationsFiles.ar;
};

export const formatMoney = (value, language = "en") => {
  const number = Number(value || 0);

  return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatTime = (time) =>
  time && time.length === 5 ? `${time}:00` : time;

export const formatNumber = (value) =>
  new Intl.NumberFormat("en-US").format(value);

export const formatDateTime = (date) => new Date(date).toLocaleString();

export const formatDate = (isoString, language = "en") => {
  const d = new Date(isoString);
  return d.toLocaleString(language === "en" ? "en-US" : "ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function showSuccess(serverCode = "", frontMessage = "") {
  const translations = getTranslations();

  const message =
    (serverCode && translations?.server_codes?.[serverCode]) ||
    frontMessage ||
    translations.common.success ||
    "Operation successful!";

  toast.success(message);
}

export function showFail(serverCode = "", frontMessage = "") {
  const translations = getTranslations();

  console.log("serverCode -> ", serverCode);
  console.log("translations -> ", translations);

  const message =
    (serverCode && translations?.server_codes?.[serverCode]) ||
    frontMessage ||
    translations.common.fail ||
    "Operation failed!";

  toast.error(message);
}

export const isAdditionReason = (reason) => ADDITION_REASONS.includes(reason);

export const isDeductionReason = (reason) => DEDUCTION_REASONS.includes(reason);
