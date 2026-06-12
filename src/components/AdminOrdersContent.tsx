"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllOrders, updateOrderStatus, type Order } from "@/lib/orders";

const ORDERS_PER_PAGE = 9;

const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];

export default function AdminOrdersContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);

        const data = await getAllOrders({
          page: currentPage,
          limit: ORDERS_PER_PAGE,
        });

        setOrders(data.orders);
        setTotalCount(data.totalCount);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [currentPage]);

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

  const firstVisibleOrder =
    orders.length > 0 ? (currentPage - 1) * ORDERS_PER_PAGE + 1 : 0;

  const lastVisibleOrder = Math.min(currentPage * ORDERS_PER_PAGE, totalCount);

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">Loading...</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Orders
          </h1>

          <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">
            {totalCount > 0
              ? `Showing ${firstVisibleOrder}–${lastVisibleOrder} of ${totalCount}`
              : "No orders found."}
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="mt-6 text-gray-500 dark:text-zinc-400">
          No orders found.
        </p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
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

          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="
                  rounded-full border border-gray-300 px-4 py-2 text-sm
                  text-gray-700 transition-colors
                  hover:bg-gray-100
                  disabled:cursor-not-allowed disabled:opacity-40
                  dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900
                "
              >
                ←
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                className="
                  rounded-full border border-gray-300 px-4 py-2 text-sm
                  text-gray-700 transition-colors
                  hover:bg-gray-100
                  disabled:cursor-not-allowed disabled:opacity-40
                  dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900
                "
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
