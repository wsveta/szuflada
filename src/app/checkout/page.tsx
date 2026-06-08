import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import CheckoutForm from "@/components/CheckoutForm";
import { getProducts } from "@/lib/products";
import PageShell from "@/components/PageShell";

export default async function CheckoutPage() {
  const products = await getProducts();

  return (
    <>
      <PageShell>
        <CheckoutForm products={products} />
      </PageShell>
    </>
  );
}