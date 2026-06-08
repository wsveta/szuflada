import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import OrderSuccessContent from "@/components/OrderSuccessContent";
import PageShell from "@/components/PageShell";

export default function OrderSuccessPage() {
  return (
    <>
      <PageShell>
        <OrderSuccessContent />
      </PageShell>
    </>
  );
}