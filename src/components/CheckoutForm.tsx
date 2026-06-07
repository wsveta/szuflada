"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
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

  useEffect(() => {
    if (user?.email) {
      setFormData((current) => ({
        ...current,
        email: user.email ?? "",
      }));
    }
  }, [user]);

  const cartProducts = items
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) return null;

      return {
        product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean) as { product: Product; quantity: number }[];

  const totalAmount = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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

    setIsSubmitting(true);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || null,
        country: formData.country,
        city: formData.city,
        postal_code: formData.postalCode,
        address_line_1: formData.addressLine1,
        address_line_2: formData.addressLine2 || null,
        delivery_method: formData.deliveryMethod,
        payment_method: formData.paymentMethod,
        total_amount: totalAmount,
        status: "pending",
      })
      .select("id")
      .single();

    if (orderError || !order) {
      setIsSubmitting(false);
      setErrorMessage(orderError?.message ?? "Order creation failed");
      return;
    }

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(
        cartProducts.map(({ product, quantity }) => ({
          order_id: order.id,
          product_slug: product.id,
          product_name: product.name[language],
          quantity,
          unit_price: product.price,
        }))
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
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {t.checkout.title}
      </h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4">
        <input
          name="firstName"
          placeholder={t.checkout.firstName}
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        />

        <input
          name="lastName"
          placeholder={t.checkout.lastName}
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
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
            dark:border-zinc-700
            bg-white dark:bg-zinc-900
            px-4 py-3
            read-only:bg-gray-100
            dark:read-only:bg-zinc-800
            read-only:cursor-not-allowed
          "
        />

        <input
          name="phone"
          placeholder={t.checkout.phone}
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        />

        <input
          name="country"
          placeholder={t.checkout.country}
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        />

        <input
          name="city"
          placeholder={t.checkout.city}
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        />

        <input
          name="postalCode"
          placeholder={t.checkout.postalCode}
          value={formData.postalCode}
          onChange={handleChange}
          required
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        />

        <input
          name="addressLine1"
          placeholder={t.checkout.addressLine1}
          value={formData.addressLine1}
          onChange={handleChange}
          required
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        />

        <input
          name="addressLine2"
          placeholder={t.checkout.addressLine2}
          value={formData.addressLine2}
          onChange={handleChange}
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        />

        <select
          name="deliveryMethod"
          value={formData.deliveryMethod}
          onChange={handleChange}
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        >
          <option value="courier">{t.checkout.courier}</option>
          <option value="parcel_locker">{t.checkout.parcelLocker}</option>
        </select>

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
        >
          <option value="bank_transfer">{t.checkout.bankTransfer}</option>
          <option value="cash_on_delivery">{t.checkout.cashOnDelivery}</option>
        </select>

        <div className="rounded-3xl bg-gray-100 dark:bg-zinc-900 p-5">
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
          className="w-full rounded-full bg-black text-white dark:bg-white dark:text-black py-3 disabled:opacity-50"
        >
          {isSubmitting ? "..." : t.checkout.placeOrder}
        </button>
      </form>
    </section>
  );
}