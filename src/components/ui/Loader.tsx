"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lpMarkRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const obj = { value: 0 };
    const lpMark = lpMarkRef.current;
    const line = lineRef.current;
    const container = containerRef.current;

    // Safety fallback timer: guarantee loader unmounts within 2.5s even if tab is in background
    const safetyTimer = setTimeout(() => {
      setIsHidden(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2500);

    const tween = gsap.to(obj, {
      value: 100,
      duration: 1.0,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.floor(obj.value));
      },
      onComplete: () => {
        const tl = gsap.timeline({
          onComplete: () => {
            clearTimeout(safetyTimer);
            setIsHidden(true);
            if (onCompleteRef.current) onCompleteRef.current();
          },
        });

        tl.to(textRef.current, {
          opacity: 0,
          duration: 0.15,
          ease: "power2.out",
        })
          .to(lpMark, {
            scaleX: 10,
            scaleY: 0.05,
            duration: 0.3,
            ease: "power4.inOut",
          })
          .to(line, {
            scaleY: 80,
            opacity: 0,
            duration: 0.35,
            ease: "power4.inOut",
          })
          .to(container, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.3,
            ease: "power3.inOut",
          }, "-=0.2");
      },
    });

    return () => {
      clearTimeout(safetyTimer);
      tween.kill();
    };
  }, []); // Run ONCE on mount

  if (isHidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-ink px-8 py-12 text-ivory pointer-events-auto select-none"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between font-display text-xs tracking-widest text-ivory/60">
        <span>{PORTFOLIO_DATA.personal.name}</span>
        <span>2026 EDITION</span>
      </div>

      {/* Central Transformation Hub */}
      <div className="relative my-auto flex flex-col items-center justify-center space-y-6 text-center">
        {/* LP Mark / Line Container */}
        <div className="relative flex items-center justify-center">
          <div
            ref={lpMarkRef}
            className="font-display text-7xl sm:text-9xl font-black tracking-tighter text-ivory border-4 border-terracotta px-8 py-4 rounded-xl"
          >
            LP
          </div>
          <div
            ref={lineRef}
            className="absolute h-1 w-full bg-terracotta origin-center opacity-100"
          />
        </div>

        {/* Numeric Progress */}
        <div ref={textRef} className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta">INITIALIZING WORLD</span>
          <div className="font-display text-5xl font-bold tracking-tight">
            {String(progress).padStart(3, "0")} %
          </div>
        </div>
      </div>

      {/* Bottom Annotations */}
      <div className="flex items-center justify-between font-mono text-xs tracking-widest text-ivory/40 uppercase">
        <span>HYDERABAD, INDIA</span>
        <span>STUDENT / DEV / DESIGNER / BUILDER</span>
      </div>
    </div>
  );
}
