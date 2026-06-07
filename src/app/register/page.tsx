import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <RegisterForm />
        <Footer />
      </main>
    </>
  );
}