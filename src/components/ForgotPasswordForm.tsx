"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPasswordForm() {
  const { language, t } = useLanguage();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const text = {
    title: language === "pl" ? "Przywracanie hasła" : "Відновлення паролю",
    description:
      language === "pl"
        ? "Wpisz adres e-mail, a wyślemy link do ustawienia nowego hasła."
        : "Введи електронну пошту, і ми надішлемо посилання для створення нового паролю.",
    success:
      language === "pl"
        ? "Jeśli konto istnieje, link do zmiany hasła został wysłany na e-mail."
        : "Якщо акаунт існує, посилання для зміни паролю надіслано на пошту.",
    invalidEmail:
      language === "pl"
        ? "Wpisz poprawny adres e-mail."
        : "Введи коректну електронну пошту.",
    rateLimit:
      language === "pl"
        ? "Wysłano zbyt wiele wiadomości e-mail. Spróbuj ponownie później."
        : "Надіслано забагато email-листів. Спробуй ще раз пізніше.",
    submit: language === "pl" ? "Wyślij link" : "Надіслати посилання",
    submitting: language === "pl" ? "Wysyłanie..." : "Надсилання...",
    backToLogin:
      language === "pl" ? "Wróć do logowania" : "Повернутись до входу",
  };

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setErrorMessage(text.invalidEmail);
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

      setErrorMessage(isRateLimit ? text.rateLimit : error.message);
      return;
    }

    setEmail("");
    setMessage(text.success);
  };

  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {text.title}
      </h1>

      <p className="mt-4 text-sm text-gray-500 dark:text-zinc-400">
        {text.description}
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
          className="w-full rounded-full bg-black text-white dark:bg-white dark:text-black py-3 text-sm disabled:opacity-50"
        >
          {isSubmitting ? text.submitting : text.submit}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-block text-sm text-gray-500 underline hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        {text.backToLogin}
      </Link>
    </section>
  );
}
