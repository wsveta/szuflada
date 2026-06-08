"use client";

import { useState } from "react";
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

export default function AdminCategoriesContent({
  categories,
}: AdminCategoriesContentProps) {
  const [items, setItems] = useState(categories);
  const [newCategory, setNewCategory] = useState({
    name_pl: "",
    name_uk: "",
  });

  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (title: string, type: "success" | "error") => {
    setToast({ title, type });
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
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
          "error",
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

      setItems((current) => [...current, createdCategory]);

      setNewCategory({
        name_pl: "",
        name_uk: "",
      });

      showToast(
        `Category "${categoryToCreate.name_pl}" created successfully.`,
        "success",
      );
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Category creation failed.",
        "error",
      );
    }
  };

  const handleEditChange = (
    categoryId: number,
    field: "name_pl" | "name_uk",
    value: string,
  ) => {
    setItems((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              [field]: value,
            }
          : category,
      ),
    );
  };

  const handleUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    category: Category,
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
          "error",
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
          item.id === category.id ? updatedCategory : item,
        ),
      );

      showToast(
        `Category "${updatedCategory.name_pl}" updated successfully.`,
        "success",
      );
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Category update failed.",
        "error",
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
          "error",
        );
        return;
      }

      const confirmed = window.confirm(
        `Delete category "${categoryToDelete.name_pl}"?`,
      );

      if (!confirmed) return;

      await deleteCategory(categoryId);

      setItems((current) => current.filter((item) => item.id !== categoryId));

      showToast(
        `Category "${categoryToDelete.name_pl}" deleted successfully.`,
        "success",
      );
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Category deletion failed.",
        "error",
      );
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Categories
      </h1>

      <form
        onSubmit={handleCreate}
        className="mt-8 rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 space-y-4"
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
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
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
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
        />

        <button className="rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-sm">
          Create category
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {items.map((category) => (
          <form
            key={category.id}
            onSubmit={(event) => handleUpdate(event, category)}
            className="rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 space-y-3"
          >
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Slug: {category.slug}
            </p>

            <input
              value={category.name_pl}
              onChange={(event) =>
                handleEditChange(category.id, "name_pl", event.target.value)
              }
              required
              className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
            />

            <input
              value={category.name_uk}
              onChange={(event) =>
                handleEditChange(category.id, "name_uk", event.target.value)
              }
              required
              className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
            />

            <div className="flex gap-3">
              <button className="rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm">
                Save
              </button>

              <button
                type="button"
                onClick={() => handleDelete(category.id)}
                className="rounded-full bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
}
