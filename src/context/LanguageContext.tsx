"use client";

import { createContext, useContext, useState } from "react";
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
  const [language, setLanguage] = useState<Language>("pl");

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