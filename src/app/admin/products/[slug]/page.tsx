import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import AdminProductDetailsContent from "@/components/AdminProductDetailsContent";
import { getCategories } from "@/lib/categories";
import PageShell from "@/components/PageShell";

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
      <PageShell>
        <AdminNav />
        <AdminGuard>
          <AdminProductDetailsContent slug={slug} categories={categories} />
        </AdminGuard>
      </PageShell>
    </>
  );
}
