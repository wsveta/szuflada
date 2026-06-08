import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminOrdersContent from "@/components/AdminOrdersContent";
import AdminNav from "@/components/AdminNav";

export default function AdminOrdersPage() {
  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
                <AdminNav />
        <AdminGuard>
          <AdminOrdersContent />
        </AdminGuard>

        <Footer />
      </main>
    </>
  );
}