"use client";

import { useEffect, useRef } from "react";

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / 3);
      canvas.height = Math.ceil(window.innerHeight / 3);
    };

    resize();
    window.addEventListener("resize", resize);

    const generateNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(imgData.data.buffer);

      for (let i = 0; i < buffer32.length; i++) {
        if (Math.random() < 0.15) {
          const value = Math.floor(Math.random() * 255);
          // ABGR order in little endian: alpha 15 (very low opacity), same value for RGB
          buffer32[i] = (15 << 24) | (value << 16) | (value << 8) | value;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(generateNoise);
    };

    generateNoise();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-40 mix-blend-overlay"
      aria-hidden="true"
    />
  );
}
