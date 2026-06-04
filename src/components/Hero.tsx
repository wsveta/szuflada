"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            {t.hero.label}
          </p>

          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight whitespace-pre-line">
            {t.hero.title}
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-md">
            {t.hero.description}
          </p>

          <div className="mt-8 flex gap-4">
            <a href="#catalog" className="px-6 py-3 bg-black text-white rounded-full">
              {t.hero.catalogButton}
            </a>

            <a href="#about" className="px-6 py-3 border border-gray-300 text-gray-500 rounded-full">
              {t.hero.aboutButton}
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/hero/hero-image.jpeg"
            alt="Szuflada hero image"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}