import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import AdminProductDetailsContent from "@/components/AdminProductDetailsContent";
import { getCategories } from "@/lib/categories";

type AdminProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AdminProductPage({
  params,
}: AdminProductPageProps) {
  const { slug } = await params;
  const categories = await getCategories();

  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <AdminNav />

        <AdminGuard>
          <AdminProductDetailsContent slug={slug} categories={categories} />
        </AdminGuard>

        <Footer />
      </main>
    </>
  );
}
