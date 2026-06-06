import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToShopLink from "@/components/BackToShopLink";
import { products } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
import DemoBanner from "@/components/DemoBanner";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Товар не знайдено
      </main>
    );
  }

  return (
      <>
          <DemoBanner/>
      <Header />

          <main className="max-w-7xl mx-auto px-6 py-16 bg-white dark:bg-zinc-950">
              <BackToShopLink />

        <div className="mt-8 grid lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900">
            <Image
              src={product.image}
              alt="Product image"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <ProductDetails product={product} />
        </div>
      <Footer />
      </main>

    </>
  );
}