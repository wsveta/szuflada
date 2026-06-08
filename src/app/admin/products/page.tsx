import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import AdminProductsContent from "@/components/AdminProductsContent";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";

export default async function AdminProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <AdminNav />

        <AdminGuard>
          <AdminProductsContent products={products} categories={categories} />
        </AdminGuard>

        <Footer />
      </main>
    </>
  );
}
