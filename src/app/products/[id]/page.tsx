"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { language, t } = useLanguage();

  const product = products.find((product) => product.id === params.id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        {t.product.notFound}
      </main>
    );
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-gray-500 hover:text-black">
          {t.product.backToShop}
        </Link>

        <div className="mt-8 grid lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name[language]}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              {product.name[language]}
            </h1>

            <p className="mt-4 text-2xl">
              {product.price.toFixed(2)} zł
            </p>

            <p className="mt-6 text-gray-600">
              {product.description[language]}
            </p>

            <div className="mt-4 max-w-xs">
              <AddToCartButton />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}