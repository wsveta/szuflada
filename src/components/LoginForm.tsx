"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { signInWithGoogle } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginMessages = {
    emailConfirmed:
      language === "pl"
        ? "Adres e-mail został potwierdzony. Możesz się teraz zalogować."
        : "Електронну пошту підтверджено. Тепер можна увійти.",

    passwordReset:
      language === "pl"
        ? "Hasło zostało zmienione. Możesz się teraz zalogować."
        : "Пароль змінено. Тепер можна увійти.",

    emailNotConfirmed:
      language === "pl"
        ? "Najpierw potwierdź swój adres e-mail. Sprawdź skrzynkę pocztową."
        : "Спочатку підтверди електронну пошту. Перевір свою поштову скриньку.",

    googleAuthFailed:
      language === "pl"
        ? "Logowanie przez Google nie powiodło się."
        : "Не вдалося увійти через Google.",
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("confirmed") === "true") {
      setMessage(
        language === "pl"
          ? "Adres e-mail został potwierdzony. Możesz się teraz zalogować."
          : "Електронну пошту підтверджено. Тепер можна увійти.",
      );
    }

    if (params.get("passwordReset") === "true") {
      setMessage(
        language === "pl"
          ? "Hasło zostało zmienione. Możesz się teraz zalogować."
          : "Пароль змінено. Тепер можна увійти.",
      );
    }
  }, [language]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();

    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      const isEmailNotConfirmed = error.message
        .toLowerCase()
        .includes("email not confirmed");

      setErrorMessage(
        isEmailNotConfirmed ? loginMessages.emailNotConfirmed : error.message,
      );

      return;
    }

    router.push("/");
  };

  const handleGoogleAuth = async () => {
    setMessage("");
    setErrorMessage("");

    try {
      await signInWithGoogle();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : loginMessages.googleAuthFailed,
      );
    }
  };

  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t.auth.loginTitle}
      </h1>

      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <input
          type="email"
          placeholder={t.auth.email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        <input
          type="password"
          placeholder={t.auth.password}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
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
          {isSubmitting ? t.auth.loginLoading : t.auth.loginButton}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          {t.auth.noAccount}{" "}
          <Link
            href="/register"
            className="text-gray-900 dark:text-white underline"
          >
            {t.auth.registerLink}
          </Link>
        </p>

        <Link
          href="/forgot-password"
          className="inline-block text-sm text-gray-500 underline hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          {language === "pl" ? "Nie pamiętasz hasła?" : "Не памʼятаєш пароль?"}
        </Link>
      </div>

      <button
        type="button"
        onClick={handleGoogleAuth}
        className="
          mt-6
          w-full rounded-full
          border border-gray-300
          dark:border-zinc-700
          py-3 text-sm
          text-gray-700 dark:text-zinc-200
          hover:bg-gray-100
          dark:hover:bg-zinc-900
        "
      >
        {t.auth.googleLogin}
      </button>
    </section>
  );
}
