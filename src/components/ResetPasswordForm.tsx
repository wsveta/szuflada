"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { language } = useLanguage();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const text = {
    title: language === "pl" ? "Ustaw nowe hasło" : "Створи новий пароль",
    description:
      language === "pl"
        ? "Wpisz nowe hasło do swojego konta."
        : "Введи новий пароль для свого акаунту.",
    password: language === "pl" ? "Nowe hasło" : "Новий пароль",
    confirmPassword:
      language === "pl" ? "Powtórz nowe hasło" : "Повтори новий пароль",
    passwordHint:
      language === "pl"
        ? "Hasło musi mieć minimum 8 znaków, co najmniej jedną literę i jedną cyfrę."
        : "Пароль має містити мінімум 8 символів, щонайменше одну літеру й одну цифру.",
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
    success:
      language === "pl"
        ? "Hasło zostało zmienione. Możesz się teraz zalogować."
        : "Пароль змінено. Тепер можна увійти.",
    failed:
      language === "pl"
        ? "Nie udało się zmienić hasła."
        : "Не вдалося змінити пароль.",
    invalidSession:
      language === "pl"
        ? "Link do zmiany hasła jest nieaktywny albo wygasł. Spróbuj wysłać go ponownie."
        : "Посилання для зміни паролю неактивне або протерміноване. Спробуй надіслати його ще раз.",
    submit: language === "pl" ? "Zmień hasło" : "Змінити пароль",
    submitting: language === "pl" ? "Zapisywanie..." : "Збереження...",
    requestNewLink:
      language === "pl" ? "Wyślij nowy link" : "Надіслати нове посилання",
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return text.shortPassword;
    }

    if (!/\p{L}/u.test(value)) {
      return text.passwordNeedsLetter;
    }

    if (!/\d/.test(value)) {
      return text.passwordNeedsNumber;
    }

    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const passwordError = validatePassword(password);

    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(text.passwordsDoNotMatch);
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message || text.invalidSession);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setMessage(text.success);

    await supabase.auth.signOut();

    setTimeout(() => {
      router.push("/login?passwordReset=true");
    }, 1500);
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
          type="password"
          placeholder={text.password}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        <input
          type="password"
          placeholder={text.confirmPassword}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
        />

        <p className="text-xs text-gray-500 dark:text-zinc-400">
          {text.passwordHint}
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
          {isSubmitting ? text.submitting : text.submit}
        </button>
      </form>

      <Link
        href="/forgot-password"
        className="mt-6 inline-block text-sm text-gray-500 underline hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        {text.requestNewLink}
      </Link>
    </section>
  );
}
