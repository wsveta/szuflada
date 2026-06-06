"use client";

import { useState } from "react";
import SupportModal from "./SupportModal";
import { useLanguage } from "@/context/LanguageContext";

export default function AddToCartButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 w-full rounded-full bg-black text-white dark:bg-white dark:text-black py-3 text-sm"
      >
        {t.product.addToCart}
      </button>

      {isModalOpen && <SupportModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
