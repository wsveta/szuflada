"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesLink() {
  const { favoriteIds } = useFavorites();

  return (
    <Link
      href="/favorites"
      className="relative flex items-center justify-center text-gray-700 hover:text-black dark:text-zinc-200 dark:hover:text-white"
    >
      <span className="text-xl">❤️</span>

      {favoriteIds.length > 0 && (
        <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full dark:bg-white dark:text-black text-[12px] flex items-center justify-center bg-black text-white">
          {favoriteIds.length}
        </span>
      )}
    </Link>
  );
}