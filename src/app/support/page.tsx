"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PageShell from "@/components/PageShell";

export default function SupportPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageShell>
        {" "}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            {t.support.back}
          </Link>

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500 mb-4">
            {t.support.label}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t.support.title}
          </h1>

          <p className="mt-6 text-gray-600 dark:text-zinc-300">
            {t.support.description}
          </p>

          <div className="mt-10 space-y-4 text-gray-500 dark:text-zinc-400">
            {t.support.steps.map((step) => (
              <p key={step}>{step}</p>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-gray-100 dark:bg-zinc-900 p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {t.support.fundsTitle}
            </h2>

            <ul className="mt-4 space-y-2 text-gray-600 dark:text-zinc-300">
              {t.support.funds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <Link
            href="https://4fund.com/449vkn"
            className="
              mt-8 inline-flex rounded-full
              bg-black text-white
              dark:bg-white dark:text-black
              px-6 py-3
              transition-all duration-200
              hover:bg-zinc-800
              dark:hover:bg-zinc-200
              hover:-translate-y-0.5
            "
          >
            {t.support.button}
          </Link>
        </section>
      </PageShell>
    </>
  );
}