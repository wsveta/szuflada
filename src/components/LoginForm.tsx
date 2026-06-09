"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { signInWithGoogle } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("confirmed") === "true") {
      setMessage(t.auth.loginEmailConfirmed);
    }

    if (params.get("passwordReset") === "true") {
      setMessage(t.auth.loginPasswordReset);
    }
  }, [t.auth.loginEmailConfirmed, t.auth.loginPasswordReset]);

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
        isEmailNotConfirmed ? t.auth.loginEmailNotConfirmed : error.message,
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
        error instanceof Error ? error.message : t.auth.googleAuthFailed,
      );
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12 sm:px-6 md:py-16">
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
          className="w-full rounded-full bg-black py-3 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {isSubmitting ? t.auth.loginLoading : t.auth.loginButton}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          {t.auth.noAccount}{" "}
          <Link
            href="/register"
            className="text-gray-900 underline dark:text-white"
          >
            {t.auth.registerLink}
          </Link>
        </p>

        <Link
          href="/forgot-password"
          className="inline-block text-sm text-gray-500 underline hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          {t.auth.forgotPasswordLink}
        </Link>
      </div>

      <button
        type="button"
        onClick={handleGoogleAuth}
        className="
          mt-6
          w-full rounded-full
          border border-gray-300
          py-3 text-sm
          text-gray-700
          hover:bg-gray-100
          dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900
        "
      >
        {t.auth.googleLogin}
      </button>
    </section>
  );
}
