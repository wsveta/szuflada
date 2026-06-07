"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const orderId = searchParams.get("order");

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6 md:p-8">
        <p className="text-4xl dark:text-white">✓</p>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {t.orderSuccess.title}
        </h1>

        {orderId && (
          <p className="mt-4 text-gray-600 dark:text-zinc-300">
            {t.orderSuccess.orderNumber}: #{orderId}
          </p>
        )}

        <p className="mt-4 text-gray-600 dark:text-zinc-300">
          {t.orderSuccess.description}
        </p>

        <Link
  href="/"
  className="
    mt-8 inline-flex rounded-full
    bg-black text-white
    dark:bg-white dark:text-black
    px-6 py-3 text-sm

    transition-all duration-200

    hover:bg-zinc-800
    dark:hover:bg-zinc-200

    hover:-translate-y-0.5
  "
>
  {t.orderSuccess.backToShop}
</Link>
      </div>
    </section>
  );
}