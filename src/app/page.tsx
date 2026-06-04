import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AboutProject from "@/components/AboutProject";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProductGrid />
      <AboutProject />
    </main>
  );
}