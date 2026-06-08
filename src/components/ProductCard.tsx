"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productName = language === "pl" ? product.name.pl : product.name.uk;

  const images = product.images.filter(Boolean);
  const activeImage = images[activeImageIndex];

  const hasMultipleImages = images.length > 1;

  const handlePreviousImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setActiveImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const handleNextImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setActiveImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <article className="group rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100 dark:bg-zinc-800 overflow-hidden">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={productName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                  absolute left-3 top-1/2 -translate-y-1/2
                  flex h-8 w-8 items-center justify-center
                  rounded-full bg-white/80 text-gray-900
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
                  absolute right-3 top-1/2 -translate-y-1/2
                  flex h-8 w-8 items-center justify-center
                  rounded-full bg-white/80 text-gray-900
                  shadow-sm backdrop-blur
                  hover:bg-white
                "
                aria-label="Next image"
              >
                →
              </button>

              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveImageIndex(index);
                    }}
                    className={`
                      h-2 rounded-full transition-all
                      ${
                        activeImageIndex === index
                          ? "w-5 bg-white"
                          : "w-2 bg-white/60"
                      }
                    `}
                    aria-label={`Show image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {productName}
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            {product.price.toFixed(2)} zł
          </p>
        </div>
      </Link>
    </article>
  );
}
