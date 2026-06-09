import OrderDetailsContent from "@/components/OrderDetailsContent";
import PageShell from "@/components/PageShell";

type OrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const orderCode = decodeURIComponent(id);

  return (
    <PageShell>
      <OrderDetailsContent orderCode={orderCode} />
    </PageShell>
  );
}
