import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import LoginForm from "@/components/LoginForm";
import PageShell from "@/components/PageShell";

export default function LoginPage() {
  return (
    <>
      <PageShell>
        <LoginForm />
      </PageShell>
    </>
  );
}