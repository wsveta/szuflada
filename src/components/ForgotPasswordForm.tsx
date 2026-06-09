"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPasswordForm() {
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setErrorMessage(t.auth.invalidEmail);
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      normalizedEmail,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    );

    setIsSubmitting(false);

    if (error) {
      const isRateLimit = error.message
        .toLowerCase()
        .includes("email rate limit");

      setErrorMessage(isRateLimit ? t.auth.emailRateLimit : error.message);
      return;
    }

    setEmail("");
    setMessage(t.auth.forgotPasswordSuccess);
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t.auth.forgotPasswordTitle}
      </h1>

      <p className="mt-4 text-sm text-gray-500 dark:text-zinc-400">
        {t.auth.forgotPasswordDescription}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="email"
          placeholder={t.auth.email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        {message && (
          <p className="text-sm text-green-700 dark:text-green-400">
            {message}
          </p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="w-full rounded-full bg-black py-3 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {isSubmitting
            ? t.auth.forgotPasswordSubmitting
            : t.auth.forgotPasswordSubmit}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-block text-sm text-gray-500 underline hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        {t.auth.forgotPasswordBackToLogin}
      </Link>
    </section>
  );
}
