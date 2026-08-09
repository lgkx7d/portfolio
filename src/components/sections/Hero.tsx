"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowDown, Plus } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const title1Ref = useRef<HTMLHeadingElement | null>(null);
  const title2Ref = useRef<HTMLHeadingElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const annotationsRef = useRef<HTMLDivElement | null>(null);
  const underlineRef = useRef<SVGPathElement | null>(null);
  const transitionWordRef = useRef<HTMLDivElement | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax Effect (Cutout portrait: 8-12px, Foreground: 16-20px, Background: -8px)
  useEffect(() => {
    let lerpX = 0;
    let lerpY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 20;
      targetY = (e.clientY / innerHeight - 0.5) * 20;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const update = () => {
      lerpX += (targetX - lerpX) * 0.1;
      lerpY += (targetY - lerpY) * 0.1;
      setMousePos({ x: lerpX, y: lerpY });
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // SVG Path Draw Animation on Load
  useEffect(() => {
    const underline = underlineRef.current;
    if (!underline) return;

    const length = underline.getTotalLength();
    gsap.set(underline, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(underline, {
      strokeDashoffset: 0,
      duration: 1.4,
      delay: 0.8,
      ease: "power3.inOut",
    });
  }, []);

  // 5-Phase Master Scroll Sequence Timeline
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const title1 = title1Ref.current;
    const title2 = title2Ref.current;
    const portrait = portraitRef.current;
    const annotations = annotationsRef.current;
    const transitionWord = transitionWordRef.current;

    if (!title1 || !title2 || !portrait || !annotations || !transitionWord) return;

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
      // Phase 1 (0–20%): Stable initial hero
      // Phase 2 (20–40%): LIKITH moves left, PENDEM moves right
      .to(title1, { x: -80, y: -40, ease: "none" }, 0.2)
      .to(title2, { x: 80, y: 40, ease: "none" }, 0.2)

      // Phase 3 (40–60%): Portrait enlarges and shifts forward
      .to(portrait, { scale: 1.12, y: 80, ease: "none" }, 0.4)

      // Phase 4 (60–80%): Annotations move to screen edges
      .to(annotations, { opacity: 0, y: -40, ease: "none" }, 0.6)
      .fromTo(
        transitionWord,
        { scale: 0.3, opacity: 0, y: 120 },
        { scale: 1, opacity: 1, y: 0, ease: "power2.out" },
        0.65
      )

      // Phase 5 (80–100%): 'BUILD' fills viewport and acts as transition mask into next scene
      .to(
        transitionWord,
        {
          scale: 22,
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
      className="relative flex min-h-screen flex-col justify-between px-6 pt-24 pb-12 md:px-16 overflow-hidden bg-ivory select-none"
    >
      {/* Micro Print Registration Marks */}
      <div className="pointer-events-none absolute top-6 left-6 flex items-center space-x-2 font-mono text-[10px] text-ink/30 uppercase">
        <Plus className="h-3 w-3" />
        <span>REG // 01</span>
      </div>
      <div className="pointer-events-none absolute top-6 right-6 flex items-center space-x-2 font-mono text-[10px] text-ink/30 uppercase">
        <span>ISSUE // 2026</span>
        <Plus className="h-3 w-3" />
      </div>

      {/* Giant Transition Mask Word 'BUILD' (Phase 4-5) */}
      <div
        ref={transitionWordRef}
        className="pointer-events-none fixed inset-0 z-[600] flex items-center justify-center font-display text-[26vw] font-black tracking-tighter text-terracotta opacity-0 select-none"
      >
        BUILD
      </div>

      {/* Top Editorial Annotations Header */}
      <div
        ref={annotationsRef}
        className="relative z-10 flex flex-col justify-between space-y-2 md:flex-row md:items-start border-b border-ink/10 pb-6 font-mono text-xs uppercase tracking-widest text-ink-muted"
        style={{ transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0)` }}
      >
        <div className="space-y-1">
          <p className="font-bold text-ink">{PORTFOLIO_DATA.personal.name}</p>
          <p className="text-terracotta">STUDENT / WEB DEVELOPER / DESIGNER / CREATIVE BUILDER</p>
        </div>

        <div className="text-right font-mono text-xs space-y-1">
          <p className="text-ink">HYDERABAD / INDIA</p>
          <p className="text-terracotta">VOL. 2026 // AVAILABLE</p>
        </div>
      </div>

      {/* Asymmetrical Editorial Magazine Cover Composition */}
      <div className="relative z-10 my-auto py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Layer 1: Background Title LIKITH (Top-Left) */}
        <div
          ref={title1Ref}
          className="relative z-0 md:col-span-12 font-display text-[14vw] font-black tracking-tighter leading-[0.8] text-ink"
          style={{ transform: `translate3d(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px, 0)` }}
        >
          LIKITH
        </div>

        {/* Layer 2: Cutout Silhouette Portrait (Overlaps LIKITH & sits behind PENDEM.) */}
        <div
          ref={portraitRef}
          className="relative z-10 md:col-span-6 -mt-12 md:-mt-24 md:ml-24 h-[420px] sm:h-[520px] w-full max-w-md overflow-hidden"
          style={{ transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)` }}
          data-cursor="move"
        >
          {/* Cutout Silhouette Image with Transparent Mask (No Card Container) */}
          <div className="relative h-full w-full grayscale contrast-125 filter mix-blend-multiply">
            <Image
              src={PORTFOLIO_DATA.personal.portraitImage}
              alt={PORTFOLIO_DATA.personal.name}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Layer 3: Foreground Title PENDEM. (Bottom-Right, Staggered) */}
        <div
          ref={title2Ref}
          className="relative z-20 md:col-span-12 -mt-16 md:-mt-32 md:pl-32 font-display text-[14vw] font-black tracking-tighter leading-[0.8] text-ink text-right md:text-left"
          style={{ transform: `translate3d(${mousePos.x * 0.9}px, ${mousePos.y * 0.9}px, 0)` }}
        >
          PENDEM<span className="text-terracotta">.</span>

          {/* SVG Path-Drawn Underline */}
          <svg
            className="absolute -bottom-4 left-0 md:left-32 w-64 md:w-96 h-8 text-terracotta pointer-events-none"
            viewBox="0 0 300 24"
            fill="none"
          >
            <path
              ref={underlineRef}
              d="M 10,12 Q 150,22 290,10"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Editorial Details & Kinetic Scroll Prompt */}
      <div className="relative z-10 flex items-end justify-between border-t border-ink/10 pt-6 font-mono text-xs uppercase tracking-widest text-ink-muted">
        <div className="space-y-1">
          <p className="font-bold text-ink">EDITORIAL COVER EDITION</p>
          <p className="text-terracotta">EXPLORING THE INTERSECTION OF CODE & DESIGN</p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-ink font-bold">
          <span>SCROLL TO UNFOLD</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-terracotta" />
        </div>
      </div>
    </section>
  );
}
