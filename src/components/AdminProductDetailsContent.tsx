"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProductBySlug, updateProduct } from "@/lib/products";
import type { Category } from "@/lib/categories";

type ProductFormData = {
  name_pl: string;
  name_uk: string;
  description_pl: string;
  description_uk: string;
  price: number;
  image_urls: string[];
  category: string;
  stock: number;
  is_available: boolean;
};

type AdminProductDetailsContentProps = {
  slug: string;
  categories: Category[];
};

export default function AdminProductDetailsContent({
  slug,
  categories,
}: AdminProductDetailsContentProps) {
  const [formData, setFormData] = useState<ProductFormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      const product = await getProductBySlug(slug);

      if (!product) return;

      setFormData({
        name_pl: product.name.pl,
        name_uk: product.name.uk,
        description_pl: product.description.pl,
        description_uk: product.description.uk,
        price: product.price,
        image_urls: product.images.length > 0 ? product.images : [""],
        category: product.category,
        stock: product.stock,
        is_available: product.isAvailable,
      });
    };

    loadProduct();
  }, [slug]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormData((current) => {
      if (!current) return current;

      return {
        ...current,
        [name]: type === "number" ? Number(value) : value,
      };
    });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormData((current) => {
      if (!current) return current;

      return {
        ...current,
        category: event.target.value,
      };
    });
  };

  const handleAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((current) => {
      if (!current) return current;

      return {
        ...current,
        is_available: event.target.checked,
      };
    });
  };

  const handleImageChange = (index: number, value: string) => {
    setFormData((current) => {
      if (!current) return current;

      const nextImages = [...current.image_urls];
      nextImages[index] = value;

      return {
        ...current,
        image_urls: nextImages,
      };
    });
  };

  const handleAddImage = () => {
    setFormData((current) => {
      if (!current) return current;

      return {
        ...current,
        image_urls: [...current.image_urls, ""],
      };
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData((current) => {
      if (!current) return current;

      return {
        ...current,
        image_urls:
          current.image_urls.length > 1
            ? current.image_urls.filter((_, imageIndex) => imageIndex !== index)
            : [""],
      };
    });
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData) return;

    setMessage("");
    setIsSaving(true);

    const imageUrls = formData.image_urls
      .map((imageUrl) => imageUrl.trim())
      .filter(Boolean);

    await updateProduct(slug, {
      ...formData,
      image_url: imageUrls[0] ?? "",
      image_urls: imageUrls,
      price: Math.max(0, formData.price),
      stock: Math.max(0, formData.stock),
    });

    setIsSaving(false);
    setMessage("Product updated");
  };

  if (!formData) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-gray-500 dark:text-zinc-400">Loading...</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/admin/products"
        className="text-sm text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        ← Back to products
      </Link>

      <h1 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">
        Edit product
      </h1>

      <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
        Slug: {slug}
      </p>

      <form onSubmit={handleSave} className="mt-8 space-y-4">
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
            className="min-h-32 w-full rounded-3xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
          />

          <textarea
            name="description_uk"
            placeholder="Description UK"
            value={formData.description_uk}
            onChange={handleChange}
            required
            className="min-h-32 w-full rounded-3xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Product images
          </p>

          {formData.image_urls.map((imageUrl, index) => (
            <div key={index} className="flex gap-3">
              <input
                value={imageUrl}
                onChange={(event) =>
                  handleImageChange(index, event.target.value)
                }
                placeholder={`Image URL ${index + 1}`}
                className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-gray-900 dark:text-white"
              />

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="rounded-full bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddImage}
            className="rounded-full border border-gray-300 dark:border-zinc-700 px-4 py-2 text-sm text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Add image
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
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
        </div>

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
            onChange={handleAvailabilityChange}
          />
          Available
        </label>

        {message && (
          <p className="text-sm text-green-700 dark:text-green-400">
            {message}
          </p>
        )}

        <button
          disabled={isSaving}
          className="
            rounded-full bg-black text-white
            dark:bg-white dark:text-black
            px-6 py-3 text-sm
            transition-all duration-200
            hover:bg-zinc-800
            dark:hover:bg-zinc-200
            disabled:opacity-50
          "
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </section>
  );
}
