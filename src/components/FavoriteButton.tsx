"use client";

import { useFavorites } from "@/context/FavoritesContext";

type FavoriteButtonProps = {
  productId: string;
};

export default function FavoriteButton({
  productId,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(productId);

  return (
    <button
      onClick={(event) => {
  event.preventDefault();
  event.stopPropagation();
  toggleFavorite(productId);
}}
      aria-label="Toggle favorite"
      className="
        absolute top-3 right-3 z-10
        h-10 w-10 rounded-full
        bg-white/90 dark:bg-zinc-900/90
        backdrop-blur
        border border-gray-200 dark:border-zinc-700
        flex items-center justify-center
        transition-all duration-200
        hover:scale-110
      "
    >
      <span className="text-xl">
        {favorite ? "❤️" : "🤍"}
      </span>
    </button>
  );
}