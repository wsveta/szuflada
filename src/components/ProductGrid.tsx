"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import SupportModal from "./SupportModal";
import { products } from "@/data/products";

export default function ProductGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">
            Каталог
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Популярні товари
          </h2>
        </div>

        <button className="text-sm text-gray-500">Переглянути всі →</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => setIsModalOpen(true)}
          />
        ))}
      </div>

      {isModalOpen && (
        <SupportModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}