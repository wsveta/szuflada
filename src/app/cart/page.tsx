import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import { getProducts } from "@/lib/products";
import CartContent from "@/components/CartContent";
export default async function CartPage() {
  const products = await getProducts();

  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <CartContent products={products} />
        <Footer />
      </main>
    </>
  );
}