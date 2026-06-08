import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToShopLink from "@/components/BackToShopLink";
import ProductDetails from "@/components/ProductDetails";
import DemoBanner from "@/components/DemoBanner";
import { getProductBySlug } from "@/lib/products";
import PageShell from "@/components/PageShell";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProductBySlug(id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 text-gray-900 dark:text-white">
        Товар не знайдено
      </main>
    );
  }

  return (
    <>
      <PageShell>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <BackToShopLink />
          <ProductDetails product={product} />
        </section>
      </PageShell>
    </>
  );
}