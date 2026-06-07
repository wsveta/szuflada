"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

type FavoritesContextValue = {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const GUEST_FAVORITES_KEY = "guest_favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const savedFavorites = localStorage.getItem(GUEST_FAVORITES_KEY);
      const guestFavorites: string[] = savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

      if (!user) {
        setFavoriteIds(guestFavorites);
        return;
      }

      const { data } = await supabase
        .from("favorites")
        .select("product_slug")
        .eq("user_id", user.id);

      const remoteFavorites = data?.map((item) => item.product_slug) ?? [];

      const mergedFavorites = Array.from(
        new Set([...guestFavorites, ...remoteFavorites])
      );

      if (mergedFavorites.length > 0) {
        await supabase.from("favorites").upsert(
          mergedFavorites.map((productId) => ({
            user_id: user.id,
            product_slug: productId,
          })),
          {
            onConflict: "user_id,product_slug",
          }
        );
      }

      setFavoriteIds(mergedFavorites);
      localStorage.removeItem(GUEST_FAVORITES_KEY);
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (productId: string) => {
    const isAlreadyFavorite = favoriteIds.includes(productId);

    const nextFavorites = isAlreadyFavorite
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId];

    setFavoriteIds(nextFavorites);

    if (!user) {
      localStorage.setItem(GUEST_FAVORITES_KEY, JSON.stringify(nextFavorites));
      return;
    }

    if (isAlreadyFavorite) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_slug", productId);

      return;
    }

    await supabase.from("favorites").insert({
      user_id: user.id,
      product_slug: productId,
    });
  };

  const isFavorite = (productId: string) => {
    return favoriteIds.includes(productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}