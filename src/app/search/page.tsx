import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import SearchResultsContent from "@/components/SearchResultsContent";
import { searchProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", category = "all" } = await searchParams;

  const [products, categories] = await Promise.all([
    searchProducts({
      query: q,
      category,
    }),
    getCategories(),
  ]);

  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <SearchResultsContent
          query={q}
          selectedCategory={category}
          products={products}
          categories={categories}
        />

        <Footer />
      </main>
    </>
  );
}
