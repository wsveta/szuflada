"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";


export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        overflow-hidden
        transition-all duration-2000
        ${
          isVisible
            ? "max-h-20 opacity-100"
            : "max-h-0 opacity-0"
        }
      `}
    >
      <div className="bg-black text-white text-center text-sm py-2 dark:bg-white dark:text-black">
  {t.demoBanner.text}
</div>
    </div>
  );
}