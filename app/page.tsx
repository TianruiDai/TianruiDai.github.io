import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Publications } from "@/components/Publications";

export default function Home() {
  return (
    <>
      <div id="top" />
      <Header />
      <main className="site-main">
        <About />
        <Publications />
      </main>
      <Footer />
    </>
  );
}
