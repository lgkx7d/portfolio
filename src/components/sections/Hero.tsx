"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const IDENTITIES = ["STUDENT", "DEVELOPER", "DESIGNER", "BUILDER"];

export function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const title1Ref = useRef<HTMLHeadingElement | null>(null);
  const title2Ref = useRef<HTMLHeadingElement | null>(null);
  const bgTextRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const sketchRef = useRef<SVGSVGElement | null>(null);
  const transitionWordRef = useRef<HTMLDivElement | null>(null);

  const [activeIdentityIndex, setActiveIdentityIndex] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  // Cycle identity system every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdentityIndex((prev) => (prev + 1) % IDENTITIES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Handle Mouse Press/Hold Tension Physics
  useEffect(() => {
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // 5-Phase Master Scroll Sequence Timeline
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const title1 = title1Ref.current;
    const title2 = title2Ref.current;
    const bgText = bgTextRef.current;
    const portrait = portraitRef.current;
    const meta = metaRef.current;
    const transitionWord = transitionWordRef.current;

    if (!title1 || !title2 || !portrait || !meta || !transitionWord) return;

    // Intro entrance timeline
    const introTl = gsap.timeline();
    introTl
      .fromTo(
        [title1, title2],
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.18, ease: "power4.out", delay: 0.2 }
      )
      .fromTo(
        portrait,
        { scale: 0.85, opacity: 0, rotation: -2 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        meta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

    // Master 5-Phase Scroll Sequence (0% -> 100%)
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        pin: true,
      },
    });

    masterTl
      // Phase 1 (0–20%): Stable initial hero, title separates
      .to(title1, { y: -120, opacity: 0.8, ease: "none" }, 0.15)
      .to(title2, { y: -60, opacity: 0.8, ease: "none" }, 0.15)

      // Phase 2 (20–40%): Spatial typography split & portrait off-center drift
      .to(portrait, { y: 140, x: -40, scale: 1.08, ease: "none" }, 0.3)
      .to(bgText, { y: -80, opacity: 0.15, ease: "none" }, 0.3)

      // Phase 3 (40–60%): Metadata slides out, background text scales
      .to(meta, { opacity: 0, y: -40, ease: "none" }, 0.5)

      // Phase 4 (60–80%): Giant transition word 'BUILD' emerges behind everything
      .fromTo(
        transitionWord,
        { scale: 0.2, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, ease: "power2.out" },
        0.65
      )

      // Phase 5 (80–100%): 'BUILD' fills viewport and acts as transition mask into next scene
      .to(
        transitionWord,
        {
          scale: 18,
          opacity: 0,
          ease: "power4.in",
        },
        0.85
      );
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`relative flex min-h-screen flex-col justify-between px-6 pt-32 pb-12 md:px-12 overflow-hidden transition-all duration-300 ${
        isPressed ? "scale-[0.99]" : "scale-100"
      }`}
    >
      {/* Background Spatial Typography Layer */}
      <div
        ref={bgTextRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-display text-[18vw] font-black uppercase text-ink/[0.03] select-none tracking-tighter"
      >
        LIKITH
      </div>

      {/* Giant Transition Mask Word 'BUILD' (Phase 4-5) */}
      <div
        ref={transitionWordRef}
        className="pointer-events-none fixed inset-0 z-[600] flex items-center justify-center font-display text-[25vw] font-black tracking-tighter text-terracotta opacity-0 select-none"
      >
        BUILD
      </div>

      {/* Top Edge Metadata Annotations */}
      <div
        ref={metaRef}
        className="relative z-10 flex flex-col justify-between space-y-4 border-b border-ink/10 pb-6 md:flex-row md:items-end md:space-y-0 font-sans text-xs uppercase tracking-widest text-ink-muted"
      >
        <div className="space-y-1">
          <p className="font-bold text-ink">{PORTFOLIO_DATA.personal.name}</p>
          <div className="flex items-center space-x-2 font-mono text-terracotta font-bold">
            <span className="h-2 w-2 rounded-full bg-terracotta animate-ping" />
            <span>{IDENTITIES[activeIdentityIndex]}</span>
          </div>
        </div>
        <div className="text-right font-mono text-xs">
          <p className="text-ink">{PORTFOLIO_DATA.personal.location}</p>
          <p className="text-terracotta">{PORTFOLIO_DATA.personal.availability}</p>
        </div>
      </div>

      {/* Main Asymmetrical Editorial Composition */}
      <div className="relative z-10 my-auto py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Architectural Display Title */}
        <div className="md:col-span-8 space-y-2">
          <h1
            ref={title1Ref}
            className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl lg:text-9xl leading-[0.9]"
          >
            LIKITH
          </h1>
          <div className="relative">
            <h1
              ref={title2Ref}
              className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl lg:text-9xl leading-[0.9] pl-4 md:pl-16"
            >
              PENDEM<span className="text-terracotta">.</span>
            </h1>

            {/* Hand-drawn Sketch Mark SVG */}
            <svg
              ref={sketchRef}
              className="absolute -bottom-4 left-4 md:left-16 w-48 md:w-80 h-6 text-terracotta pointer-events-none"
              viewBox="0 0 200 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <path d="M 10,10 Q 100,18 190,8" />
            </svg>
          </div>
        </div>

        {/* Asymmetrical Floating Portrait Plane */}
        <div
          ref={portraitRef}
          className="relative md:col-span-4 h-[380px] sm:h-[460px] w-full overflow-hidden rounded-2xl border border-ink/10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          data-cursor="move"
        >
          <Image
            src={PORTFOLIO_DATA.personal.portraitImage}
            alt={PORTFOLIO_DATA.personal.name}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-ink/80 backdrop-blur-md p-3 rounded-lg text-ivory font-sans text-xs flex justify-between items-center">
            <span className="font-bold">LIKITH PENDEM</span>
            <span className="font-mono text-terracotta text-[10px]">BUILT BETWEEN WORLDS</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Annotations */}
      <div className="relative z-10 flex items-center justify-between border-t border-ink/10 pt-6 font-sans text-xs uppercase tracking-widest text-ink-muted">
        <span className="max-w-xs">{PORTFOLIO_DATA.personal.headline}</span>
        <div className="flex items-center space-x-2 font-mono text-ink">
          <span>SCROLL TO UNFOLD</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-terracotta" />
        </div>
      </div>
    </section>
  );
}
