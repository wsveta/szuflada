"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const orderCode = searchParams.get("order");

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <div className="rounded-3xl bg-gray-100 p-6 dark:bg-zinc-900 md:p-8">
        <p className="text-4xl dark:text-white">✓</p>

        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          {t.orderSuccess.title}
        </h1>

        {orderCode && (
          <p className="mt-4 text-gray-600 dark:text-zinc-300">
            {t.orderSuccess.orderNumber}: {orderCode}
          </p>
        )}

        <p className="mt-4 text-gray-600 dark:text-zinc-300">
          {t.orderSuccess.description}
        </p>

        <Link
          href="/"
          className="
            mt-8 inline-flex rounded-full
            bg-black px-6 py-3
            text-sm text-white
            transition-all duration-200
            hover:-translate-y-0.5 hover:bg-zinc-800
            dark:bg-white dark:text-black dark:hover:bg-zinc-200
          "
        >
          {t.orderSuccess.backToShop}
        </Link>
      </div>
    </section>
  );
}
