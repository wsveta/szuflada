import OrderDetailsContent from "@/components/OrderDetailsContent";
import PageShell from "@/components/PageShell";

type OrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  return (
    <>
      <PageShell>
        <OrderDetailsContent orderId={Number(id)} />
      </PageShell>
    </>
  );
}