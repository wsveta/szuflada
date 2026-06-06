"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const router = useRouter();
const pathname = usePathname();

const scrollToSection = (id: string) => {
  if (pathname !== "/") {
    router.push(`/#${id}`);
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

  return (
    <header className="border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-gray-900 dark:text-white"
        >
          SZUFLADA
        </Link>

        <nav className="hidden md:flex items-center gap-8">
   <button
  onClick={() => scrollToSection("catalog")}
  className="text-gray-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
>
  {t.nav.catalog}
</button>

<button
  onClick={() => scrollToSection("about")}
  className="text-gray-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
>
  {t.nav.about}
</button>

          <Link
            href="/support"
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:text-black hover:bg-gray-50 dark:border-zinc-300 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
          >
            {t.nav.launch}
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setLanguage("pl")}
              className={
                language === "pl"
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-400 dark:text-zinc-500"
              }
            >
              PL
            </button>

            <span className="text-gray-300 dark:text-zinc-700">/</span>

            <button
              onClick={() => setLanguage("uk")}
              className={
                language === "uk"
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-400 dark:text-zinc-500"
              }
            >
              UA
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setTheme("light")}
              className={
                theme === "light"
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-400 dark:text-zinc-500"
              }
            >
              Light
            </button>

            <span className="text-gray-300 dark:text-zinc-700">/</span>

            <button
              onClick={() => setTheme("dark")}
              className={
                theme === "dark"
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-400 dark:text-zinc-500"
              }
            >
              Dark
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}