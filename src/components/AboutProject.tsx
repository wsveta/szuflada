"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutProject() {
  const { t } = useLanguage();

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 mb-24">
      <div className="rounded-3xl bg-gray-100 dark:bg-zinc-900 p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500 mb-4">
          {t.about.label}
        </p>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.about.title}
        </h2>

        <p className="mt-4 max-w-2xl text-gray-600 dark:text-zinc-300">
          {t.about.description}
        </p>
      </div>
    </section>
  );
}