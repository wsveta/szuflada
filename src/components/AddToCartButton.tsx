"use client";

import { useState } from "react";
import SupportModal from "./SupportModal";

export default function AddToCartButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 w-full rounded-full bg-black text-white py-3 text-sm"
      >
        Додати в кошик
      </button>

      {isModalOpen && (
        <SupportModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}