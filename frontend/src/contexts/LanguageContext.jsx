import { createContext, useEffect, useState } from "react";
import { translationsFiles } from "../locales/index.js";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("tastehub-language") || "en";
  });

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr",
    );
    localStorage.setItem("tastehub-language", language);
  }, [language]);

  const translations =
    language === "en" ? translationsFiles.en : translationsFiles.ar;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, translations, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
