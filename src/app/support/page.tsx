"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import DemoBanner from "@/components/DemoBanner";

export default function SupportPage() {
  const { t } = useLanguage();

  return (
      <>
           <DemoBanner/>
      <Header />

     <main className="min-h-screen bg-white dark:bg-zinc-950">
        <section className="max-w-3xl mx-auto px-6 py-20">
          <Link href="/" className="text-sm text-gray-500 hover:text-black">
            {t.support.back}
          </Link>

          <p className="mt-6 text-gray-600 dark:text-zinc-300">
            {t.support.label}
          </p>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t.support.title}
          </h1>

          <p className="mt-6 text-gray-600 dark:text-zinc-300">
            {t.support.description}
          </p>

          <div className="mt-10 space-y-4 text-gray-500">
            {t.support.steps.map((step) => (
              <p key={step}>{step}</p>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t.support.fundsTitle}
            </h2>

            <ul className="mt-4 space-y-2 text-gray-600">
              {t.support.funds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <Link
            href="https://4fund.com/449vkn"
            className="mt-8 inline-flex rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3"
          >
            {t.support.button}
          </Link>
        </section>
      <Footer />
      </main>

    </>
  );
}