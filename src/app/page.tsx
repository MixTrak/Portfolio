import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="h-full w-full overflow-x-hidden">
      <Background />
      <div className="flex flex-col gap-20">
        <Navbar />
        <Hero />
        <About />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
