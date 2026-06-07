import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminOrdersContent from "@/components/AdminOrdersContent";

export default function AdminOrdersPage() {
  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <AdminGuard>
          <AdminOrdersContent />
        </AdminGuard>

        <Footer />
      </main>
    </>
  );
}