"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminOrderById, updateOrderStatus } from "@/lib/orders";

const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

export default function AdminOrderDetailsContent({
  orderId,
}: {
  orderId: number;
}) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const loadOrder = async () => {
      const data = await getAdminOrderById(orderId);
      setOrder(data);
    };

    loadOrder();
  }, [orderId]);

  const handleStatusChange = async (status: string) => {
    if (!order) return;

    await updateOrderStatus(order.id, status);

    setOrder({
      ...order,
      status,
    });
  };

  if (!order) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">Loading...</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <Link
        href="/admin/orders"
        className="text-sm text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        ← Back to orders
      </Link>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Order #{order.id}
        </h1>

        <span className="w-fit rounded-full bg-gray-100 dark:bg-zinc-900 px-4 py-2 text-sm text-gray-700 dark:text-zinc-200">
          {order.status}
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6 text-gray-700 dark:text-zinc-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Customer
          </h2>

          <p className="mt-4">Email: {order.email}</p>

          <p className="mt-2">
            Name: {order.first_name} {order.last_name}
          </p>

          {order.phone && <p className="mt-2">Phone: {order.phone}</p>}
        </div>

        <div className="rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6 text-gray-700 dark:text-zinc-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Delivery address
          </h2>

          <p className="mt-4">
            {order.country}, {order.city}, {order.postal_code}
          </p>

          <p className="mt-2">{order.address_line_1}</p>

          {order.address_line_2 && (
            <p className="mt-2">{order.address_line_2}</p>
          )}
        </div>

        <div className="rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6 text-gray-700 dark:text-zinc-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Order info
          </h2>

          <p className="mt-4">
            Delivery method: {order.delivery_method}
          </p>

          <p className="mt-2">
            Payment method: {order.payment_method}
          </p>

          <p className="mt-2">
            Total: {Number(order.total_amount).toFixed(2)} zł
          </p>

          <p className="mt-2">
            Date: {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6 text-gray-700 dark:text-zinc-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Change status
          </h2>

          <select
            value={order.status}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="
              mt-4 w-full rounded-full
              border border-gray-300
              dark:border-zinc-700
              bg-white dark:bg-zinc-950
              px-4 py-3 text-sm
              text-gray-900 dark:text-white
            "
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
        Products
      </h2>

      <div className="mt-6 space-y-4">
        {order.items.map((item: any) => (
          <div
            key={item.id}
            className="
              rounded-2xl
              border border-gray-200
              dark:border-zinc-700
              bg-white dark:bg-zinc-900
              p-4
              text-gray-700 dark:text-zinc-200
            "
          >
            <p className="font-medium text-gray-900 dark:text-white">
              {item.product_name}
            </p>

            <p className="mt-2">Qty: {item.quantity}</p>

            <p>Price: {Number(item.unit_price).toFixed(2)} zł</p>

            <p>
              Subtotal:{" "}
              {(Number(item.unit_price) * item.quantity).toFixed(2)} zł
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}