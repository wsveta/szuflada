import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import CheckoutForm from "@/components/CheckoutForm";
import { getProducts } from "@/lib/products";

export default async function CheckoutPage() {
  const products = await getProducts();

  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <CheckoutForm products={products} />
        <Footer />
      </main>
    </>
  );
}