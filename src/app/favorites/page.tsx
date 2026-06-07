import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import { getProducts } from "@/lib/products";
import FavoritesContent from "@/components/FavoritesContent";

export default async function FavoritesPage() {
  const products = await getProducts();

  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <FavoritesContent products={products} />
        <Footer />
      </main>
    </>
  );
}