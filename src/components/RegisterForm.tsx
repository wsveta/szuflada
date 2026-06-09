"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import { signInWithGoogle } from "@/lib/auth";

export default function RegisterForm() {
  const { language, t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return t.auth.shortPassword;
    }

    if (!/\p{L}/u.test(value)) {
      return t.auth.passwordNeedsLetter;
    }

    if (!/\d/.test(value)) {
      return t.auth.passwordNeedsNumber;
    }

    return "";
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setErrorMessage(t.auth.invalidEmail);
      return;
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(t.auth.passwordsDoNotMatch);
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login?confirmed=true`,
        data: {
          language,
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      const isEmailRateLimit = error.message
        .toLowerCase()
        .includes("email rate limit");

      setErrorMessage(isEmailRateLimit ? t.auth.emailRateLimit : error.message);
      return;
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMessage(t.auth.registerSuccess);
  };

  const handleGoogleAuth = async () => {
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
        {t.auth.registerTitle}
      </h1>

      <form onSubmit={handleRegister} className="mt-8 space-y-4">
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
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        <input
          type="password"
          placeholder={t.auth.confirmPassword}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        <p className="text-xs text-gray-500 dark:text-zinc-400">
          {t.auth.passwordHint}
        </p>

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
          {isSubmitting ? t.auth.registerLoading : t.auth.registerButton}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500 dark:text-zinc-400">
        {t.auth.haveAccount}{" "}
        <Link href="/login" className="text-gray-900 underline dark:text-white">
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
