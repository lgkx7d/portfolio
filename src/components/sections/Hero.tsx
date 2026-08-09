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

  // Mouse Parallax Effect
  useEffect(() => {
    let lerpX = 0;
    let lerpY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 14;
      targetY = (e.clientY / innerHeight - 0.5) * 14;
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

    const ctx = gsap.context(() => {
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
        .to(title1, { x: -40, y: -20, ease: "none" }, 0.2)
        .to(title2, { x: 40, y: 20, ease: "none" }, 0.2)
        .to(portrait, { scale: 1.05, y: 40, ease: "none" }, 0.4)
        .to(annotations, { opacity: 0, y: -20, ease: "none" }, 0.6)
        .fromTo(
          transitionWord,
          { scale: 0.3, opacity: 0, y: 60 },
          { scale: 1, opacity: 1, y: 0, ease: "power2.out" },
          0.65
        )
        .to(
          transitionWord,
          {
            scale: 16,
            opacity: 0,
            ease: "power4.in",
          },
          0.85
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen max-w-full flex-col justify-between px-4 pt-24 pb-12 sm:px-8 md:px-16 overflow-hidden bg-ivory select-none"
    >
      {/* Micro Print Registration Marks */}
      <div className="pointer-events-none absolute top-6 left-4 sm:left-6 flex items-center space-x-2 font-mono text-[10px] text-ink/30 uppercase">
        <Plus className="h-3 w-3" />
        <span>REG // 01</span>
      </div>
      <div className="pointer-events-none absolute top-6 right-4 sm:right-6 flex items-center space-x-2 font-mono text-[10px] text-ink/30 uppercase">
        <span>ISSUE // 2026</span>
        <Plus className="h-3 w-3" />
      </div>

      {/* Giant Transition Mask Word 'BUILD' (Phase 4-5) */}
      <div
        ref={transitionWordRef}
        className="pointer-events-none fixed inset-0 z-[600] flex items-center justify-center font-display text-[18vw] font-black tracking-tighter text-terracotta opacity-0 select-none max-w-full overflow-hidden"
      >
        BUILD
      </div>

      {/* Top Editorial Annotations Header */}
      <div
        ref={annotationsRef}
        className="relative z-10 flex flex-col justify-between space-y-2 md:flex-row md:items-start border-b border-ink/10 pb-6 font-mono text-xs uppercase tracking-widest text-ink-muted max-w-full overflow-hidden"
        style={{ transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0)` }}
      >
        <div className="space-y-1">
          <p className="font-bold text-ink">{PORTFOLIO_DATA.personal.name}</p>
          <p className="text-terracotta text-[10px] sm:text-xs">STUDENT / DEV / DESIGNER / BUILDER</p>
        </div>

        <div className="text-left md:text-right font-mono text-xs space-y-1">
          <p className="text-ink">{PORTFOLIO_DATA.personal.location}</p>
          <p className="text-terracotta">VOL. 2026 // AVAILABLE</p>
        </div>
      </div>

      {/* Asymmetrical Editorial Magazine Cover Composition */}
      <div className="relative z-10 my-auto py-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-center max-w-full overflow-hidden">
        {/* Layer 1: Background Title LIKITH (Top-Left) */}
        <div
          ref={title1Ref}
          className="relative z-0 md:col-span-12 font-display text-[10vw] sm:text-[12vw] font-black tracking-tighter leading-[0.85] text-ink break-all max-w-full"
          style={{ transform: `translate3d(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px, 0)` }}
        >
          <h1>LIKITH</h1>
        </div>

        {/* Layer 2: Cutout Silhouette Portrait */}
        <div
          ref={portraitRef}
          className="relative z-10 md:col-span-6 -mt-6 md:-mt-16 md:ml-16 h-[280px] sm:h-[440px] w-full max-w-xs sm:max-w-md overflow-hidden"
          style={{ transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)` }}
          data-cursor="move"
        >
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
          className="relative z-20 md:col-span-12 -mt-8 md:-mt-24 pl-0 md:pl-24 font-display text-[10vw] sm:text-[12vw] font-black tracking-tighter leading-[0.85] text-ink text-left max-w-full"
          style={{ transform: `translate3d(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px, 0)` }}
        >
          <h1>PENDEM<span className="text-terracotta">.</span></h1>

          {/* SVG Path-Drawn Underline */}
          <svg
            className="absolute -bottom-3 left-0 md:left-24 w-40 sm:w-80 h-6 text-terracotta pointer-events-none max-w-full"
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
      <div className="relative z-10 flex items-end justify-between border-t border-ink/10 pt-6 font-mono text-xs uppercase tracking-widest text-ink-muted max-w-full overflow-hidden">
        <div className="space-y-1">
          <p className="font-bold text-ink">EDITORIAL COVER EDITION</p>
          <p className="text-terracotta text-[10px] sm:text-xs">CODE × DESIGN INTERSECTION</p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-ink font-bold">
          <span>SCROLL</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-terracotta" />
        </div>
      </div>
    </section>
  );
}
