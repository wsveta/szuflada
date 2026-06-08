"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";
import { useLanguage } from "@/context/LanguageContext";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { language, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productName = product.name[language];
  const images = product.images.filter(Boolean);
  const activeImage = images[activeImageIndex];

  const hasMultipleImages = images.length > 1;

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
    <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100 dark:bg-zinc-800">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={productName}
              fill
              unoptimized={activeImage.startsWith("https://")}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400 dark:text-zinc-500">
              No image
            </div>
          )}

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={handlePreviousImage}
                className="
                  absolute left-4 top-1/2 -translate-y-1/2
                  flex h-10 w-10 items-center justify-center
                  rounded-full bg-white/80 text-gray-900
                  shadow-sm backdrop-blur
                  transition hover:bg-white
                "
                aria-label="Previous image"
              >
                ←
              </button>

              <button
                type="button"
                onClick={handleNextImage}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  flex h-10 w-10 items-center justify-center
                  rounded-full bg-white/80 text-gray-900
                  shadow-sm backdrop-blur
                  transition hover:bg-white
                "
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {images.map((imageUrl, index) => (
              <button
                key={`${imageUrl}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`
                  relative aspect-square overflow-hidden rounded-2xl border
                  transition
                  ${
                    activeImageIndex === index
                      ? "border-gray-900 dark:border-white"
                      : "border-gray-200 dark:border-zinc-700"
                  }
                `}
                aria-label={`Show image ${index + 1}`}
              >
                <Image
                  src={imageUrl}
                  alt={`${productName} ${index + 1}`}
                  fill
                  unoptimized
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {productName}
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
    </div>
  );
}
