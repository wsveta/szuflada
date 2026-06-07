"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center text-gray-700 hover:text-black dark:text-zinc-200 dark:hover:text-white"
    >
      <span className="text-xl">🛒</span>

      {totalItems > 0 && (
        <span
          className="
            absolute -top-2 -right-2
            min-w-5 h-5 px-1
            rounded-full
            bg-black text-white
            dark:bg-white dark:text-black
            text-[10px]
            flex items-center justify-center
          "
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}