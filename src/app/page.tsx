import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AboutProject from "@/components/AboutProject";
import { getFeaturedProducts } from "@/lib/products";
import PageShell from "@/components/PageShell";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <PageShell>
      <Hero />
      <ProductGrid products={products} />
      <AboutProject />
    </PageShell>
  );
}