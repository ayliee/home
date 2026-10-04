import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Presence from "@/components/Presence";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen">
      {/* graph-paper decoration, kept behind the content */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 grid-paper opacity-45 [mask-image:radial-gradient(120%_90%_at_50%_0%,transparent_30%,#000_85%)]"
      />

      <Nav />

      <main className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <Hero />
        <Presence />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
