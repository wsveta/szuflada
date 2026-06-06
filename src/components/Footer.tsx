"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">SZUFLADA</h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link href="/#catalog" className="text-gray-600 hover:text-black dark:text-zinc-300 dark:hover:text-white">
              {t.nav.catalog}
            </Link>

            <Link href="/#about" className="text-gray-600 hover:text-black dark:text-zinc-300 dark:hover:text-white">
              {t.nav.about}
            </Link>

            <Link href="/support" className="text-gray-600 hover:text-black dark:text-zinc-300 dark:hover:text-white">
              {t.nav.launch}
            </Link>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 dark:text-zinc-500">© 2026 SZUFLADA</p>
        </div>
      </div>
    </footer>
  );
}