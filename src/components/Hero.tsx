"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative overflow-hidden rounded-[40px] min-h-[650px]">
        <Image
          src="/hero/hi.jpeg"
          alt="Szuflada hero image"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent" />

        <div className="relative z-10 max-w-xl p-10 md:p-16">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight whitespace-pre-line">
            {t.hero.title}
          </h1>

          <p className="mt-6 text-lg text-gray-700 dark:text-zinc-300">
            {t.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#catalog"
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full"
            >
              {t.hero.catalogButton}
            </a>

            <a
              href="#about"
              className="px-6 py-3 border border-gray-300 dark:border-zinc-400 text-gray-900 dark:text-white rounded-full"
            >
              {t.hero.aboutButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}