"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter, usePathname } from "next/navigation";
import FavoritesLink from "@/components/FavoritesLink";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);

    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setIsMenuOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <header className="border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-gray-900 dark:text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          SZUFLADA
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
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

          <form onSubmit={handleSearchSubmit}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search.placeholder}
              className="
                w-48 rounded-full border border-gray-300
                bg-white px-4 py-2 text-sm text-gray-900
                outline-none transition-colors
                placeholder:text-gray-400
                focus:border-gray-500
                dark:border-zinc-700 dark:bg-zinc-900 dark:text-white
                dark:placeholder:text-zinc-500 dark:focus:border-zinc-400
              "
            />
          </form>

          <FavoritesLink />

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

        <button
          onClick={() => setIsMenuOpen((value) => !value)}
          className="lg:hidden text-gray-900 dark:text-white"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
            <form onSubmit={handleSearchSubmit}>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.search.placeholder}
                className="
                  w-full rounded-full border border-gray-300
                  bg-white px-4 py-3 text-sm text-gray-900
                  outline-none transition-colors
                  placeholder:text-gray-400
                  focus:border-gray-500
                  dark:border-zinc-700 dark:bg-zinc-900 dark:text-white
                  dark:placeholder:text-zinc-500 dark:focus:border-zinc-400
                "
              />
            </form>

            <button
              onClick={() => scrollToSection("catalog")}
              className="text-left text-gray-700 dark:text-zinc-200"
            >
              {t.nav.catalog}
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-gray-700 dark:text-zinc-200"
            >
              {t.nav.about}
            </button>

            <Link
              href="/support"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-zinc-200"
            >
              {t.nav.launch}
            </Link>

            <Link
              href="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-zinc-200"
            >
              ❤️ {t.favorites.nav}
            </Link>

            <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                Language
              </span>

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
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                Theme
              </span>

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
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}