"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  productId: string;
  stock: number;
  disabled?: boolean;
};

export default function AddToCartButton({
  productId,
  stock,
  disabled = false,
}: AddToCartButtonProps) {
  const [wasAdded, setWasAdded] = useState(false);
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (disabled) return;

    addToCart(productId, stock);
    setWasAdded(true);

    setTimeout(() => {
      setWasAdded(false);
    }, 1200);
  };

  return (
    <button
      disabled={disabled}
      onClick={handleAddToCart}
      className={`
        mt-4 w-full rounded-full py-3 text-sm
        transition-all duration-200
        ${
          disabled
            ? "bg-gray-300 text-gray-500 dark:bg-zinc-700 dark:text-zinc-400 cursor-not-allowed"
            : `
              bg-black text-white
              dark:bg-white dark:text-black
              hover:bg-zinc-800
              dark:hover:bg-zinc-200
              hover:-translate-y-0.5
            `
        }
      `}
    >
      {disabled
        ? t.product.outOfStock
        : wasAdded
          ? "✓ Added"
          : t.product.addToCart}
    </button>
  );
}