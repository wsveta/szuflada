import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminOrderDetailsContent from "@/components/AdminOrderDetailsContent";
import AdminNav from "@/components/AdminNav";
import PageShell from "@/components/PageShell";

type AdminOrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderPage({
  params,
}: AdminOrderPageProps) {
  const { id } = await params;

  return (
    <>
      <PageShell>
        <AdminNav />
        <AdminGuard>
          <AdminOrderDetailsContent orderId={Number(id)} />
        </AdminGuard>
      </PageShell>
    </>
  );
}