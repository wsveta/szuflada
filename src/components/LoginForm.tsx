"use client";

import { useState } from "react";
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

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/");
  };

  const handleGoogleAuth = async () => {
  await signInWithGoogle();
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
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        <input
          type="password"
          placeholder={t.auth.password}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

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
            ? t.auth.loginLoading
            : t.auth.loginButton}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500 dark:text-zinc-400">
        {t.auth.noAccount}{" "}
        <Link
          href="/register"
          className="text-gray-900 dark:text-white underline"
        >
          {t.auth.registerLink}
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