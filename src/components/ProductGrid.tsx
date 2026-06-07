"use client";

import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const { t } = useLanguage();

  return (
    <section
      id="catalog"
      className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500 mb-2">
            {t.catalog.label}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t.catalog.title}
          </h2>
        </div>

        <a
          href="/search"
          className="text-left sm:text-right text-sm text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
        >
          {t.catalog.viewAll}
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}