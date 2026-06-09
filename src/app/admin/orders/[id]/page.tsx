import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import AdminOrderDetailsContent from "@/components/AdminOrderDetailsContent";
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