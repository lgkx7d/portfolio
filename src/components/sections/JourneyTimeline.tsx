"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import Image from "next/image";

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const trigger = triggerRef.current;

    if (!section || !trigger) return;

    // Responsive horizontal pin only on desktop screens
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      const scrollWidth = section.scrollWidth - window.innerWidth + 120;

      gsap.to(section, {
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
              03 // MY JOURNEY
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink mt-2">
              CAREER & MILESTONES.
            </h2>
          </div>
          <span className="hidden md:inline-block font-mono text-xs text-ink-muted">
            SCROLL HORIZONTALLY ➔
          </span>
        </div>

        {/* Timeline Container */}
        <div
          ref={sectionRef}
          className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-12 px-6 md:px-12 w-full lg:w-max"
        >
          {PORTFOLIO_DATA.timeline.map((item, index) => (
            <div
              key={item.year}
              className="relative flex flex-col justify-between rounded-2xl bg-ivory-dark/60 border border-ink/10 p-8 w-full lg:w-[480px] shrink-0 space-y-6 hover:border-terracotta transition-colors duration-300"
              data-cursor="hover"
            >
              {/* Top Header */}
              <div className="flex justify-between items-start border-b border-ink/10 pb-4">
                <span className="font-display text-5xl font-extrabold text-terracotta tracking-tighter">
                  {item.year}
                </span>
                <span className="font-mono text-xs font-bold text-ink-subtle uppercase">
                  MILESTONE 0{index + 1}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold text-ink">{item.role}</h3>
                <p className="font-sans text-xs font-semibold tracking-wider text-ink-muted uppercase">
                  {item.company}
                </p>
                <p className="font-sans text-sm text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 pt-2 border-t border-ink/10 font-sans text-xs text-ink-light">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Artifact Screenshot */}
              {item.artifactImage && (
                <div className="relative h-44 w-full overflow-hidden rounded-lg mt-4 border border-ink/5">
                  <Image
                    src={item.artifactImage}
                    alt={item.company}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
