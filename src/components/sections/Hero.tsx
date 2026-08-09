"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const title1Ref = useRef<HTMLHeadingElement | null>(null);
  const title2Ref = useRef<HTMLHeadingElement | null>(null);
  const bgTextRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const title1 = title1Ref.current;
    const title2 = title2Ref.current;
    const bgText = bgTextRef.current;
    const portrait = portraitRef.current;
    const meta = metaRef.current;

    if (!title1 || !title2 || !portrait || !meta) return;

    // Intro Entrance Timeline
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

    // Master Scroll Choreography Timeline (0% -> 100%)
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    masterTl
      // 15–35%: Title typography separates & moves up
      .to(title1, { y: -160, opacity: 0.8, ease: "none" }, 0.15)
      .to(title2, { y: -90, opacity: 0.8, ease: "none" }, 0.15)
      // 35–50%: Portrait scales & drifts down
      .to(portrait, { y: 110, scale: 1.06, ease: "none" }, 0.35)
      // 50–65%: Background text shifts in opposite depth
      .to(bgText, { y: -40, opacity: 0.15, ease: "none" }, 0.5)
      // 65–80%: Metadata fades and clips out
      .to(meta, { opacity: 0, y: -30, ease: "none" }, 0.65);

  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-between px-6 pt-32 pb-12 md:px-12 overflow-hidden"
    >
      {/* Background Spatial Typography Layer */}
      <div
        ref={bgTextRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-display text-[18vw] font-black uppercase text-ink/[0.03] select-none tracking-tighter"
      >
        LIKITH
      </div>

      {/* Top Metadata */}
      <div
        ref={metaRef}
        className="relative z-10 flex flex-col justify-between space-y-4 border-b border-ink/10 pb-6 md:flex-row md:items-end md:space-y-0 font-sans text-xs uppercase tracking-widest text-ink-muted"
      >
        <div>
          <p className="font-bold text-ink">{PORTFOLIO_DATA.personal.name}</p>
          <p className="text-ink-subtle">{PORTFOLIO_DATA.personal.role}</p>
        </div>
        <div className="text-right">
          <p className="text-ink">{PORTFOLIO_DATA.personal.location}</p>
          <p className="font-mono text-terracotta">{PORTFOLIO_DATA.personal.availability}</p>
        </div>
      </div>

      {/* Main Asymmetrical Editorial Composition */}
      <div className="relative z-10 my-auto py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Massive Editorial Display Title */}
        <div className="md:col-span-8 space-y-2">
          <h1
            ref={title1Ref}
            className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl lg:text-9xl leading-[0.9]"
          >
            DEVELOPER
          </h1>
          <h1
            ref={title2Ref}
            className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl lg:text-9xl leading-[0.9] pl-4 md:pl-16"
          >
            & DESIGNER<span className="text-terracotta">.</span>
          </h1>
        </div>

        {/* Asymmetrical Floating Portrait Plane */}
        <div
          ref={portraitRef}
          className="relative md:col-span-4 h-[380px] sm:h-[460px] w-full overflow-hidden rounded-2xl border border-ink/10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          data-cursor="view"
        >
          <Image
            src={PORTFOLIO_DATA.personal.portraitImage}
            alt={PORTFOLIO_DATA.personal.name}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-ink/80 backdrop-blur-md p-3 rounded-lg text-ivory font-sans text-xs flex justify-between items-center">
            <span>LIKITH PENDEM</span>
            <span className="font-mono text-terracotta text-[10px]">2026 EDITION</span>
          </div>
        </div>
      </div>

      {/* Scroll Prompt & Bottom Details */}
      <div className="relative z-10 flex items-center justify-between border-t border-ink/10 pt-6 font-sans text-xs uppercase tracking-widest text-ink-muted">
        <span className="max-w-xs">{PORTFOLIO_DATA.personal.headline}</span>
        <div className="flex items-center space-x-2 font-mono text-ink">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-terracotta" />
        </div>
      </div>
    </section>
  );
}
