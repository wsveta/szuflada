"use client";

import { useEffect, useState } from "react";

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false);

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
        🛍️ Магазин перебуває на етапі підготовки до запуску. Це демонстраційна версія.
      </div>
    </div>
  );
}