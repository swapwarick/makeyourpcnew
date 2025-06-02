
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
  // Enhanced smooth scroll implementation
  const smoothScroll = useCallback((e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    const id = target.getAttribute("href");
    if (!id) return;
    
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  useEffect(() => {
    // Enhanced scroll listeners with performance optimizations
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    
    // Add smooth scroll for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", smoothScroll, { passive: false });
    });

    return () => {
      document.removeEventListener("scroll", handleScroll);
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
