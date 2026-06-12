import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import AdminProductsContent from "@/components/AdminProductsContent";
import { getAdminProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import PageShell from "@/components/PageShell";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();
  const categories = await getCategories();

  return (
    <PageShell>
      <AdminNav />
      <AdminGuard>
        <AdminProductsContent products={products} categories={categories} />
      </AdminGuard>
    </PageShell>
  );
}
