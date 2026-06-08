import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToShopLink from "@/components/BackToShopLink";
import ProductDetails from "@/components/ProductDetails";
import DemoBanner from "@/components/DemoBanner";
import { getProductBySlug } from "@/lib/products";

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
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <BackToShopLink />

          <div className="mt-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900">
              <Image
                src={product.images[0] ?? "/products/placeholder.png"}
                alt="Product image"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <ProductDetails product={product} />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}