"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Loader } from "@/components/ui/Loader";
import { SceneCanvas } from "@/components/canvas/SceneCanvas";
import { Hero } from "@/components/sections/Hero";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { About } from "@/components/sections/About";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Capabilities } from "@/components/sections/Capabilities";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Experimental3DMoment } from "@/components/sections/Experimental3DMoment";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { Project } from "@/data/portfolio";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize Lenis smooth scrolling & mouse tracking
  useLenis();
  const mouse = useMousePosition();

  return (
    <>
      {!loadingComplete && (
        <Loader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* R3F Fixed WebGL Canvas */}
      <SceneCanvas mouse={mouse} />

      {/* Continuous Page Sections */}
      <div className="relative z-10 space-y-0">
        <Hero />
        <IntroStatement />
        <About />
        <JourneyTimeline />
        <SelectedWork onSelectProject={(p) => setSelectedProject(p)} />
        <Capabilities />
        <TechMarquee />
        <Experimental3DMoment />
        <Philosophy />
        <Contact />
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
