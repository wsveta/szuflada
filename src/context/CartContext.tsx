"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (productId: string, stock: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  increaseQuantity: (productId: string, stock: number) => Promise<void>;
  decreaseQuantity: (productId: string) => Promise<void>;
  setQuantity: (
    productId: string,
    quantity: number,
    stock: number
  ) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const GUEST_CART_KEY = "guest_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = localStorage.getItem(GUEST_CART_KEY);
      const guestCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

      if (!user) {
        setItems(guestCart);
        return;
      }

      const { data } = await supabase
        .from("cart_items")
        .select("product_slug, quantity")
        .eq("user_id", user.id);

      const remoteCart: CartItem[] =
        data?.map((item) => ({
          productId: item.product_slug,
          quantity: item.quantity,
        })) ?? [];

      const mergedCartMap = new Map<string, number>();

      remoteCart.forEach((item) => {
        mergedCartMap.set(item.productId, item.quantity);
      });

      guestCart.forEach((item) => {
        const existingQuantity = mergedCartMap.get(item.productId) ?? 0;
        mergedCartMap.set(item.productId, existingQuantity + item.quantity);
      });

      const mergedCart = Array.from(mergedCartMap.entries()).map(
        ([productId, quantity]) => ({
          productId,
          quantity,
        })
      );

      if (mergedCart.length > 0) {
        await supabase.from("cart_items").upsert(
          mergedCart.map((item) => ({
            user_id: user.id,
            product_slug: item.productId,
            quantity: item.quantity,
          })),
          {
            onConflict: "user_id,product_slug",
          }
        );
      }

      setItems(mergedCart);
      localStorage.removeItem(GUEST_CART_KEY);
    };

    loadCart();
  }, [user]);

  const saveGuestCart = (nextItems: CartItem[]) => {
    if (!user) {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(nextItems));
    }
  };

  const syncUserCart = async (nextItems: CartItem[]) => {
    if (!user) return;

    await supabase.from("cart_items").delete().eq("user_id", user.id);

    if (nextItems.length === 0) return;

    await supabase.from("cart_items").insert(
      nextItems.map((item) => ({
        user_id: user.id,
        product_slug: item.productId,
        quantity: item.quantity,
      }))
    );
  };

  const updateCart = async (updater: (currentItems: CartItem[]) => CartItem[]) => {
    const nextItems = updater(items);

    setItems(nextItems);
    saveGuestCart(nextItems);
    await syncUserCart(nextItems);
  };

  const addToCart = async (productId: string, stock: number) => {
    await updateCart((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        if (existingItem.quantity >= stock) {
          return currentItems;
        }

        return currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      if (stock <= 0) {
        return currentItems;
      }

      return [...currentItems, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = async (productId: string) => {
    await updateCart((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    );
  };

  const increaseQuantity = async (productId: string, stock: number) => {
    await addToCart(productId, stock);
  };

  const decreaseQuantity = async (productId: string) => {
    await updateCart((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const setQuantity = async (
    productId: string,
    quantity: number,
    stock: number
  ) => {
    const safeQuantity = Math.max(1, Math.min(quantity, stock));

    await updateCart((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: safeQuantity }
          : item
      )
    );
  };

  const clearCart = async () => {
    await updateCart(() => []);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}