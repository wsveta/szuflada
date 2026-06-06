"use client";

import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";
import { useLanguage } from "@/context/LanguageContext";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { language, t } = useLanguage();

  return (
      <div>
          
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{product.name[language]}</h1>

      <p className="mt-4 text-2xl text-gray-900 dark:text-white">{product.price.toFixed(2)} zł</p>

      <p className="mt-6 text-gray-600 dark:text-zinc-300">{product.description[language]}</p>

      <div className="mt-4 max-w-xs">
        <AddToCartButton />
      </div>
    </div>
  );
}