"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { siteText, type Language } from "@/content/siteText";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof siteText.pl;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("pl");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage === "pl" || savedLanguage === "uk") {
      setLanguageState(savedLanguage);
    }

    setIsReady(true);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
  };
if (!isReady) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="h-10 w-10 rounded-full border-2 border-gray-200 border-t-black animate-spin" />
    </div>
  );
}

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: siteText[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}