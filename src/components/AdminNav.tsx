import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex flex-wrap gap-3">
      <Link
        href="/admin/orders"
        className="rounded-full border border-gray-300 dark:border-zinc-700 px-4 py-2 text-sm text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900"
      >
        Orders
      </Link>

      <Link
        href="/admin/products"
        className="rounded-full border border-gray-300 dark:border-zinc-700 px-4 py-2 text-sm text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900"
      >
        Products
      </Link>
      <Link
        href="/admin/categories"
        className="rounded-full border border-gray-300 dark:border-zinc-700 px-4 py-2 text-sm text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900"
      >
        Categories
      </Link>
    </nav>
  );
}