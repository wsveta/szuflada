"use client";

import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/types/product";

type FavoritesContentProps = {
  products: Product[];
};

export default function FavoritesContent({ products }: FavoritesContentProps) {
  const { favoriteIds } = useFavorites();
  const { t } = useLanguage();

  const favoriteProducts = products.filter((product) =>
    favoriteIds.includes(product.id)
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {t.favorites.title}
      </h1>

      {favoriteProducts.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-500 dark:text-zinc-400">
          {t.favorites.empty}
        </p>
      )}
    </section>
  );
}