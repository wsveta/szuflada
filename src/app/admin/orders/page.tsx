import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import AdminGuard from "@/components/AdminGuard";
import AdminOrdersContent from "@/components/AdminOrdersContent";
import AdminNav from "@/components/AdminNav";
import PageShell from "@/components/PageShell";

export default function AdminOrdersPage() {
  return (
    <>
      <PageShell>
        <AdminNav />
        <AdminGuard>
          <AdminOrdersContent />
        </AdminGuard>
      </PageShell>
    </>
  );
}