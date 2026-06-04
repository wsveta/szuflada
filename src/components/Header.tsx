"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          SZUFLADA
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#catalog" className="text-gray-600 hover:text-black">
            {t.nav.catalog}
          </Link>

          <Link href="/#about" className="text-gray-600 hover:text-black">
            {t.nav.about}
          </Link>

          <Link
            href="/support"
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:text-black hover:bg-gray-50"
          >
            {t.nav.launch}
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setLanguage("pl")}
              className={language === "pl" ? "font-bold text-black" : "text-gray-400"}
            >
              PL
            </button>

            <span className="text-gray-300">/</span>

            <button
              onClick={() => setLanguage("uk")}
              className={language === "uk" ? "font-bold text-black" : "text-gray-400"}
            >
              UA
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}