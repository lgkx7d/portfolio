"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";

export function JourneyTimeline() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const trigger = triggerRef.current;

    if (!track || !trigger) return;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 160;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section id="journey" className="relative bg-ivory text-ink border-t border-ink/10">
      <div ref={triggerRef} className="overflow-hidden py-24">
        {/* Section Header */}
        <div className="mx-auto max-w-7xl px-6 md:px-12 mb-12 flex justify-between items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta">
              03 // THE JOURNEY & BRANCHES
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink mt-2">
              2024 ➔ 2026.
            </h2>
          </div>
          <span className="hidden md:inline-block font-mono text-xs text-ink-muted">
            SCROLL HORIZONTALLY ➔
          </span>
        </div>

        {/* Cinematic Pinned Timeline Track */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row items-stretch space-y-12 lg:space-y-0 lg:space-x-16 px-6 md:px-12 w-full lg:w-max"
        >
          {/* Scene 1: 2024 The Beginning */}
          <div className="flex flex-col justify-between rounded-2xl bg-ivory-dark/60 border border-ink/10 p-8 w-full lg:w-[440px] shrink-0 space-y-6">
            <div className="flex justify-between items-center border-b border-ink/10 pb-4">
              <span className="font-display text-5xl font-black text-ink">2024</span>
              <span className="font-mono text-xs font-bold text-terracotta uppercase">SCENE 01 // THE BEGINNING</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-xl font-bold">FIRST EXPERIMENTS & LEARNING</h3>
              <p className="font-sans text-sm text-ink-muted leading-relaxed">
                Started exploring web development and design by experimenting, learning, and building for the sake of making it better each time.
              </p>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={PORTFOLIO_DATA.timeline[2]?.artifactImage || "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800"}
                alt="2024 experiments"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Scene 2: 2025 Refinement & WebGL */}
          <div className="flex flex-col justify-between rounded-2xl bg-ivory-dark/60 border border-ink/10 p-8 w-full lg:w-[440px] shrink-0 space-y-6">
            <div className="flex justify-between items-center border-b border-ink/10 pb-4">
              <span className="font-display text-5xl font-black text-ink">2025</span>
              <span className="font-mono text-xs font-bold text-terracotta uppercase">SCENE 02 // EXPANSION</span>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-xl font-bold">3D WEBGL & INTERACTIVE SYSTEMS</h3>
              <p className="font-sans text-sm text-ink-muted leading-relaxed">
                Mastered Three.js, React Three Fiber, GLSL shaders, and editorial layout systems, bridging code and creative design.
              </p>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={PORTFOLIO_DATA.timeline[1]?.artifactImage || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"}
                alt="2025 refinement"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Scene 3 & 4: 2026 The Branching Split (Vetris Teen Foundry & Iron Oak) */}
          <div className="flex flex-col justify-between rounded-2xl bg-ink text-ivory p-8 w-full lg:w-[620px] shrink-0 space-y-8 shadow-2xl">
            <div className="flex justify-between items-center border-b border-ivory/20 pb-4">
              <div>
                <span className="font-display text-5xl font-black text-terracotta">2026</span>
                <span className="ml-3 font-mono text-xs text-ivory/60">REAL WORK & VENTURES</span>
              </div>
              <div className="inline-flex items-center space-x-1 font-mono text-[10px] bg-terracotta/20 text-terracotta px-2.5 py-1 rounded">
                <Sparkles className="h-3 w-3" />
                <span>BRANCH SPLIT</span>
              </div>
            </div>

            <p className="font-sans text-sm text-ivory/80 leading-relaxed">
              Exploration turned into real ventures. By 2026, the journey split into two core pillars: empowering teen creators and operating a creative design studio.
            </p>

            {/* The Two Branches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Branch 1: Vetris Teen Foundry */}
              <a
                href="https://github.com/lgkx7d"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl border border-ivory/20 bg-ivory/5 p-5 transition-all hover:border-terracotta hover:bg-terracotta/10"
                data-cursor="explore"
              >
                <div className="flex items-center justify-between font-mono text-xs text-terracotta">
                  <span>BRANCH 01 ↗</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h4 className="font-display text-lg font-bold text-ivory mt-2">VETRIS TEEN FOUNDRY</h4>
                <p className="font-sans text-xs text-ivory/60 mt-1">Co-Founder // Empowering next-gen builders & teen makers.</p>
              </a>

              {/* Branch 2: Iron Oak */}
              <a
                href="https://github.com/lgkx7d"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl border border-ivory/20 bg-ivory/5 p-5 transition-all hover:border-terracotta hover:bg-terracotta/10"
                data-cursor="studio"
              >
                <div className="flex items-center justify-between font-mono text-xs text-terracotta">
                  <span>BRANCH 02 ↘</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h4 className="font-display text-lg font-bold text-ivory mt-2">IRON OAK</h4>
                <p className="font-sans text-xs text-ivory/60 mt-1">Founder // Web development, UI, 3D experiences & branding.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
