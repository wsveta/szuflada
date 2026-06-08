"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import {
  getCheckoutProfile,
  upsertCheckoutProfile,
} from "@/lib/checkoutProfiles";
import type { Product } from "@/types/product";

type CheckoutFormProps = {
  products: Product[];
};

export default function CheckoutForm({ products }: CheckoutFormProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { items, clearCart } = useCart();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    country: "",
    city: "",
    postalCode: "",

    addressLine1: "",
    addressLine2: "",

    deliveryMethod: "courier",
    paymentMethod: "bank_transfer",
  });

  const text = {
    loadingProfile:
      language === "pl"
        ? "Ładowanie danych dostawy..."
        : "Завантаження даних доставки...",
    profileLoadFailed:
      language === "pl"
        ? "Nie udało się załadować zapisanych danych."
        : "Не вдалося завантажити збережені дані.",
    profileSaveFailed:
      language === "pl"
        ? "Nie udało się zapisać danych dostawy."
        : "Не вдалося зберегти дані доставки.",
    requiredFields:
      language === "pl"
        ? "Uzupełnij wszystkie wymagane pola."
        : "Заповни всі обовʼязкові поля.",
    orderCreationFailed:
      language === "pl"
        ? "Nie udało się utworzyć zamówienia."
        : "Не вдалося створити замовлення.",
  };

  const inputClassName = `
    w-full rounded-full border border-gray-300
    bg-white px-4 py-3 text-sm text-gray-900
    outline-none transition-colors
    placeholder:text-gray-400
    focus:border-gray-500
    dark:border-zinc-700 dark:bg-zinc-900 dark:text-white
    dark:placeholder:text-zinc-500 dark:focus:border-zinc-400
  `;

  useEffect(() => {
    let isMounted = true;

    const loadCheckoutProfile = async () => {
      if (!user) {
        return;
      }

      setIsLoadingProfile(true);
      setErrorMessage("");

      try {
        const checkoutProfile = await getCheckoutProfile(user.id);

        if (!isMounted) {
          return;
        }

        if (checkoutProfile) {
          setFormData((current) => ({
            ...current,
            firstName: checkoutProfile.first_name ?? "",
            lastName: checkoutProfile.last_name ?? "",
            email: checkoutProfile.email ?? user.email ?? "",
            phone: checkoutProfile.phone ?? "",

            country: checkoutProfile.country ?? "",
            city: checkoutProfile.city ?? "",
            postalCode: checkoutProfile.postal_code ?? "",

            addressLine1: checkoutProfile.address_line_1 ?? "",
            addressLine2: checkoutProfile.address_line_2 ?? "",
          }));
        } else if (user.email) {
          setFormData((current) => ({
            ...current,
            email: user.email ?? "",
          }));
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : text.profileLoadFailed,
        );
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    };

    loadCheckoutProfile();

    return () => {
      isMounted = false;
    };
  }, [user, text.profileLoadFailed]);

  const cartProducts = items
    .map((item) => {
      const product = products.find((product) => product.id === item.productId);

      if (!product) return null;

      return {
        product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean) as { product: Product; quantity: number }[];

  const totalAmount = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!user) {
      router.push("/login");
      return;
    }

    if (cartProducts.length === 0) {
      setErrorMessage(t.cart.empty);
      return;
    }

    const checkoutData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),

      country: formData.country.trim(),
      city: formData.city.trim(),
      postalCode: formData.postalCode.trim(),

      addressLine1: formData.addressLine1.trim(),
      addressLine2: formData.addressLine2.trim(),

      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
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
      setErrorMessage(text.requiredFields);
      return;
    }

    setIsSubmitting(true);

    try {
      await upsertCheckoutProfile({
        user_id: user.id,

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
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage(
        error instanceof Error ? error.message : text.profileSaveFailed,
      );
      return;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        email: checkoutData.email,
        first_name: checkoutData.firstName,
        last_name: checkoutData.lastName,
        phone: checkoutData.phone || null,
        country: checkoutData.country,
        city: checkoutData.city,
        postal_code: checkoutData.postalCode,
        address_line_1: checkoutData.addressLine1,
        address_line_2: checkoutData.addressLine2 || null,
        delivery_method: checkoutData.deliveryMethod,
        payment_method: checkoutData.paymentMethod,
        total_amount: totalAmount,
        status: "pending",
      })
      .select("id")
      .single();

    if (orderError || !order) {
      setIsSubmitting(false);
      setErrorMessage(orderError?.message ?? text.orderCreationFailed);
      return;
    }

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(
        cartProducts.map(({ product, quantity }) => ({
          order_id: order.id,
          product_slug: product.slug,
          product_name: product.name[language],
          quantity,
          unit_price: product.price,
        })),
      );

    if (orderItemsError) {
      setIsSubmitting(false);
      setErrorMessage(orderItemsError.message);
      return;
    }

    await clearCart();

    setIsSubmitting(false);
    router.push(`/order-success?order=${order.id}`);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        {t.checkout.title}
      </h1>

      {isLoadingProfile && (
        <p className="mt-4 text-sm text-gray-500 dark:text-zinc-400">
          {text.loadingProfile}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-10 space-y-4">
        <input
          name="firstName"
          placeholder={t.checkout.firstName}
          value={formData.firstName}
          onChange={handleChange}
          required
          className={inputClassName}
        />

        <input
          name="lastName"
          placeholder={t.checkout.lastName}
          value={formData.lastName}
          onChange={handleChange}
          required
          className={inputClassName}
        />

        <input
          name="email"
          type="email"
          placeholder={t.checkout.email}
          value={formData.email}
          onChange={handleChange}
          required
          readOnly={Boolean(user?.email)}
          className="
            w-full rounded-full border border-gray-300
            bg-white px-4 py-3 text-sm text-gray-900
            outline-none transition-colors
            placeholder:text-gray-400
            read-only:cursor-not-allowed read-only:bg-gray-100
            focus:border-gray-500
            dark:border-zinc-700 dark:bg-zinc-900 dark:text-white
            dark:placeholder:text-zinc-500 dark:read-only:bg-zinc-800
            dark:focus:border-zinc-400
          "
        />

        <input
          name="phone"
          placeholder={t.checkout.phone}
          value={formData.phone}
          onChange={handleChange}
          className={inputClassName}
        />

        <input
          name="country"
          placeholder={t.checkout.country}
          value={formData.country}
          onChange={handleChange}
          required
          className={inputClassName}
        />

        <input
          name="city"
          placeholder={t.checkout.city}
          value={formData.city}
          onChange={handleChange}
          required
          className={inputClassName}
        />

        <input
          name="postalCode"
          placeholder={t.checkout.postalCode}
          value={formData.postalCode}
          onChange={handleChange}
          required
          className={inputClassName}
        />

        <input
          name="addressLine1"
          placeholder={t.checkout.addressLine1}
          value={formData.addressLine1}
          onChange={handleChange}
          required
          className={inputClassName}
        />

        <input
          name="addressLine2"
          placeholder={t.checkout.addressLine2}
          value={formData.addressLine2}
          onChange={handleChange}
          className={inputClassName}
        />

        <select
          name="deliveryMethod"
          value={formData.deliveryMethod}
          onChange={handleChange}
          className={inputClassName}
        >
          <option value="courier">{t.checkout.courier}</option>
          <option value="parcel_locker">{t.checkout.parcelLocker}</option>
        </select>

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className={inputClassName}
        >
          <option value="bank_transfer">{t.checkout.bankTransfer}</option>
          <option value="cash_on_delivery">{t.checkout.cashOnDelivery}</option>
        </select>

        <div className="rounded-3xl bg-gray-100 p-5 dark:bg-zinc-900">
          <div className="flex justify-between text-gray-600 dark:text-zinc-300">
            <span>{t.cart.total}</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalAmount.toFixed(2)} zł
            </span>
          </div>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-black py-3 text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {isSubmitting ? "..." : t.checkout.placeOrder}
        </button>
      </form>
    </section>
  );
}
