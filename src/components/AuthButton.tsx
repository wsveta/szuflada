"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AuthButton() {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="text-sm text-gray-400 dark:text-zinc-500">
        ...
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="
          px-4 py-2 rounded-full
          border border-gray-300
          text-gray-700
          hover:text-black
          hover:bg-gray-50
          dark:border-zinc-300
          dark:text-zinc-200
          dark:hover:bg-zinc-900
          dark:hover:text-white
        "
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/profile"
        className="
          text-sm
          text-gray-700
          hover:text-black
          dark:text-zinc-200
          dark:hover:text-white
        "
      >
        {user.email}
      </Link>

      <button
        onClick={signOut}
        className="
          text-sm
          text-gray-500
          hover:text-red-600
          dark:text-zinc-400
          dark:hover:text-red-400
        "
      >
        Logout
      </button>
    </div>
  );
}