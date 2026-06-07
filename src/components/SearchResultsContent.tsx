"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/types/product";

type SearchResultsContentProps = {
  query: string;
  selectedCategory: string;
  products: Product[];
};

export default function SearchResultsContent({
  query,
  selectedCategory,
  products,
}: SearchResultsContentProps) {
  const { t } = useLanguage();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      if (searchValue.trim()) {
        params.set("q", searchValue.trim());
      }

      if (selectedCategory !== "all") {
        params.set("category", selectedCategory);
      }

      const queryString = params.toString();

      router.replace(queryString ? `/search?${queryString}` : "/search");
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, selectedCategory, router]);

  const categories = [
    { id: "all", label: t.categories.all },
    { id: "bags", label: t.categories.bags },
    { id: "notepads", label: t.categories.notepads },
    { id: "kitchen", label: t.categories.kitchen },
  ];

  const getCategoryHref = (categoryId: string) => {
    const params = new URLSearchParams();

    if (searchValue.trim()) {
      params.set("q", searchValue.trim());
    }

    if (categoryId !== "all") {
      params.set("category", categoryId);
    }

    const queryString = params.toString();

    return queryString ? `/search?${queryString}` : "/search";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {t.search.title}
      </h1>

      <div className="mt-6 max-w-md">
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder={t.search.placeholder}
          className="
            w-full rounded-full border border-gray-300
            bg-white px-4 py-3 text-sm text-gray-900
            outline-none transition-colors
            placeholder:text-gray-400
            focus:border-gray-500
            dark:border-zinc-700 dark:bg-zinc-900 dark:text-white
            dark:placeholder:text-zinc-500 dark:focus:border-zinc-400
          "
        />
      </div>

      <p className="mt-3 text-gray-500 dark:text-zinc-400">
        {query ? `${t.search.query}: ${query}` : t.search.enterQuery}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={getCategoryHref(category.id)}
            className={`rounded-full px-4 py-2 text-sm border transition-colors ${
              selectedCategory === category.id
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            }`}
          >
            {category.label}
          </Link>
        ))}
      </div>

      {products.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {products.length === 0 && (
        <p className="mt-10 text-gray-500 dark:text-zinc-400">
          {t.search.empty}
        </p>
      )}
    </section>
  );
}