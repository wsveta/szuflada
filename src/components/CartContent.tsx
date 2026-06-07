"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/types/product";

type CartContentProps = {
  products: Product[];
};

export default function CartContent({ products }: CartContentProps) {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    clearCart,
    totalItems,
  } = useCart();

  const { language, t } = useLanguage();

  const cartProducts = items
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) return null;

      return {
        product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean) as { product: Product; quantity: number }[];

  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {t.cart.title}
      </h1>

      {cartProducts.length === 0 ? (
        <p className="mt-6 text-gray-500 dark:text-zinc-400">
          {t.cart.empty}
        </p>
      ) : (
        <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-4">
            {cartProducts.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800"
                >
                  <Image
                    src={product.image}
                    alt={product.name[language]}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium text-gray-900 dark:text-white hover:underline"
                  >
                    {product.name[language]}
                  </Link>

                  <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                    {product.price.toFixed(2)} zł
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      disabled={quantity <= 1}
                      className="h-8 w-8 rounded-full border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(event) => {
                        const value = Number(event.target.value);

                        if (Number.isNaN(value)) return;

                        setQuantity(product.id, value, product.stock);
                      }}
                      className="h-8 w-16 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-center text-sm text-gray-900 dark:text-white"
                    />

                    <button
                      onClick={() =>
                        increaseQuantity(product.id, product.stock)
                      }
                      disabled={quantity >= product.stock}
                      className="h-8 w-8 rounded-full border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="ml-auto text-sm text-gray-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
                    >
                      {t.cart.remove}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-500 dark:text-zinc-400">
                    {t.product.stockCount}: {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t.cart.summary}
            </h2>

            <div className="mt-4 space-y-3 text-gray-600 dark:text-zinc-300">
              <div className="flex justify-between">
                <span>{t.cart.items}</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                <span>{t.cart.total}</span>
                <span>{totalPrice.toFixed(2)} zł</span>
              </div>
            </div>

            <button
              onClick={clearCart}
              className="mt-6 w-full rounded-full border border-gray-300 dark:border-zinc-700 py-3 text-sm text-gray-700 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-800"
            >
              {t.cart.clear}
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}