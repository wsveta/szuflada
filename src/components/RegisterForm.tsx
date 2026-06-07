"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { signInWithGoogle } from "@/lib/auth";

export default function RegisterForm() {
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessage(t.auth.registrationSuccess);
  };

  const handleGoogleAuth = async () => {
  await signInWithGoogle();
};

  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t.auth.registerTitle}
      </h1>

      <form onSubmit={handleRegister} className="mt-8 space-y-4">
        <input
          type="email"
          placeholder={t.auth.email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        <input
          type="password"
          placeholder={t.auth.password}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
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
          {isSubmitting
            ? t.auth.registerLoading
            : t.auth.registerButton}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500 dark:text-zinc-400">
        {t.auth.haveAccount}{" "}
        <Link
          href="/login"
          className="text-gray-900 dark:text-white underline"
        >
          {t.auth.loginLink}
        </Link>
      </p>
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