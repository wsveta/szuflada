import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AboutProject from "@/components/AboutProject";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
       <DemoBanner/>
      <Header />
      <Hero />
      <ProductGrid />
      <AboutProject />
      <Footer />
    </main>
  );
}