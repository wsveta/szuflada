"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

type SortOption =
  | "default"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "stock-asc"
  | "stock-desc"
  | "category-asc";

type ToastState = {
  type: "success" | "error";
  title: string;
  message?: string;
};

const PRODUCTS_PER_PAGE = 12;

const normalizeText = (value: string) => value.trim().toLowerCase();

const normalizeSku = (value: string) =>
  value.replace(/[\s-]/g, "").toLowerCase();

export default function AdminProductsContent({
  products,
  categories,
}: AdminProductsContentProps) {
  const [items, setItems] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);
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

  const filteredAndSortedItems = useMemo(() => {
    const query = normalizeText(searchQuery);
    const skuQuery = normalizeSku(searchQuery);

    const filteredItems = items.filter((product) => {
      const productSku = product.sku ?? "";

      const searchableText = [
        product.name.pl,
        product.name.uk,
        product.slug,
        product.category,
        productSku,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query) ||
        normalizeSku(productSku).includes(skuQuery);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "available" && product.isAvailable) ||
        (availabilityFilter === "unavailable" && !product.isAvailable);

      return matchesSearch && matchesCategory && matchesAvailability;
    });

    return [...filteredItems].sort((a, b) => {
      if (sortOption === "name-asc") {
        return a.name.pl.localeCompare(b.name.pl);
      }

      if (sortOption === "name-desc") {
        return b.name.pl.localeCompare(a.name.pl);
      }

      if (sortOption === "price-asc") {
        return a.price - b.price;
      }

      if (sortOption === "price-desc") {
        return b.price - a.price;
      }

      if (sortOption === "stock-asc") {
        return a.stock - b.stock;
      }

      if (sortOption === "stock-desc") {
        return b.stock - a.stock;
      }

      if (sortOption === "category-asc") {
        return a.category.localeCompare(b.category);
      }

      return 0;
    });
  }, [items, searchQuery, selectedCategory, availabilityFilter, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedItems.length / PRODUCTS_PER_PAGE)
  );

  const firstProductIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const visibleItems = filteredAndSortedItems.slice(
    firstProductIndex,
    firstProductIndex + PRODUCTS_PER_PAGE
  );

  const firstVisibleProduct =
    filteredAndSortedItems.length > 0 ? firstProductIndex + 1 : 0;

  const lastVisibleProduct = Math.min(
    currentPage * PRODUCTS_PER_PAGE,
    filteredAndSortedItems.length
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, availabilityFilter, sortOption]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleAvailabilityChange = async (
    productId: string,
    isAvailable: boolean
  ) => {
    const previousItems = items;

    setItems((currentItems) =>
      currentItems.map((product) =>
        product.id === productId
          ? {
              ...product,
              isAvailable,
            }
          : product
      )
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
      `Delete product "${productToDelete.name.pl}"?`
    );

    if (!confirmed) return;

    const previousItems = items;

    setItems((currentItems) =>
      currentItems.filter((product) => product.id !== productId)
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
    setSortOption("default");
    setCurrentPage(1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      {toast && (
        <Toast type={toast.type} title={toast.title} onClose={closeToast}>
          {toast.message && <p>{toast.message}</p>}
        </Toast>
      )}

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        Products
      </h1>

      <AdminCreateProductForm
        categories={categories}
        onProductCreated={(product) => {
          setItems((currentItems) => [product, ...currentItems]);
          setCurrentPage(1);
        }}
      />

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="grid gap-4 md:grid-cols-5">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name, slug or SKU"
            className="
              w-full rounded-full
              border border-gray-300
              bg-white px-4 py-3
              text-sm text-gray-900
              dark:border-zinc-700 dark:bg-zinc-950 dark:text-white
            "
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="
              w-full rounded-full
              border border-gray-300
              bg-white px-4 py-3
              text-sm text-gray-900
              dark:border-zinc-700 dark:bg-zinc-950 dark:text-white
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
              bg-white px-4 py-3
              text-sm text-gray-900
              dark:border-zinc-700 dark:bg-zinc-950 dark:text-white
            "
          >
            <option value="all">All products</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <select
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
            className="
              w-full rounded-full
              border border-gray-300
              bg-white px-4 py-3
              text-sm text-gray-900
              dark:border-zinc-700 dark:bg-zinc-950 dark:text-white
            "
          >
            <option value="default">Newest first</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
            <option value="stock-desc">Stock high to low</option>
            <option value="stock-asc">Stock low to high</option>
            <option value="category-asc">Category A–Z</option>
          </select>

          <button
            type="button"
            onClick={handleResetFilters}
            className="
              rounded-full
              border border-gray-300
              px-4 py-3 text-sm
              text-gray-700
              hover:bg-gray-100
              dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800
            "
          >
            Reset filters
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-zinc-400">
          {filteredAndSortedItems.length > 0
            ? `Showing ${firstVisibleProduct}–${lastVisibleProduct} of ${filteredAndSortedItems.length} filtered products`
            : "No products match current filters."}{" "}
          Total products: {items.length}
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {visibleItems.length > 0 ? (
          visibleItems.map((product) => (
            <AdminProductListItem
              key={product.id}
              product={product}
              onAvailabilityChange={handleAvailabilityChange}
              onDelete={handleDeleteProduct}
            />
          ))
        ) : (
          <p className="rounded-3xl border border-dashed border-gray-300 px-5 py-8 text-sm text-gray-500 dark:border-zinc-700 dark:text-zinc-400">
            No products found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="
              rounded-full border border-gray-300 px-4 py-2 text-sm
              text-gray-700 transition-colors
              hover:bg-gray-100
              disabled:cursor-not-allowed disabled:opacity-40
              dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900
            "
          >
            ←
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="
              rounded-full border border-gray-300 px-4 py-2 text-sm
              text-gray-700 transition-colors
              hover:bg-gray-100
              disabled:cursor-not-allowed disabled:opacity-40
              dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900
            "
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
