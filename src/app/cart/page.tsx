import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import { getProducts } from "@/lib/products";
import CartContent from "@/components/CartContent";
import PageShell from "@/components/PageShell";
export default async function CartPage() {
  const products = await getProducts();

  return (
    <>
     <PageShell>
        <CartContent products={products} />
        </PageShell>
    </>
  );
}