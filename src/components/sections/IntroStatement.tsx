"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function IntroStatement() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const line3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

      lines.forEach((line) => {
        if (!line) return;

        gsap.fromTo(
          line,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex flex-col justify-center px-4 py-24 md:px-12 bg-ivory text-ink border-t border-ink/10 max-w-full overflow-hidden"
    >
      <div className="mx-auto max-w-6xl space-y-6 max-w-full overflow-hidden">
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta">
          01 // STATEMENT
        </span>

        <div className="font-display text-2xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl leading-tight max-w-full overflow-hidden break-words">
          <div ref={line1Ref} className="overflow-hidden">
            I DESIGN AND BUILD DIGITAL
          </div>
          <div ref={line2Ref} className="overflow-hidden text-ink-muted sm:pl-12">
            EXPERIENCES THAT PEOPLE
          </div>
          <div ref={line3Ref} className="overflow-hidden text-terracotta">
            REMEMBER.
          </div>
        </div>
      </div>
    </section>
  );
}
