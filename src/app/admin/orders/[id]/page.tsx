import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminOrderDetailsContent from "@/components/AdminOrderDetailsContent";

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
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <AdminGuard>
          <AdminOrderDetailsContent orderId={Number(id)} />
        </AdminGuard>

        <Footer />
      </main>
    </>
  );
}