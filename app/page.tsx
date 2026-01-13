import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
// import MenuGrid from "@/components/MenuGrid"; // Removed for now as requested
import ChutneyChoice from "@/components/ChutneyChoice";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col pt-0">
      <Hero />
      <Marquee />
      {/* <MenuGrid /> */}
      <ChutneyChoice />
      <Footer />
    </main>
  );
}
