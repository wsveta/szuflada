"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getOrderByCode, type OrderDetails } from "@/lib/orders";

type OrderDetailsContentProps = {
  orderCode: string;
};

export default function OrderDetailsContent({
  orderCode,
}: OrderDetailsContentProps) {
  const { user, isLoading } = useAuth();
  const { t, language } = useLanguage();

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!user) {
        setIsLoadingOrder(false);
        return;
      }

      try {
        const data = await getOrderByCode(orderCode, user.id);
        setOrder(data);
      } catch (error) {
        console.error(error);
        setOrder(null);
      } finally {
        setIsLoadingOrder(false);
      }
    };

    loadOrder();
  }, [orderCode, user]);

  const dateLocale = language === "pl" ? "pl-PL" : "uk-UA";

  if (isLoading || isLoadingOrder) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">
          {t.auth.loginRequired}
        </p>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">{t.product.notFound}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <Link
        href="/account"
        className="text-sm text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        ← {t.account.title}
      </Link>

      <h1 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        {t.orders.orderNumber}: {order.order_code}
      </h1>

      <div className="mt-8 rounded-3xl bg-gray-100 p-6 dark:bg-zinc-900">
        <p className="text-gray-600 dark:text-zinc-300">
          {t.orders.status}: {order.status}
        </p>

        <p className="mt-2 text-gray-600 dark:text-zinc-300">
          {t.orders.total}: {Number(order.total_amount).toFixed(2)} zł
        </p>

        <p className="mt-2 text-gray-600 dark:text-zinc-300">
          {t.orders.createdAt}:{" "}
          {new Date(order.created_at).toLocaleDateString(dateLocale)}
        </p>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
        {t.orders.items}
      </h2>

      <div className="mt-6 space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
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
