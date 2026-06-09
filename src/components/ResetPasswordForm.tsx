"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

const RECOVERY_CHECK_DELAY_MS = 1000;

export default function ResetPasswordForm() {
  const router = useRouter();
  const { t } = useLanguage();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isRecoverySession, setIsRecoverySession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let recoveryDetected = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        recoveryDetected = true;

        if (!isMounted) {
          return;
        }

        setIsRecoverySession(true);
        setIsCheckingSession(false);
      }
    });

    const checkManualAccess = async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, RECOVERY_CHECK_DELAY_MS),
      );

      if (!isMounted || recoveryDetected) {
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted || recoveryDetected) {
        return;
      }

      setIsRecoverySession(false);
      setIsCheckingSession(false);

      if (session) {
        router.replace("/account");
        return;
      }

      router.replace("/forgot-password");
    };

    void checkManualAccess();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!isRecoverySession) {
      setErrorMessage(t.auth.resetPasswordInvalidSession);
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

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message || t.auth.resetPasswordInvalidSession);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setMessage(t.auth.resetPasswordSuccess);

    await supabase.auth.signOut();

    setTimeout(() => {
      router.replace("/login?passwordReset=true");
    }, 1500);
  };

  if (isCheckingSession) {
    return (
      <section className="mx-auto max-w-md px-4 py-12 sm:px-6 md:py-16">
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          {t.account.loading}
        </p>
      </section>
    );
  }

  if (!isRecoverySession) {
    return null;
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t.auth.resetPasswordTitle}
      </h1>

      <p className="mt-4 text-sm text-gray-500 dark:text-zinc-400">
        {t.auth.resetPasswordDescription}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="password"
          placeholder={t.auth.newPassword}
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
          {isSubmitting
            ? t.auth.resetPasswordSubmitting
            : t.auth.resetPasswordSubmit}
        </button>
      </form>

      <Link
        href="/forgot-password"
        className="mt-6 inline-block text-sm text-gray-500 underline hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        {t.auth.requestNewResetLink}
      </Link>
    </section>
  );
}
