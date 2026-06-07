"use client";

import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, type Order } from "@/lib/orders";
import Link from "next/link";

export default function AdminOrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

const handleStatusChange = async (orderId: number, status: string) => {
  try {
    await updateOrderStatus(orderId, status);

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">Loading...</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-gray-500 dark:text-zinc-400">
          No orders found.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="
                rounded-3xl
                border border-gray-200
                dark:border-zinc-700
                bg-white
                dark:bg-zinc-900
                p-6
              "
            >
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Order #{order.id}
                </p>

                <select
  value={order.status}
  onChange={(event) =>
    handleStatusChange(order.id, event.target.value)
  }
  className="
    mt-2 w-fit rounded-full
    border border-gray-300
    dark:border-zinc-700
    bg-white dark:bg-zinc-950
    px-4 py-2 text-sm
    text-gray-900 dark:text-white
  "
>
  {statuses.map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ))}
</select>

                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Total: {Number(order.total_amount).toFixed(2)} zł
                </p>

                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Date: {new Date(order.created_at).toLocaleDateString()}
                </p>
                <Link
  href={`/admin/orders/${order.id}`}
  className="
    mt-3 inline-flex text-sm
    text-gray-900 dark:text-white
    underline
  "
>
  View details
</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}