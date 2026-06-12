"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  getProductBySlug,
  updateProduct,
  uploadProductImage,
} from "@/lib/products";
import type { Category } from "@/lib/categories";
import Toast from "@/components/Toast";

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

type ToastState = {
  type: "success" | "error";
  title: string;
  message?: string;
  href?: string;
  hrefLabel?: string;
};

export default function AdminProductDetailsContent({
  slug,
  categories,
}: AdminProductDetailsContentProps) {
  const [formData, setFormData] = useState<ProductFormData | null>(null);
  const [productSku, setProductSku] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setIsNotFound(false);

      try {
        const product = await getProductBySlug(slug);

        if (!product) {
          setFormData(null);
          setProductSku("");
          setIsNotFound(true);
          return;
        }

        setProductSku(product.sku);

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
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormData((current) => {
      if (!current) return current;

      return {
        ...current,
        category: event.target.value,
      };
    });
  };

  const handleAvailabilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => {
      if (!current) return current;

      return {
        ...current,
        is_available: event.target.checked,
      };
    });
  };

  const handleImagesUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    setIsUploadingImages(true);

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadProductImage(file)),
      );

      setFormData((current) => {
        if (!current) return current;

        const currentImages = current.image_urls
          .map((imageUrl) => imageUrl.trim())
          .filter(Boolean);

        return {
          ...current,
          image_urls: [...currentImages, ...uploadedUrls],
        };
      });

      setToast({
        type: "success",
        title: "Images uploaded successfully.",
      });
    } catch (error) {
      setToast({
        type: "error",
        title: "Image upload failed.",
        message: error instanceof Error ? error.message : "Unknown error.",
      });
    } finally {
      setIsUploadingImages(false);
      event.target.value = "";
    }
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

      const nextImages = current.image_urls.filter(
        (_, imageIndex) => imageIndex !== index,
      );

      return {
        ...current,
        image_urls: nextImages.length > 0 ? nextImages : [""],
      };
    });
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData) return;

    const imageUrls = formData.image_urls
      .map((imageUrl) => imageUrl.trim())
      .filter(Boolean);

    if (imageUrls.length === 0) {
      setToast({
        type: "error",
        title: "Product update failed.",
        message: "Add at least one product image.",
      });
      return;
    }

    setIsSaving(true);

    try {
      await updateProduct(slug, {
        ...formData,
        image_url: imageUrls[0] ?? "",
        image_urls: imageUrls,
        price: Math.max(0, formData.price),
        stock: Math.max(0, formData.stock),
      });

      setFormData((current) =>
        current
          ? {
              ...current,
              image_urls: imageUrls,
              price: Math.max(0, current.price),
              stock: Math.max(0, current.stock),
            }
          : current,
      );

      setToast({
        type: "success",
        title: "Product updated successfully.",
        href: `/products/${slug}`,
        hrefLabel: "Open product page",
      });
    } catch (error) {
      setToast({
        type: "error",
        title: "Product update failed.",
        message: error instanceof Error ? error.message : "Unknown error.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="text-gray-500 dark:text-zinc-400">Loading...</p>
      </section>
    );
  }

  if (isNotFound || !formData) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <Link
          href="/admin/products"
          className="text-sm text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          ← Back to products
        </Link>

        <div className="mt-8 rounded-3xl border border-dashed border-gray-300 px-6 py-10 dark:border-zinc-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product not found
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            No product exists for this slug: {slug}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {toast && (
        <Toast type={toast.type} title={toast.title} onClose={closeToast}>
          {toast.message && <p>{toast.message}</p>}

          {toast.href && toast.hrefLabel && (
            <Link
              href={toast.href}
              target="_blank"
              className="inline-block font-medium underline"
            >
              {toast.hrefLabel}
            </Link>
          )}
        </Toast>
      )}

      <Link
        href="/admin/products"
        className="text-sm text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        ← Back to products
      </Link>

      <h1 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">
        Edit product
      </h1>

      <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-zinc-400">
        <p>
          SKU:{" "}
          <span className="font-medium text-gray-700 dark:text-zinc-300">
            {productSku || "—"}
          </span>
        </p>

        <p>
          Slug:{" "}
          <span className="font-medium text-gray-700 dark:text-zinc-300">
            {slug}
          </span>
        </p>
      </div>

      <form onSubmit={handleSave} className="mt-8 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="name_pl"
            placeholder="Name PL"
            value={formData.name_pl}
            onChange={handleChange}
            required
            className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />

          <input
            name="name_uk"
            placeholder="Name UK"
            value={formData.name_uk}
            onChange={handleChange}
            required
            className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <textarea
            name="description_pl"
            placeholder="Description PL"
            value={formData.description_pl}
            onChange={handleChange}
            required
            className="min-h-32 w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />

          <textarea
            name="description_uk"
            placeholder="Description UK"
            value={formData.description_uk}
            onChange={handleChange}
            required
            className="min-h-32 w-full rounded-3xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Product images
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
              Upload new images or manage existing product images.
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesUpload}
            disabled={isUploadingImages}
            className="block w-full text-sm text-gray-700 dark:text-zinc-300"
          />

          {isUploadingImages && (
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Uploading images...
            </p>
          )}

          {formData.image_urls.filter(Boolean).length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {formData.image_urls.map((imageUrl, index) => {
                if (!imageUrl) return null;

                return (
                  <div
                    key={`${imageUrl}-${index}`}
                    className="rounded-3xl border border-gray-200 p-3 dark:border-zinc-700"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800">
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <p className="mt-3 break-all text-xs text-gray-500 dark:text-zinc-400">
                      {imageUrl}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-gray-300 px-4 py-6 text-sm text-gray-500 dark:border-zinc-700 dark:text-zinc-400">
              No images added yet.
            </p>
          )}

          <details className="rounded-2xl border border-gray-200 p-4 dark:border-zinc-700">
            <summary className="cursor-pointer text-sm font-medium text-gray-900 dark:text-white">
              Add image by URL
            </summary>

            <div className="mt-4 space-y-3">
              {formData.image_urls.map((imageUrl, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={imageUrl}
                    onChange={(event) =>
                      handleImageChange(index, event.target.value)
                    }
                    placeholder={`Image URL ${index + 1}`}
                    className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddImage}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Add URL field
              </button>
            </div>
          </details>
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
            className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
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
              className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
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
              className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
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

        <button
          disabled={isSaving || isUploadingImages}
          className="
            rounded-full bg-black px-6 py-3
            text-sm text-white
            transition-all duration-200
            hover:bg-zinc-800
            disabled:opacity-50
            dark:bg-white dark:text-black dark:hover:bg-zinc-200
          "
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </section>
  );
}
