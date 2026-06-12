import SearchResultsContent from "@/components/SearchResultsContent";
import { searchProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import PageShell from "@/components/PageShell";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

const PRODUCTS_PER_PAGE = 24;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", category = "all", page = "1" } = await searchParams;

  const parsedPage = Number(page);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const [{ products, totalCount, totalPages }, categories] = await Promise.all([
    searchProducts({
      query: q,
      category,
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
    }),
    getCategories(),
  ]);

  return (
    <PageShell>
      <SearchResultsContent
        query={q}
        selectedCategory={category}
        products={products}
        categories={categories}
        currentPage={currentPage}
        totalCount={totalCount}
        totalPages={totalPages}
      />
    </PageShell>
  );
}
