"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminOrderById } from "@/lib/orders";

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

  if (!order) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p>Loading...</p>
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

      <h1 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">
        Order #{order.id}
      </h1>

      <div className="mt-8 rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6">
        <p>Email: {order.email}</p>

        <p className="mt-2">
          {order.first_name} {order.last_name}
        </p>

        <p className="mt-2">{order.phone}</p>

        <p className="mt-4">
          {order.country}, {order.city}
        </p>

        <p>{order.address_line_1}</p>

        {order.address_line_2 && (
          <p>{order.address_line_2}</p>
        )}
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
            "
          >
            <p className="font-medium">
              {item.product_name}
            </p>

            <p className="mt-2">
              Qty: {item.quantity}
            </p>

            <p>
              Price: {Number(item.unit_price).toFixed(2)} zł
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}