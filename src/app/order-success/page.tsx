import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import OrderSuccessContent from "@/components/OrderSuccessContent";

export default function OrderSuccessPage() {
  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <OrderSuccessContent />
        <Footer />
      </main>
    </>
  );
}