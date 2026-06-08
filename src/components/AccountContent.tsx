"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";
import {
  getCheckoutProfile,
  upsertCheckoutProfile,
} from "@/lib/checkoutProfiles";
import OrdersList from "@/components/OrdersList";

type Profile = {
  id: string;
  email: string;
  role: "admin" | "customer";
};

type AccountSectionId = "details" | "orders" | "security" | "delivery";

type CollapsibleSectionProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  expandLabel: string;
  collapseLabel: string;
  onToggle: () => void;
  children: ReactNode;
};

function CollapsibleSection({
  title,
  description,
  isOpen,
  expandLabel,
  collapseLabel,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>

        <span
          className="shrink-0 rounded-full
      bg-black px-6 py-3
      text-sm text-white
      hover:bg-zinc-800
      dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {isOpen ? collapseLabel : expandLabel}
        </span>
      </button>

      {isOpen && <div className="mt-6">{children}</div>}
    </section>
  );
}

export default function AccountContent() {
  const router = useRouter();
  const { t } = useLanguage();
  const text = t.account;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [openSections, setOpenSections] = useState<
    Record<AccountSectionId, boolean>
  >({
    details: true,
    orders: false,
    security: false,
    delivery: false,
  });

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [checkoutFormData, setCheckoutFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    country: "",
    city: "",
    postalCode: "",

    addressLine1: "",
    addressLine2: "",
  });

  const [accountErrorMessage, setAccountErrorMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState("");

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isSavingCheckoutDetails, setIsSavingCheckoutDetails] = useState(false);

  const inputClassName = `
    w-full rounded-full border border-gray-300
    bg-white px-4 py-3 text-sm text-gray-900
    outline-none transition-colors
    placeholder:text-gray-400
    focus:border-gray-500
    dark:border-zinc-700 dark:bg-zinc-950 dark:text-white
    dark:placeholder:text-zinc-500 dark:focus:border-zinc-400
  `;

  const toggleSection = (sectionId: AccountSectionId) => {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

  useEffect(() => {
    const loadAccount = async () => {
      setIsLoading(true);
      setAccountErrorMessage("");

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.push("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("id, email, role")
          .eq("id", user.id)
          .single();

        if (error) {
          setAccountErrorMessage(error.message || text.failed);
          return;
        }

        const currentAuthEmail = user.email ?? data.email ?? "";

        setProfile(data as Profile);
        setAuthEmail(currentAuthEmail);
        setNewEmail(currentAuthEmail);

        const checkoutProfile = await getCheckoutProfile(user.id);

        setCheckoutFormData({
          firstName: checkoutProfile?.first_name ?? "",
          lastName: checkoutProfile?.last_name ?? "",
          email: checkoutProfile?.email ?? currentAuthEmail,
          phone: checkoutProfile?.phone ?? "",

          country: checkoutProfile?.country ?? "",
          city: checkoutProfile?.city ?? "",
          postalCode: checkoutProfile?.postal_code ?? "",

          addressLine1: checkoutProfile?.address_line_1 ?? "",
          addressLine2: checkoutProfile?.address_line_2 ?? "",
        });
      } catch (error) {
        setAccountErrorMessage(
          error instanceof Error ? error.message : text.failed,
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAccount();
  }, [router, text.failed]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  };

  const handlePasswordUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordErrorMessage("");

    const passwordError = validatePassword(newPassword);

    if (passwordError) {
      setPasswordErrorMessage(passwordError);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordErrorMessage(text.passwordsDoNotMatch);
      return;
    }

    setIsUpdatingPassword(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setIsUpdatingPassword(false);

    if (error) {
      setPasswordErrorMessage(error.message || text.passwordFailed);
      return;
    }

    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordMessage(text.passwordSuccess);
  };

  const handleEmailUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailMessage("");
    setEmailErrorMessage("");

    const normalizedEmail = newEmail.trim().toLowerCase();
    const currentEmail = authEmail.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setEmailErrorMessage(text.invalidEmail);
      return;
    }

    if (normalizedEmail === currentEmail) {
      setEmailErrorMessage(text.sameEmail);
      return;
    }

    setIsUpdatingEmail(true);

    const { error } = await supabase.auth.updateUser(
      {
        email: normalizedEmail,
      },
      {
        emailRedirectTo: `${window.location.origin}/account`,
      },
    );

    setIsUpdatingEmail(false);

    if (error) {
      const isRateLimit = error.message
        .toLowerCase()
        .includes("email rate limit");

      setEmailErrorMessage(isRateLimit ? text.emailRateLimit : error.message);
      return;
    }

    setEmailMessage(text.emailSuccess);
  };

  const handleCheckoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckoutDetailsUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setCheckoutMessage("");
    setCheckoutErrorMessage("");

    if (!profile) {
      return;
    }

    const checkoutData = {
      firstName: checkoutFormData.firstName.trim(),
      lastName: checkoutFormData.lastName.trim(),
      email: authEmail.trim().toLowerCase(),
      phone: checkoutFormData.phone.trim(),

      country: checkoutFormData.country.trim(),
      city: checkoutFormData.city.trim(),
      postalCode: checkoutFormData.postalCode.trim(),

      addressLine1: checkoutFormData.addressLine1.trim(),
      addressLine2: checkoutFormData.addressLine2.trim(),
    };

    if (
      !checkoutData.firstName ||
      !checkoutData.lastName ||
      !checkoutData.email ||
      !checkoutData.country ||
      !checkoutData.city ||
      !checkoutData.postalCode ||
      !checkoutData.addressLine1
    ) {
      setCheckoutErrorMessage(text.requiredFields);
      return;
    }

    setIsSavingCheckoutDetails(true);

    try {
      await upsertCheckoutProfile({
        user_id: profile.id,

        first_name: checkoutData.firstName,
        last_name: checkoutData.lastName,
        email: checkoutData.email,
        phone: checkoutData.phone,

        address_line_1: checkoutData.addressLine1,
        address_line_2: checkoutData.addressLine2,
        city: checkoutData.city,
        postal_code: checkoutData.postalCode,
        country: checkoutData.country,

        note: "",
      });

      setCheckoutFormData((current) => ({
        ...current,
        ...checkoutData,
        postalCode: checkoutData.postalCode,
        addressLine1: checkoutData.addressLine1,
        addressLine2: checkoutData.addressLine2,
      }));

      setCheckoutMessage(text.checkoutSuccess);
    } catch (error) {
      setCheckoutErrorMessage(
        error instanceof Error ? error.message : text.checkoutFailed,
      );
    } finally {
      setIsSavingCheckoutDetails(false);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="text-gray-500 dark:text-zinc-400">{text.loading}</p>
      </section>
    );
  }

  if (accountErrorMessage) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <p className="text-sm text-red-600 dark:text-red-400">
          {accountErrorMessage}
        </p>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        {text.title}
      </h1>

      <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              {text.email}
            </p>

            <p className="mt-1 font-medium text-gray-900 dark:text-white">
              {authEmail || profile.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              {text.role}
            </p>

            <p className="mt-1 font-medium text-gray-900 dark:text-white">
              {profile.role === "admin" ? text.admin : text.customer}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="
            mt-8 rounded-full
            bg-black px-6 py-3 text-sm text-white
            hover:bg-zinc-800
            dark:bg-white dark:text-black dark:hover:bg-zinc-200
          "
        >
          {text.logout}
        </button>
      </section>

      <CollapsibleSection
        title={text.ordersTitle}
        description={text.ordersDescription}
        isOpen={openSections.orders}
        expandLabel={text.expand}
        collapseLabel={text.collapse}
        onToggle={() => toggleSection("orders")}
      >
        <div className="[&_h2]:sr-only">
          <OrdersList />
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title={text.securityTitle}
        description={text.securityDescription}
        isOpen={openSections.security}
        expandLabel={text.expand}
        collapseLabel={text.collapse}
        onToggle={() => toggleSection("security")}
      >
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {text.passwordTitle}
          </h3>

          <input
            type="password"
            placeholder={text.newPassword}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className={inputClassName}
          />

          <input
            type="password"
            placeholder={text.confirmNewPassword}
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className={inputClassName}
          />

          <p className="text-xs text-gray-500 dark:text-zinc-400">
            {text.passwordHint}
          </p>

          {passwordMessage && (
            <p className="text-sm text-green-700 dark:text-green-400">
              {passwordMessage}
            </p>
          )}

          {passwordErrorMessage && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {passwordErrorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="rounded-full bg-black px-6 py-3 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {isUpdatingPassword ? text.passwordSubmitting : text.passwordSubmit}
          </button>
        </form>

        <form
          onSubmit={handleEmailUpdate}
          className="mt-8 space-y-4 border-t border-gray-200 pt-6 dark:border-zinc-700"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {text.emailTitle}
          </h3>

          <input
            type="email"
            placeholder={text.newEmail}
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            required
            autoComplete="email"
            className={inputClassName}
          />

          {emailMessage && (
            <p className="text-sm text-green-700 dark:text-green-400">
              {emailMessage}
            </p>
          )}

          {emailErrorMessage && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {emailErrorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isUpdatingEmail}
            className="rounded-full bg-black px-6 py-3 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {isUpdatingEmail ? text.emailSubmitting : text.emailSubmit}
          </button>
        </form>
      </CollapsibleSection>

      <CollapsibleSection
        title={text.checkoutTitle}
        description={text.checkoutDescription}
        isOpen={openSections.delivery}
        expandLabel={text.expand}
        collapseLabel={text.collapse}
        onToggle={() => toggleSection("delivery")}
      >
        <form onSubmit={handleCheckoutDetailsUpdate} className="space-y-4">
          <input
            name="firstName"
            placeholder={text.firstName}
            value={checkoutFormData.firstName}
            onChange={handleCheckoutChange}
            required
            className={inputClassName}
          />

          <input
            name="lastName"
            placeholder={text.lastName}
            value={checkoutFormData.lastName}
            onChange={handleCheckoutChange}
            required
            className={inputClassName}
          />

          <input
            name="email"
            type="email"
            placeholder={text.email}
            value={authEmail}
            readOnly
            className="
              w-full rounded-full border border-gray-300
              bg-gray-100 px-4 py-3 text-sm text-gray-500
              outline-none read-only:cursor-not-allowed
              dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400
            "
          />

          <input
            name="phone"
            placeholder={text.phone}
            value={checkoutFormData.phone}
            onChange={handleCheckoutChange}
            className={inputClassName}
          />

          <input
            name="country"
            placeholder={text.country}
            value={checkoutFormData.country}
            onChange={handleCheckoutChange}
            required
            className={inputClassName}
          />

          <input
            name="city"
            placeholder={text.city}
            value={checkoutFormData.city}
            onChange={handleCheckoutChange}
            required
            className={inputClassName}
          />

          <input
            name="postalCode"
            placeholder={text.postalCode}
            value={checkoutFormData.postalCode}
            onChange={handleCheckoutChange}
            required
            className={inputClassName}
          />

          <input
            name="addressLine1"
            placeholder={text.addressLine1}
            value={checkoutFormData.addressLine1}
            onChange={handleCheckoutChange}
            required
            className={inputClassName}
          />

          <input
            name="addressLine2"
            placeholder={text.addressLine2}
            value={checkoutFormData.addressLine2}
            onChange={handleCheckoutChange}
            className={inputClassName}
          />

          {checkoutMessage && (
            <p className="text-sm text-green-700 dark:text-green-400">
              {checkoutMessage}
            </p>
          )}

          {checkoutErrorMessage && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {checkoutErrorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSavingCheckoutDetails}
            className="w-full rounded-full bg-black py-3 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {isSavingCheckoutDetails
              ? text.checkoutSubmitting
              : text.checkoutSubmit}
          </button>
        </form>
      </CollapsibleSection>
    </section>
  );
}
