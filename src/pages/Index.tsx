
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Performance from "@/components/Performance";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import HardwareUpgrades from "@/components/HardwareUpgrades";
import NetworkServices from "@/components/NetworkServices";
import ChatBox from "@/components/ChatBox";
import { useEffect, useCallback } from "react";

const Index = () => {
  // Debounced smooth scroll implementation
  const smoothScroll = useCallback((e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    const id = target.getAttribute("href");
    if (!id) return;
    
    // This reduces the work the browser needs to do during the scroll
    requestAnimationFrame(() => {
      const element = document.querySelector(id);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  useEffect(() => {
    // Use passive listeners for non-anchor clicks to improve performance
    document.addEventListener("scroll", () => {}, { passive: true });
    
    // Add smooth scroll only for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", smoothScroll, { passive: false });
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", smoothScroll);
      });
    };
  }, [smoothScroll]);

  return (
    <main className="min-h-screen bg-transparent backdrop-blur-sm overscroll-none">
      <div className="relative z-10">
        <Hero />
        <Features />
        <HardwareUpgrades />
        <NetworkServices />
        <Services />
        <Performance />
        <Testimonials />
        <Contact />
        <ChatBox />
      </div>
    </main>
  );
};

export default Index;
