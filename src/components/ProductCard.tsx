"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";

type ProductCardProps = {
  product: Product;
  isAboveTheFold?: boolean;
};

export default function ProductCard({
  product,
  isAboveTheFold = false,
}: ProductCardProps) {
  const { language, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productName = product.name[language];
  const images = product.images.filter(Boolean);
  const activeImage = images[activeImageIndex];
  const hasMultipleImages = images.length > 1;

  const isRemoteImage = activeImage?.startsWith("https://");

  const handlePreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full"
          aria-label={productName}
        >
          {activeImage ? (
            <Image
              src={activeImage}
              alt={productName}
              fill
              unoptimized={isRemoteImage}
              loading={isAboveTheFold ? "eager" : "lazy"}
              fetchPriority={isAboveTheFold ? "high" : "auto"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400 dark:text-zinc-500">
              No image
            </div>
          )}
        </Link>

        <div className="absolute right-3 top-3 z-10">
          <FavoriteButton productId={product.id} />
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePreviousImage}
              className="
                absolute left-3 top-1/2 z-10
                flex h-8 w-8 -translate-y-1/2
                items-center justify-center rounded-full
                bg-white/80 text-gray-900
                shadow-sm backdrop-blur
                hover:bg-white
              "
              aria-label="Previous image"
            >
              ←
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              className="
                absolute right-3 top-1/2 z-10
                flex h-8 w-8 -translate-y-1/2
                items-center justify-center rounded-full
                bg-white/80 text-gray-900
                shadow-sm backdrop-blur
                hover:bg-white
              "
              aria-label="Next image"
            >
              →
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    activeImageIndex === index
                      ? "w-5 bg-white"
                      : "w-2 bg-white/60"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-gray-900 transition hover:text-gray-600 dark:text-white dark:hover:text-zinc-300">
            {productName}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
          {product.price.toFixed(2)} zł
        </p>

        <p
          className={`mt-2 text-xs ${
            product.isAvailable
              ? "text-green-700 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {product.isAvailable
            ? `${t.product.stockCount}: ${product.stock}`
            : t.product.outOfStock}
        </p>

        <div className="mt-4">
          <AddToCartButton
            productId={product.id}
            stock={product.stock}
            disabled={!product.isAvailable}
          />
        </div>
      </div>
    </article>
  );
}
