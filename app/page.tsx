"use client";

import { useEffect, useRef, useState } from "react";
import { NavSidebar } from "@/components/layout/nav-sidebar";
import { IntroSection } from "@/components/sections/intro-section";
import { WorkSection } from "@/components/sections/work-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ConnectSection } from "@/components/sections/connect-section";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <NavSidebar activeSection={activeSection} />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <IntroSection ref={(el) => { sectionsRef.current[0] = el }} />
        <WorkSection ref={(el) => { sectionsRef.current[1] = el }} />
        <ProjectsSection ref={(el) => { sectionsRef.current[2] = el }} />
        <ConnectSection ref={(el) => { sectionsRef.current[3] = el }} />
        <SiteFooter />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
};
