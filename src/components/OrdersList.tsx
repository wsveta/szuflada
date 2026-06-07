
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getUserOrders, type Order } from "@/lib/orders";

export default function OrdersList() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getUserOrders(user.id);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  if (isLoading) {
    return (
      <div className="mt-10">
        <p className="text-gray-500 dark:text-zinc-400">...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t.orders.title}
        </h2>

        <p className="mt-4 text-gray-500 dark:text-zinc-400">
          {t.orders.empty}
        </p>
      </div>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t.orders.title}
      </h2>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              rounded-3xl
              border border-gray-200
              dark:border-zinc-700
              bg-white
              dark:bg-zinc-900
              p-5
            "
          >
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-900 dark:text-white">
                {t.orders.orderNumber} #{order.id}
              </p>

              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {t.orders.status}: {order.status}
              </p>

              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {t.orders.total}: {order.total_amount.toFixed(2)} zł
              </p>

              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {t.orders.createdAt}:{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <a
  href={`/profile/orders/${order.id}`}
  className="mt-3 inline-flex text-sm text-gray-900 dark:text-white underline"
>
  {t.orders.viewOrder}
</a>
          </div>
        ))}
      </div>
    </section>
  );
}