
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Performance from "@/components/Performance";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import HardwareUpgrades from "@/components/HardwareUpgrades";
import NetworkServices from "@/components/NetworkServices";
import { useEffect } from "react";

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
      <Features />
      <HardwareUpgrades />
      <NetworkServices />
      <Services />
      <Performance />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Index;
