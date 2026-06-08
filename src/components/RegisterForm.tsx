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

  const validationMessages = {
    invalidEmail:
      language === "pl"
        ? "Wpisz poprawny adres e-mail."
        : "Введи коректну електронну пошту.",
    shortPassword:
      language === "pl"
        ? "Hasło musi mieć co najmniej 8 znaków."
        : "Пароль має містити щонайменше 8 символів.",
    passwordNeedsLetter:
      language === "pl"
        ? "Hasło musi zawierać co najmniej jedną literę."
        : "Пароль має містити щонайменше одну літеру.",
    passwordNeedsNumber:
      language === "pl"
        ? "Hasło musi zawierać co najmniej jedną cyfrę."
        : "Пароль має містити щонайменше одну цифру.",
    passwordsDoNotMatch:
      language === "pl" ? "Hasła nie są takie same." : "Паролі не збігаються.",
    googleAuthFailed:
      language === "pl"
        ? "Logowanie przez Google nie powiodło się."
        : "Не вдалося увійти через Google.",
  };

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return validationMessages.shortPassword;
    }

    if (!/\p{L}/u.test(value)) {
      return validationMessages.passwordNeedsLetter;
    }

    if (!/\d/.test(value)) {
      return validationMessages.passwordNeedsNumber;
    }

    return "";
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setErrorMessage(validationMessages.invalidEmail);
      return;
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(validationMessages.passwordsDoNotMatch);
      return;
    }

    setIsSubmitting(true);

   const { error } = await supabase.auth.signUp({
     email: normalizedEmail,
     password,
     options: {
       emailRedirectTo: `${window.location.origin}/login?confirmed=true`,
     },
   });

    setIsSubmitting(false);

    if (error) {
      const isEmailRateLimit = error.message
        .toLowerCase()
        .includes("email rate limit");

      setErrorMessage(
        isEmailRateLimit
          ? language === "pl"
            ? "Wysłano zbyt wiele wiadomości e-mail. Spróbuj ponownie za godzinę."
            : "Надіслано забагато email-листів. Спробуй ще раз приблизно за годину."
          : error.message,
      );

      return;
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMessage(
      language === "pl"
        ? "Konto zostało utworzone. Sprawdź e-mail i potwierdź adres."
        : "Акаунт створено. Перевір пошту й підтверди електронну адресу.",
    );
  };

  const handleGoogleAuth = async () => {
    setErrorMessage("");

    try {
      await signInWithGoogle();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : validationMessages.googleAuthFailed,
      );
    }
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
          placeholder={language === "pl" ? "Powtórz hasło" : "Повтори пароль"}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        <p className="text-xs text-gray-500 dark:text-zinc-400">
          {language === "pl"
            ? "Hasło musi mieć minimum 8 znaków, co najmniej jedną literę i jedną cyfrę."
            : "Пароль має містити мінімум 8 символів, щонайменше одну літеру й одну цифру."}
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
          className="w-full rounded-full bg-black text-white dark:bg-white dark:text-black py-3 text-sm disabled:opacity-50"
        >
          {isSubmitting ? t.auth.registerLoading : t.auth.registerButton}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-500 dark:text-zinc-400">
        {t.auth.haveAccount}{" "}
        <Link href="/login" className="text-gray-900 dark:text-white underline">
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
