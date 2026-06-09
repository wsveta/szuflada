import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import AdminCategoriesContent from "@/components/AdminCategoriesContent";
import { getCategories } from "@/lib/categories";
import PageShell from "@/components/PageShell";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <PageShell>
        <AdminNav />
        <AdminGuard>
          <AdminCategoriesContent categories={categories} />
        </AdminGuard>
      </PageShell>
    </>
  );
}
