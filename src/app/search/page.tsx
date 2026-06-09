import SearchResultsContent from "@/components/SearchResultsContent";
import { searchProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import PageShell from "@/components/PageShell";

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
      <PageShell>
        <SearchResultsContent
          query={q}
          selectedCategory={category}
          products={products}
          categories={categories}
        />
      </PageShell>
    </>
  );
}
