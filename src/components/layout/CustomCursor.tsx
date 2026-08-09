"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorState, setCursorState] = useState<"default" | "hover" | "project" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktops)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);

      // Check targets under pointer for interactive data attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "project") {
          setCursorState("project");
          setCursorText("VIEW ↗");
        } else if (type === "drag") {
          setCursorState("drag");
          setCursorText("DRAG");
        } else if (type === "hover") {
          setCursorState("hover");
          setCursorText("");
        }
      } else {
        setCursorState("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink mix-blend-difference transition-opacity duration-300"
      />

      {/* Main follower circle / container */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/40 transition-all duration-300 ${
          cursorState === "project"
            ? "h-20 w-20 border-terracotta bg-terracotta text-white"
            : cursorState === "drag"
            ? "h-16 w-16 border-ink bg-ink text-ivory"
            : cursorState === "hover"
            ? "h-12 w-12 border-ink/80 bg-ink/5"
            : "h-8 w-8 border-ink/30"
        }`}
      >
        {cursorText && (
          <span className="font-sans text-[10px] font-bold tracking-widest text-current">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
