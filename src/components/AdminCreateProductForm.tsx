"use client";

import { useState } from "react";
import Link from "next/link";
import {
  createProduct,
  type CreateProductInput,
  generateUniqueSlug,
  uploadProductImage,
} from "@/lib/products";
import type { Product } from "@/types/product";
import type { Category } from "@/lib/categories";
import { createProductSlug } from "@/lib/utils";
import Toast from "@/components/Toast";

type AdminCreateProductFormProps = {
  categories: Category[];
  onProductCreated: (product: Product) => void;
};

type ToastState = {
  type: "success" | "error";
  title: string;
  message?: string;
  href?: string;
  hrefLabel?: string;
};

export default function AdminCreateProductForm({
  categories,
  onProductCreated,
}: AdminCreateProductFormProps) {
  const [formData, setFormData] = useState<CreateProductInput>({
    slug: "",
    name_pl: "",
    name_uk: "",
    description_pl: "",
    description_uk: "",
    price: 0,
    image_url: "",
    image_urls: [],
    category: "",
    stock: 0,
    is_available: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (toastData: ToastState) => {
    setToast(toastData);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "number" ? Number(value) : value,
      ...(name === "name_pl" && !current.slug
        ? { slug: createProductSlug(value) }
        : {}),
    }));
  };

  const handleImagesUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    setIsUploadingImages(true);

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadProductImage(file)),
      );

      setFormData((current) => ({
        ...current,
        image_url: current.image_url || uploadedUrls[0] || "",
        image_urls: [...current.image_urls, ...uploadedUrls],
      }));
    } catch (error) {
      showToast({
        type: "error",
        title: "Image upload failed.",
        message: error instanceof Error ? error.message : "Unknown error.",
      });
    } finally {
      setIsUploadingImages(false);
      event.target.value = "";
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setFormData((current) => {
      const nextImages = current.image_urls.filter((url) => url !== imageUrl);

      return {
        ...current,
        image_url: nextImages[0] ?? "",
        image_urls: nextImages,
      };
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      is_available: event.target.checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const imageUrls = formData.image_urls
      .map((imageUrl) => imageUrl.trim())
      .filter(Boolean);

    if (imageUrls.length === 0) {
      showToast({
        type: "error",
        title: "Product creation failed.",
        message: "Add at least one product image.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const finalSlug = await generateUniqueSlug(
        formData.slug.trim() || formData.name_pl,
      );

      await createProduct({
        ...formData,
        slug: finalSlug,
        image_url: imageUrls[0] ?? "",
        image_urls: imageUrls,
      });

      onProductCreated({
        id: finalSlug,
        slug: finalSlug,
        name: {
          pl: formData.name_pl,
          uk: formData.name_uk,
        },
        description: {
          pl: formData.description_pl,
          uk: formData.description_uk,
        },
        price: formData.price,
        images: imageUrls,
        category: formData.category,
        stock: formData.stock,
        isAvailable: formData.is_available,
      });

      setFormData({
        slug: "",
        name_pl: "",
        name_uk: "",
        description_pl: "",
        description_uk: "",
        price: 0,
        image_url: "",
        image_urls: [],
        category: "",
        stock: 0,
        is_available: true,
      });

      showToast({
        type: "success",
        title: `Product "${formData.name_pl}" created successfully.`,
        href: `/products/${finalSlug}`,
        hrefLabel: "Open product page",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Product creation failed.",
        message: error instanceof Error ? error.message : "Unknown error.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mt-8 rounded-3xl
        border border-gray-200
        dark:border-zinc-700
        bg-white dark:bg-zinc-900
        p-5 space-y-4
      "
    >
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          onClose={() => setToast(null)}
        >
          {toast.message && <p>{toast.message}</p>}

          {toast.href && toast.hrefLabel && (
            <Link
              href={toast.href}
              target="_blank"
              className="inline-block underline font-medium"
            >
              {toast.hrefLabel}
            </Link>
          )}
        </Toast>
      )}

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Create product
      </h2>

      <input
        name="slug"
        placeholder="Slug"
        value={formData.slug}
        onChange={handleChange}
        required
        className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name_pl"
          placeholder="Name PL"
          value={formData.name_pl}
          onChange={handleChange}
          required
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
        />

        <input
          name="name_uk"
          placeholder="Name UK"
          value={formData.name_uk}
          onChange={handleChange}
          required
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <textarea
          name="description_pl"
          placeholder="Description PL"
          value={formData.description_pl}
          onChange={handleChange}
          required
          className="min-h-24 w-full rounded-3xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
        />

        <textarea
          name="description_uk"
          placeholder="Description UK"
          value={formData.description_uk}
          onChange={handleChange}
          required
          className="min-h-24 w-full rounded-3xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Product images
        </p>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesUpload}
          className="block w-full text-sm text-gray-700 dark:text-zinc-300"
        />

        {isUploadingImages && (
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Uploading images...
          </p>
        )}

        {formData.image_urls.length > 0 && (
          <div className="space-y-2">
            {formData.image_urls.map((imageUrl) => (
              <div
                key={imageUrl}
                className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-zinc-700 p-3"
              >
                <img
                  src={imageUrl}
                  alt=""
                  className="h-16 w-16 rounded-xl object-cover"
                />

                <p className="min-w-0 flex-1 truncate text-xs text-gray-500 dark:text-zinc-400">
                  {imageUrl}
                </p>

                <button
                  type="button"
                  onClick={() => handleRemoveImage(imageUrl)}
                  className="rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
      >
        <option value="">Select category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name_pl}
          </option>
        ))}
      </select>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-700 dark:text-zinc-300">
          <span>Price</span>

          <input
            name="price"
            type="number"
            min={0}
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
          />
        </label>

        <label className="space-y-2 text-sm text-gray-700 dark:text-zinc-300">
          <span>Stock</span>

          <input
            name="stock"
            type="number"
            min={0}
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-zinc-300">
        <input
          type="checkbox"
          checked={formData.is_available}
          onChange={handleCheckboxChange}
        />
        Available
      </label>

      <button
        disabled={isSubmitting || isUploadingImages}
        className="
          rounded-full bg-black text-white
          dark:bg-white dark:text-black
          px-6 py-3 text-sm
          disabled:opacity-50
        "
      >
        {isSubmitting ? "Creating..." : "Create product"}
      </button>
    </form>
  );
}
