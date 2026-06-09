import { getProducts } from "@/lib/products";
import FavoritesContent from "@/components/FavoritesContent";
import PageShell from "@/components/PageShell";

export default async function FavoritesPage() {
  const products = await getProducts();

  return (
    <>
      <PageShell>
        <FavoritesContent products={products} />
      </PageShell>
    </>
  );
}