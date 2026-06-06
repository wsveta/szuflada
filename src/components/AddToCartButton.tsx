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
        className="
          mt-4 w-full rounded-full py-3 text-sm
          bg-black text-white
          dark:bg-white dark:text-black
          transition-all duration-200
          hover:bg-zinc-800
          dark:hover:bg-zinc-200
          hover:-translate-y-0.5
        "
      >
        {t.product.addToCart}
      </button>

      {isModalOpen && (
        <SupportModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}