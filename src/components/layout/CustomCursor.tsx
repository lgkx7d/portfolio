"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Completely disable custom cursor on touch / coarse pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

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
      if (!target || !label) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "studio") {
          label.textContent = "VISIT STUDIO ↗";
          cursor.className = "pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-terracotta bg-terracotta text-white font-bold h-24 px-6 transition-all duration-300";
        } else if (type === "explore") {
          label.textContent = "EXPLORE ↗";
          cursor.className = "pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-terracotta bg-terracotta text-white font-bold h-24 px-6 transition-all duration-300";
        } else if (type === "move") {
          label.textContent = "MOVE";
          cursor.className = "pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-terracotta bg-terracotta text-white font-bold h-20 w-20 transition-all duration-300";
        } else if (type === "external") {
          label.textContent = "OPEN ↗";
          cursor.className = "pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-ink text-ivory font-bold h-16 w-16 transition-all duration-300";
        } else if (type === "view" || type === "project") {
          label.textContent = "VIEW";
          cursor.className = "pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-terracotta bg-terracotta text-white font-bold h-20 w-20 transition-all duration-300";
        } else if (type === "drag") {
          label.textContent = "DRAG";
          cursor.className = "pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-ink text-ivory font-bold h-16 w-16 transition-all duration-300";
        } else if (type === "hover") {
          label.textContent = "";
          cursor.className = "pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/80 bg-ink/5 h-12 w-12 transition-all duration-300";
        }
      } else {
        label.textContent = "";
        cursor.className = "pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/30 h-8 w-8 transition-all duration-300";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      posX = lerp(posX, mouseX, 0.18);
      posY = lerp(posY, mouseY, 0.18);

      const vx = mouseX - lastMouseX;
      const vy = mouseY - lastMouseY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      const stretchScaleX = 1 + Math.min(speed * 0.015, 0.5);
      const stretchScaleY = 1 - Math.min(speed * 0.008, 0.25);

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

      lastMouseX = mouseX;
      lastMouseY = mouseY;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink mix-blend-difference"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/30 h-8 w-8 transition-all duration-300"
      >
        <span ref={labelRef} className="font-sans text-[10px] font-extrabold tracking-widest uppercase text-current whitespace-nowrap px-2" />
      </div>
    </>
  );
}
