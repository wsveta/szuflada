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