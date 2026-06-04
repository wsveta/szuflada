"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutProject() {
  const { t } = useLanguage();

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 pb-24">
      <div className="rounded-3xl bg-gray-100 p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
          {t.about.label}
        </p>

        <h2 className="text-3xl font-bold text-gray-900">
          {t.about.title}
        </h2>

        <p className="mt-4 max-w-2xl text-gray-600">
          {t.about.description}
        </p>
      </div>
    </section>
  );
}