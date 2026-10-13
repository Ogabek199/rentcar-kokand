import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SUPPORTED_LANGUAGES, translations } from "./translations";

const STORAGE_KEY = "app_language";
const FALLBACK_LANG = "uz";

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem(STORAGE_KEY);
  if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }
  return FALLBACK_LANG;
};

const getValueByPath = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);

const LanguageContext = createContext({
  language: FALLBACK_LANG,
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLanguage) => {
    if (!SUPPORTED_LANGUAGES.includes(newLanguage)) return;
    setLanguageState(newLanguage);
    localStorage.setItem(STORAGE_KEY, newLanguage);
    document.documentElement.lang = newLanguage;
  };

  const t = useCallback(
    (key) => {
      const langPack = translations[language] || translations[FALLBACK_LANG];
      return getValueByPath(langPack, key) || key;
    },
    [language]
  );

  const value = {
    language,
    setLanguage,
    t,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
