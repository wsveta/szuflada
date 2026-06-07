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
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {product.name[language]}
      </h1>

      <p className="mt-4 text-xl md:text-2xl text-gray-900 dark:text-white">
        {product.price.toFixed(2)} zł
      </p>

      <p className="mt-6 text-gray-600 dark:text-zinc-300">
        {product.description[language]}
      </p>

      <p
        className={`mt-4 text-sm ${
          product.isAvailable
            ? "text-green-700 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {product.isAvailable
          ? `${t.product.stockCount}: ${product.stock}`
          : t.product.outOfStock}
      </p>

      <div className="mt-6 w-full sm:max-w-xs">
       <AddToCartButton
  productId={product.id}
  stock={product.stock}
  disabled={!product.isAvailable}
/>
      </div>
    </div>
  );
}