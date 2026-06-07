import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import ProfileContent from "@/components/ProfileContent";

export default function ProfilePage() {
  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <ProfileContent />
        <Footer />
      </main>
    </>
  );
}