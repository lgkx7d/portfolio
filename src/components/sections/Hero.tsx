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
  const portraitRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const title1 = title1Ref.current;
    const title2 = title2Ref.current;
    const portrait = portraitRef.current;

    if (!title1 || !title2 || !portrait) return;

    // Intro entrance animation
    const tl = gsap.timeline();
    tl.fromTo(
      [title1, title2],
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.3 }
    ).fromTo(
      portrait,
      { scale: 0.85, opacity: 0, rotation: -3 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    // Scroll depth separation
    gsap.to(title1, {
      y: -120,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(title2, {
      y: -60,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(portrait, {
      y: 80,
      scale: 1.05,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-between px-6 pt-32 pb-12 md:px-12 overflow-hidden"
    >
      {/* Top Metadata */}
      <div className="flex flex-col justify-between space-y-4 border-b border-ink/10 pb-6 md:flex-row md:items-end md:space-y-0 font-sans text-xs uppercase tracking-widest text-ink-muted">
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
      <div className="relative my-auto py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Massive Editorial Display Title */}
        <div className="z-10 md:col-span-8 space-y-2">
          <h1
            ref={title1Ref}
            className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl lg:text-9xl leading-[0.9]"
          >
            CREATIVE
          </h1>
          <h1
            ref={title2Ref}
            className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl lg:text-9xl leading-[0.9] pl-4 md:pl-16"
          >
            DEVELOPER<span className="text-terracotta">.</span>
          </h1>
        </div>

        {/* Asymmetrical Floating Portrait Plane */}
        <div
          ref={portraitRef}
          className="relative md:col-span-4 h-[380px] sm:h-[460px] w-full overflow-hidden rounded-2xl border border-ink/10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          data-cursor="hover"
        >
          <Image
            src={PORTFOLIO_DATA.personal.portraitImage}
            alt={PORTFOLIO_DATA.personal.name}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-ink/70 backdrop-blur-md p-3 rounded-lg text-ivory font-sans text-xs flex justify-between items-center">
            <span>PENDEM JR</span>
            <span className="font-mono text-terracotta text-[10px]">2026 EDITION</span>
          </div>
        </div>
      </div>

      {/* Scroll Prompt & Bottom Details */}
      <div className="flex items-center justify-between border-t border-ink/10 pt-6 font-sans text-xs uppercase tracking-widest text-ink-muted">
        <span className="max-w-xs">{PORTFOLIO_DATA.personal.headline}</span>
        <div className="flex items-center space-x-2 font-mono text-ink">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-terracotta" />
        </div>
      </div>
    </section>
  );
}
