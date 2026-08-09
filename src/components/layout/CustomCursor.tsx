"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "drag" | "studio" | "explore" | "external">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "studio") {
          setCursorState("studio");
          setCursorText("VISIT STUDIO ↗");
        } else if (type === "explore") {
          setCursorState("explore");
          setCursorText("EXPLORE ↗");
        } else if (type === "external") {
          setCursorState("external");
          setCursorText("OPEN ↗");
        } else if (type === "view" || type === "project") {
          setCursorState("view");
          setCursorText("VIEW");
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

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      // Lerped positioning
      posX = lerp(posX, mouseX, 0.18);
      posY = lerp(posY, mouseY, 0.18);

      // Velocity calculation
      const vx = mouseX - lastMouseX;
      const vy = mouseY - lastMouseY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      // Apply position & stretch transform
      const stretchScaleX = 1 + Math.min(speed * 0.015, 0.6);
      const stretchScaleY = 1 - Math.min(speed * 0.008, 0.3);

      if (cursor) {
        gsap.set(cursor, {
          x: posX,
          y: posY,
          rotation: speed > 2 ? angle : 0,
          scaleX: stretchScaleX,
          scaleY: stretchScaleY,
        });
      }

      if (dot) {
        gsap.set(dot, { x: mouseX, y: mouseY });
      }

      // Draw subtle trail canvas if speed > 10
      const canvas = trailCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (speed > 8) {
            ctx.beginPath();
            ctx.arc(posX, posY, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(212, 77, 53, 0.25)";
            ctx.fill();
          }
        }
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
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

      {/* Motion trail canvas */}
      <canvas
        ref={trailCanvasRef}
        width={typeof window !== "undefined" ? window.innerWidth : 1200}
        height={typeof window !== "undefined" ? window.innerHeight : 800}
        className="pointer-events-none fixed inset-0 z-[9997] h-full w-full"
      />

      {/* Main velocity follower container */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/40 transition-all duration-300 ${
          cursorState === "studio" || cursorState === "explore"
            ? "h-24 px-6 rounded-full border-terracotta bg-terracotta text-white font-bold text-center"
            : cursorState === "view"
            ? "h-20 w-20 border-terracotta bg-terracotta text-white"
            : cursorState === "external"
            ? "h-20 w-20 border-ink bg-ink text-ivory"
            : cursorState === "drag"
            ? "h-16 w-16 border-ink bg-ink text-ivory"
            : cursorState === "hover"
            ? "h-12 w-12 border-ink/80 bg-ink/5"
            : "h-8 w-8 border-ink/30"
        }`}
      >
        {cursorText && (
          <span className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-current whitespace-nowrap px-2">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
