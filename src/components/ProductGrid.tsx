"use client";

import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductGrid() {
  const { t } = useLanguage();

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-6 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500 mb-2">
            {t.catalog.label}
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.catalog.title}
          </h2>
        </div>

        <button className="text-sm text-gray-500 dark:text-zinc-400">
          {t.catalog.viewAll}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}