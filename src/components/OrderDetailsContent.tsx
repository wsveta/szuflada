"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getOrderById, type OrderDetails } from "@/lib/orders";

type OrderDetailsContentProps = {
  orderId: number;
};

export default function OrderDetailsContent({
  orderId,
}: OrderDetailsContentProps) {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (!user) return;

      const data = await getOrderById(orderId, user.id);
      setOrder(data);
    };

    loadOrder();
  }, [orderId, user]);

  if (isLoading) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">
          {t.auth.loginRequired}
        </p>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">
          {t.product.notFound}
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <Link
        href="/account"
        className="text-sm text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        ← {t.account.title}
      </Link>

      <h1 className="mt-8 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {t.orders.orderNumber} #{order.id}
      </h1>

      <div className="mt-8 rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6">
        <p className="text-gray-600 dark:text-zinc-300">
          {t.orders.status}: {order.status}
        </p>

        <p className="mt-2 text-gray-600 dark:text-zinc-300">
          {t.orders.total}: {Number(order.total_amount).toFixed(2)} zł
        </p>

        <p className="mt-2 text-gray-600 dark:text-zinc-300">
          {t.orders.createdAt}:{" "}
          {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
        {t.orders.items}
      </h2>

      <div className="mt-6 space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4"
          >
            <p className="font-medium text-gray-900 dark:text-white">
              {item.product_name}
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              {t.orders.quantity}: {item.quantity}
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
              {t.orders.price}: {Number(item.unit_price).toFixed(2)} zł
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}