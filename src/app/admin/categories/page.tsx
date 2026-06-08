import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import AdminCategoriesContent from "@/components/AdminCategoriesContent";
import { getCategories } from "@/lib/categories";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <AdminNav />

        <AdminGuard>
          <AdminCategoriesContent categories={categories} />
        </AdminGuard>

        <Footer />
      </main>
    </>
  );
}
