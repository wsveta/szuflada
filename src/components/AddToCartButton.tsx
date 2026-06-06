"use client";

import { useState } from "react";
import SupportModal from "./SupportModal";
import { useLanguage } from "@/context/LanguageContext";

type AddToCartButtonProps = {
  disabled?: boolean;
};

export default function AddToCartButton({
  disabled = false,
}: AddToCartButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setIsModalOpen(true)}
        className={`
          mt-4 w-full rounded-full py-3 text-sm
          transition-all duration-200
          ${
            disabled
              ? "bg-gray-300 text-gray-500 dark:bg-zinc-700 dark:text-zinc-400 cursor-not-allowed"
              : `
                bg-black text-white
                dark:bg-white dark:text-black
                hover:bg-zinc-800
                dark:hover:bg-zinc-200
                hover:-translate-y-0.5
              `
          }
        `}
      >
        {disabled ? t.product.outOfStock : t.product.addToCart}
      </button>

      {!disabled && isModalOpen && (
        <SupportModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}