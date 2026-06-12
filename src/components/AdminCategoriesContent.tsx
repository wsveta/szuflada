"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  categoryNameExists,
  createCategory,
  deleteCategory,
  generateUniqueCategorySlug,
  getCategoryProductCount,
  updateCategory,
  type Category,
} from "@/lib/categories";
import Toast from "@/components/Toast";

type AdminCategoriesContentProps = {
  categories: Category[];
};

type ToastState = {
  type: "success" | "error";
  title: string;
};

const CATEGORIES_PER_PAGE = 9;

const sortCategoriesByNewest = (categories: Category[]) => {
  return [...categories].sort((a, b) => b.id - a.id);
};

export default function AdminCategoriesContent({
  categories,
}: AdminCategoriesContentProps) {
  const [items, setItems] = useState(() => sortCategoriesByNewest(categories));
  const [currentPage, setCurrentPage] = useState(1);

  const [newCategory, setNewCategory] = useState({
    name_pl: "",
    name_uk: "",
  });

  const [toast, setToast] = useState<ToastState | null>(null);

  const totalPages = Math.max(1, Math.ceil(items.length / CATEGORIES_PER_PAGE));

  const firstCategoryIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;
  const visibleItems = items.slice(
    firstCategoryIndex,
    firstCategoryIndex + CATEGORIES_PER_PAGE
  );

  const firstVisibleCategory = items.length > 0 ? firstCategoryIndex + 1 : 0;

  const lastVisibleCategory = Math.min(
    currentPage * CATEGORIES_PER_PAGE,
    items.length
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const showToast = (title: string, type: "success" | "error") => {
    setToast({ title, type });
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const namePl = newCategory.name_pl.trim();
    const nameUk = newCategory.name_uk.trim();

    if (!namePl || !nameUk) {
      showToast("Both category names are required.", "error");
      return;
    }

    try {
      const exists = await categoryNameExists(namePl, nameUk);

      if (exists) {
        showToast(
          "Category with this Polish or Ukrainian name already exists.",
          "error"
        );
        return;
      }

      const slug = await generateUniqueCategorySlug(namePl);

      const categoryToCreate = {
        name_pl: namePl,
        name_uk: nameUk,
        slug,
      };

      const createdCategory = await createCategory(categoryToCreate);

      setItems((current) =>
        sortCategoriesByNewest([createdCategory, ...current])
      );

      setCurrentPage(1);

      setNewCategory({
        name_pl: "",
        name_uk: "",
      });

      showToast(
        `Category "${categoryToCreate.name_pl}" created successfully.`,
        "success"
      );
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Category creation failed.",
        "error"
      );
    }
  };

  const handleEditChange = (
    categoryId: number,
    field: "name_pl" | "name_uk",
    value: string
  ) => {
    setItems((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              [field]: value,
            }
          : category
      )
    );
  };

  const handleUpdate = async (
    event: FormEvent<HTMLFormElement>,
    category: Category
  ) => {
    event.preventDefault();

    const namePl = category.name_pl.trim();
    const nameUk = category.name_uk.trim();

    if (!namePl || !nameUk) {
      showToast("Both category names are required.", "error");
      return;
    }

    try {
      const exists = await categoryNameExists(namePl, nameUk, category.id);

      if (exists) {
        showToast(
          "Another category with this Polish or Ukrainian name already exists.",
          "error"
        );
        return;
      }

      const updatedCategory = {
        ...category,
        name_pl: namePl,
        name_uk: nameUk,
      };

      await updateCategory(category.id, {
        slug: updatedCategory.slug,
        name_pl: updatedCategory.name_pl,
        name_uk: updatedCategory.name_uk,
      });

      setItems((current) =>
        current.map((item) =>
          item.id === category.id ? updatedCategory : item
        )
      );

      showToast(
        `Category "${updatedCategory.name_pl}" updated successfully.`,
        "success"
      );
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Category update failed.",
        "error"
      );
    }
  };

  const handleDelete = async (categoryId: number) => {
    const categoryToDelete = items.find((item) => item.id === categoryId);

    if (!categoryToDelete) {
      showToast("Category not found.", "error");
      return;
    }

    try {
      const productCount = await getCategoryProductCount(categoryToDelete.slug);

      if (productCount > 0) {
        showToast(
          `Cannot delete "${categoryToDelete.name_pl}". This category is used by ${productCount} product${
            productCount === 1 ? "" : "s"
          }.`,
          "error"
        );
        return;
      }

      const confirmed = window.confirm(
        `Delete category "${categoryToDelete.name_pl}"?`
      );

      if (!confirmed) return;

      await deleteCategory(categoryId);

      setItems((current) => current.filter((item) => item.id !== categoryId));

      showToast(
        `Category "${categoryToDelete.name_pl}" deleted successfully.`,
        "success"
      );
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Category deletion failed.",
        "error"
      );
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          duration={2000}
          onClose={() => setToast(null)}
        />
      )}

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Categories
        </h1>

        <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">
          {items.length > 0
            ? `Showing ${firstVisibleCategory}–${lastVisibleCategory} of ${items.length}`
            : "No categories found."}
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="mt-8 space-y-4 rounded-3xl border border-gray-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create category
        </h2>

        <input
          placeholder="Name PL"
          value={newCategory.name_pl}
          onChange={(event) =>
            setNewCategory((current) => ({
              ...current,
              name_pl: event.target.value,
            }))
          }
          required
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
        />

        <input
          placeholder="Name UK"
          value={newCategory.name_uk}
          onChange={(event) =>
            setNewCategory((current) => ({
              ...current,
              name_uk: event.target.value,
            }))
          }
          required
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
        />

        <button
          type="submit"
          className="rounded-full bg-black px-6 py-3 text-sm text-white dark:bg-white dark:text-black"
        >
          Create category
        </button>
      </form>

      {items.length === 0 ? (
        <p className="mt-8 text-gray-500 dark:text-zinc-400">
          No categories found.
        </p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {visibleItems.map((category) => (
              <form
                key={category.id}
                onSubmit={(event) => handleUpdate(event, category)}
                className="space-y-3 rounded-3xl border border-gray-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
              >
                <p className="break-all text-xs text-gray-500 dark:text-zinc-400">
                  Slug: {category.slug}
                </p>

                <input
                  value={category.name_pl}
                  onChange={(event) =>
                    handleEditChange(category.id, "name_pl", event.target.value)
                  }
                  required
                  className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                />

                <input
                  value={category.name_uk}
                  onChange={(event) =>
                    handleEditChange(category.id, "name_uk", event.target.value)
                  }
                  required
                  className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                />

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-full bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(category.id)}
                    className="rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ))}
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
        </>
      )}
    </section>
  );
}
