"use client";

import { useCallback, useState } from "react";
import { deleteProduct, updateProductAvailability } from "@/lib/products";
import type { Category } from "@/lib/categories";
import type { Product } from "@/types/product";
import AdminCreateProductForm from "./AdminCreateProductForm";
import AdminProductListItem from "./AdminProductListItem";
import Toast from "@/components/Toast";

type AdminProductsContentProps = {
  products: Product[];
  categories: Category[];
};

type AvailabilityFilter = "all" | "available" | "unavailable";

type ToastState = {
  type: "success" | "error";
  title: string;
  message?: string;
};

export default function AdminProductsContent({
  products,
  categories,
}: AdminProductsContentProps) {
  const [items, setItems] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>("all");
  const [toast, setToast] = useState<ToastState | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const showErrorToast = (title: string, error: unknown) => {
    setToast({
      type: "error",
      title,
      message: error instanceof Error ? error.message : "Unknown error.",
    });
  };

  const filteredItems = items.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      product.name.pl.toLowerCase().includes(query) ||
      product.name.uk.toLowerCase().includes(query) ||
      product.slug.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && product.isAvailable) ||
      (availabilityFilter === "unavailable" && !product.isAvailable);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleAvailabilityChange = async (
    productId: string,
    isAvailable: boolean,
  ) => {
    const previousItems = items;

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

    try {
      await updateProductAvailability(productId, isAvailable);
    } catch (error) {
      setItems(previousItems);
      showErrorToast("Availability update failed.", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const productToDelete = items.find((product) => product.id === productId);

    if (!productToDelete) {
      setToast({
        type: "error",
        title: "Product deletion failed.",
        message: "Product not found.",
      });
      return;
    }

    const confirmed = window.confirm(
      `Delete product "${productToDelete.name.pl}"?`,
    );

    if (!confirmed) return;

    const previousItems = items;

    setItems((currentItems) =>
      currentItems.filter((product) => product.id !== productId),
    );

    try {
      await deleteProduct(productId);

      setToast({
        type: "success",
        title: `Product "${productToDelete.name.pl}" deleted successfully.`,
      });
    } catch (error) {
      setItems(previousItems);
      showErrorToast("Product deletion failed.", error);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setAvailabilityFilter("all");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {toast && (
        <Toast type={toast.type} title={toast.title} onClose={closeToast}>
          {toast.message && <p>{toast.message}</p>}
        </Toast>
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Products
      </h1>

      <AdminCreateProductForm
        categories={categories}
        onProductCreated={(product) => {
          setItems((currentItems) => [product, ...currentItems]);
        }}
      />

      <div className="mt-8 rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name or slug"
            className="
              w-full rounded-full
              border border-gray-300
              dark:border-zinc-700
              bg-white dark:bg-zinc-950
              px-4 py-3 text-sm
              text-gray-900 dark:text-white
            "
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="
              w-full rounded-full
              border border-gray-300
              dark:border-zinc-700
              bg-white dark:bg-zinc-950
              px-4 py-3 text-sm
              text-gray-900 dark:text-white
            "
          >
            <option value="all">All categories</option>

            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name_pl}
              </option>
            ))}
          </select>

          <select
            value={availabilityFilter}
            onChange={(event) =>
              setAvailabilityFilter(event.target.value as AvailabilityFilter)
            }
            className="
              w-full rounded-full
              border border-gray-300
              dark:border-zinc-700
              bg-white dark:bg-zinc-950
              px-4 py-3 text-sm
              text-gray-900 dark:text-white
            "
          >
            <option value="all">All products</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <button
            type="button"
            onClick={handleResetFilters}
            className="
              rounded-full
              border border-gray-300
              dark:border-zinc-700
              px-4 py-3 text-sm
              text-gray-700 dark:text-zinc-200
              hover:bg-gray-100
              dark:hover:bg-zinc-800
            "
          >
            Reset filters
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-zinc-400">
          Showing {filteredItems.length} of {items.length} products
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <AdminProductListItem
              key={product.id}
              product={product}
              onAvailabilityChange={handleAvailabilityChange}
              onDelete={handleDeleteProduct}
            />
          ))
        ) : (
          <p className="rounded-3xl border border-dashed border-gray-300 dark:border-zinc-700 px-5 py-8 text-sm text-gray-500 dark:text-zinc-400">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
