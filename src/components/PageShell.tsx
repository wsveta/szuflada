import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <DemoBanner />
      <Header />

      <main className="flex flex-1 flex-col bg-white dark:bg-zinc-950">
        <div className="flex-1">{children}</div>

        <Footer />
      </main>
    </div>
  );
}
