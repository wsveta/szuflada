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