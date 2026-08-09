"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fast numeric counter
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.floor(obj.value));
      },
      onComplete: () => {
        // Wipe overlay transition
        const container = containerRef.current;
        if (container) {
          gsap.to(container, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              onComplete();
            },
          });
        }
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-ink px-8 py-12 text-ivory"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="flex items-center justify-between font-display text-xs tracking-widest text-ivory/60">
        <span>{PORTFOLIO_DATA.personal.name}</span>
        <span>PORTFOLIO © {new Date().getFullYear()}</span>
      </div>

      <div ref={textRef} className="flex flex-col items-start space-y-4">
        <span className="font-sans text-xs tracking-widest text-terracotta">INITIALIZING EXPERIENCE</span>
        <div className="font-display text-7xl font-bold tracking-tighter sm:text-9xl">
          {String(progress).padStart(3, "0")}
        </div>
      </div>

      <div className="flex items-center justify-between font-sans text-xs tracking-widest text-ivory/40">
        <span>HYDERABAD, INDIA</span>
        <span>CREATIVE DEVELOPER</span>
      </div>
    </div>
  );
}
