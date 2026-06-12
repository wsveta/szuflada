"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabase";
import FavoritesLink from "@/components/FavoritesLink";
import CartLink from "./CartLink";

function PortraitIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 20a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4V2.5M12 21.5V20M4 12H2.5M21.5 12H20M6.34 6.34 5.28 5.28M18.72 18.72l-1.06-1.06M17.66 6.34l1.06-1.06M5.28 18.72l1.06-1.06"
      />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"
      />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const pathname = usePathname();

  const nextLanguage = language === "pl" ? "uk" : "pl";
  const nextLanguageLabel = language === "pl" ? "UA" : "PL";
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (isMounted) {
        setUserEmail(user?.email ?? null);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLanguageToggle = () => {
    setLanguage(nextLanguage);
  };

  const handleThemeToggle = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setUserEmail(null);
    setIsMenuOpen(false);

    router.push("/");
    router.refresh();
  };

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
    <header className="border-b border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-gray-900 dark:text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          SZUFLADA
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/search"
            className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black  dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
          >
            {t.nav.catalog}
          </Link>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="text-gray-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            {t.nav.about}
          </button>

          <Link
            href="/support"
            className="rounded-full border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black dark:border-zinc-300 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
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
          <CartLink />

          <button
            type="button"
            onClick={handleLanguageToggle}
            className="
              rounded-full border border-gray-300
              px-3 py-2 text-sm font-semibold
              text-gray-700 hover:bg-gray-50 hover:text-black
              dark:border-zinc-700 dark:text-zinc-200
              dark:hover:bg-zinc-900 dark:hover:text-white
            "
            aria-label={t.header.language}
          >
            {nextLanguageLabel}
          </button>

          <button
            type="button"
            onClick={handleThemeToggle}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full border border-gray-300
              text-gray-700 hover:bg-gray-50 hover:text-black
              dark:border-zinc-700 dark:text-zinc-200
              dark:hover:bg-zinc-900 dark:hover:text-white
            "
            aria-label={
              isDarkTheme ? t.header.switchToLight : t.header.switchToDark
            }
          >
            {isDarkTheme ? <SunIcon /> : <MoonIcon />}
          </button>

          {userEmail ? (
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full border border-gray-300
                  text-gray-700 hover:bg-gray-50 hover:text-black
                  dark:border-zinc-700 dark:text-zinc-200
                  dark:hover:bg-zinc-900 dark:hover:text-white
                "
                aria-label={t.header.account}
                title={t.header.account}
              >
                <PortraitIcon />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm text-gray-500 underline hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                {t.header.logout}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-sm">
              <Link
                href="/login"
                className="text-gray-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
              >
                {t.header.login}
              </Link>

              <Link
                href="/register"
                className="
                  rounded-full bg-black px-4 py-2
                  text-white hover:bg-zinc-800
                  dark:bg-white dark:text-black dark:hover:bg-zinc-200
                "
              >
                {t.header.register}
              </Link>
            </div>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="text-gray-900 dark:text-white lg:hidden"
          aria-label={isMenuOpen ? t.header.close : t.header.menu}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6">
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

            <Link
            href="/search"
              className="text-left text-gray-700 dark:text-zinc-200"
            >
              {t.nav.catalog}
            </Link>

            <button
              type="button"
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

            <Link
              href="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-zinc-200"
            >
              🛒 {t.cart.nav}
            </Link>

            <div className="border-t border-gray-200 pt-4 dark:border-zinc-800">
              {userEmail ? (
                <div className="flex flex-col gap-4">
                  <Link
                    href="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-700 dark:text-zinc-200"
                  >
                    <span
                      className="
                        flex h-9 w-9 items-center justify-center
                        rounded-full border border-gray-300
                        dark:border-zinc-700
                      "
                    >
                      <PortraitIcon />
                    </span>
                    {t.header.account}
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left text-gray-700 dark:text-zinc-200"
                  >
                    {t.header.logout}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 dark:text-zinc-200"
                  >
                    {t.header.login}
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 dark:text-zinc-200"
                  >
                    {t.header.register}
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-zinc-800">
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                {t.header.language}
              </span>

              <button
                type="button"
                onClick={handleLanguageToggle}
                className="
                  rounded-full border border-gray-300
                  px-3 py-2 text-sm font-semibold
                  text-gray-700 dark:border-zinc-700 dark:text-zinc-200
                "
              >
                {nextLanguageLabel}
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-zinc-800">
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                {t.header.theme}
              </span>

              <button
                type="button"
                onClick={handleThemeToggle}
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full border border-gray-300
                  text-gray-700
                  dark:border-zinc-700 dark:text-zinc-200
                "
                aria-label={
                  isDarkTheme ? t.header.switchToLight : t.header.switchToDark
                }
              >
                {isDarkTheme ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
