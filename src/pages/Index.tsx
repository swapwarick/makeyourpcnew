import { useEffect } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Performance from "@/components/Performance";
import Contact from "@/components/Contact";

const Index = () => {
  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const id = target.getAttribute("href");
      if (!id) return;
      const element = document.querySelector(id);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", smoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", smoothScroll);
      });
    };
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <Hero />
      <Services />
      <Performance />
      <Contact />
    </main>
  );
};

export default Index;