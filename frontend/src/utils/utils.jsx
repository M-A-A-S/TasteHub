import { toast } from "./toastHelper";
import { translationsFiles } from "../locales/index.js";

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

export function showSuccess(serverCode = "", frontMessage = "") {
  const translations = getTranslations();

  const message =
    (serverCode && translations?.server_messages?.[serverCode]) ||
    frontMessage ||
    translations.common.success ||
    "Operation successful!";

  toast.success(message);
}

export function showFail(serverCode = "", frontMessage = "") {
  const translations = getTranslations();

  const message =
    (serverCode && translations?.server_messages?.[serverCode]) ||
    frontMessage ||
    translations.common.fail ||
    "Operation failed!";

  toast.error(message);
}
