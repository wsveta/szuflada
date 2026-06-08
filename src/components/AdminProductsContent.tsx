"use client";

import { useState } from "react";
import Link from "next/link";
import {
  deleteProduct,
  updateProductAvailability,
  updateProductPrice,
  updateProductStock,
} from "@/lib/products";
import type { Category } from "@/lib/categories";
import type { Product } from "@/types/product";
import AdminCreateProductForm from "./AdminCreateProductForm";

type AdminProductsContentProps = {
  products: Product[];
  categories: Category[];
};

export default function AdminProductsContent({
  products,
  categories,
}: AdminProductsContentProps) {
  const [items, setItems] = useState(products);

  const handleStockChange = async (productId: string, stock: number) => {
    const safeStock = Math.max(0, stock);

    setItems((currentItems) =>
      currentItems.map((product) =>
        product.id === productId
          ? {
              ...product,
              stock: safeStock,
              isAvailable: safeStock > 0,
            }
          : product,
      ),
    );

    await updateProductStock(productId, safeStock);
  };

  const handlePriceChange = async (productId: string, price: number) => {
    const safePrice = Math.max(0, price);

    setItems((currentItems) =>
      currentItems.map((product) =>
        product.id === productId
          ? {
              ...product,
              price: safePrice,
            }
          : product,
      ),
    );

    await updateProductPrice(productId, safePrice);
  };

  const handleAvailabilityChange = async (
    productId: string,
    isAvailable: boolean,
  ) => {
    setItems((currentItems) =>
      currentItems.map((product) =>
        product.id === productId
          ? {
              ...product,
              isAvailable,
            }
          : product,
      ),
    );

    await updateProductAvailability(productId, isAvailable);
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirmed = window.confirm("Delete this product?");

    if (!confirmed) return;

    setItems((currentItems) =>
      currentItems.filter((product) => product.id !== productId),
    );

    await deleteProduct(productId);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Products
      </h1>
      <AdminCreateProductForm
        categories={categories}
        onProductCreated={(product) => {
          setItems((currentItems) => [product, ...currentItems]);
        }}
      />

      <div className="mt-8 space-y-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="
              rounded-3xl
              border border-gray-200
              dark:border-zinc-700
              bg-white
              dark:bg-zinc-900
              p-5
            "
          >
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {product.name.pl}
                </p>

                <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                  ID: {product.id}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={product.price}
                  onChange={(event) =>
                    handlePriceChange(product.id, Number(event.target.value))
                  }
                  className="
                    w-28 rounded-full
                    border border-gray-300
                    dark:border-zinc-700
                    bg-white dark:bg-zinc-950
                    px-4 py-2 text-sm
                    text-gray-900 dark:text-white
                  "
                />

                <input
                  type="number"
                  min={0}
                  value={product.stock}
                  onChange={(event) =>
                    handleStockChange(product.id, Number(event.target.value))
                  }
                  className="
                    w-28 rounded-full
                    border border-gray-300
                    dark:border-zinc-700
                    bg-white dark:bg-zinc-950
                    px-4 py-2 text-sm
                    text-gray-900 dark:text-white
                  "
                />

                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={product.isAvailable}
                    onChange={(event) =>
                      handleAvailabilityChange(product.id, event.target.checked)
                    }
                  />
                  Available
                </label>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="
                    rounded-full
                    px-4 py-2 text-sm
                    bg-red-600 text-white
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
    dark:border-zinc-700
    px-4 py-2 text-sm
    text-gray-700 dark:text-zinc-200
    hover:bg-gray-100
    dark:hover:bg-zinc-800
  "
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
