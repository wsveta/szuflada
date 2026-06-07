"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfileContent() {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {t.auth.profile}
        </h1>

        <p className="mt-4 text-gray-500 dark:text-zinc-400">
          {t.auth.loginRequired}
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3"
        >
          {t.auth.loginButton}
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {t.auth.profile}
      </h1>

      <div className="mt-8 rounded-3xl bg-gray-100 dark:bg-zinc-900 p-6">
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          {t.auth.email}
        </p>

        <p className="mt-2 text-gray-900 dark:text-white">
          {user.email}
        </p>
      </div>
    </section>
  );
}