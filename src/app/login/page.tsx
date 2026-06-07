import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <DemoBanner />
      <Header />

      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <LoginForm />
        <Footer />
      </main>
    </>
  );
}