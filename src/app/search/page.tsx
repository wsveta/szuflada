import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import SearchResultsContent from "@/components/SearchResultsContent";
import { searchProducts } from "@/lib/products";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", category = "all" } = await searchParams;

  const products = await searchProducts({
    query: q,
    category,
  });

  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <SearchResultsContent
          query={q}
          selectedCategory={category}
          products={products}
        />

        <Footer />
      </main>
    </>
  );
}