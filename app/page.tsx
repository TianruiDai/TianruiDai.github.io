import { About } from "@/components/About";
import { Publications } from "@/components/Publications";

export default function Home() {
  return (
    <>
      <div id="top" />
      <main className="site-main">
        <About />
        <Publications />
      </main>
    </>
  );
}
