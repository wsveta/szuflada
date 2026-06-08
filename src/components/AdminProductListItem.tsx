"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type AdminProductListItemProps = {
  product: Product;
  onAvailabilityChange: (productId: string, isAvailable: boolean) => void;
  onDelete: (productId: string) => void;
};

export default function AdminProductListItem({
  product,
  onAvailabilityChange,
  onDelete,
}: AdminProductListItemProps) {
  const mainImage = product.images.find(Boolean);

  return (
    <div
      className="
        rounded-3xl
        border border-gray-200
        bg-white
        p-5
        dark:border-zinc-700
        dark:bg-zinc-900
      "
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name.pl}
              fill
              unoptimized
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400 dark:text-zinc-500">
              No image
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-white">
            {product.name.pl}
          </p>

          <p className="mt-1 text-xs font-medium text-gray-500 dark:text-zinc-400">
            SKU:{" "}
            <span className="text-gray-700 dark:text-zinc-300">
              {product.sku || "—"}
            </span>
          </p>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-zinc-400">
            <span>{product.price.toFixed(2)} zł</span>
            <span>Stock: {product.stock}</span>
            <span>Category: {product.category}</span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="mt-2 inline-block text-sm text-gray-500 underline hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Open product page
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={product.isAvailable}
                onChange={(event) =>
                  onAvailabilityChange(product.id, event.target.checked)
                }
              />
              Available
            </label>

            <button
              type="button"
              onClick={() => onDelete(product.id)}
              className="
                rounded-full
                bg-red-600 px-4 py-2
                text-sm text-white
                hover:bg-red-700
              "
            >
              Delete
            </button>

            <Link
              href={`/admin/products/${product.slug}`}
              className="
                rounded-full
                border border-gray-300
                px-4 py-2 text-sm
                text-gray-700
                hover:bg-gray-100
                dark:border-zinc-700
                dark:text-zinc-200
                dark:hover:bg-zinc-800
              "
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
