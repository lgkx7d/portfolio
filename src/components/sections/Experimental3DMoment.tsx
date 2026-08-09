"use client";

import { Sparkles, Move } from "lucide-react";

export function Experimental3DMoment() {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 py-24 md:px-12 bg-ivory text-ink border-t border-ink/10 text-center">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="inline-flex items-center space-x-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-4 py-1.5 font-mono text-xs font-bold text-terracotta">
          <Sparkles className="h-3.5 w-3.5" />
          <span>INTERACTIVE SPATIAL MOTIF</span>
        </div>

        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-6xl text-ink">
          CRAFTED WITH THREE.JS & GLSL SHADERS.
        </h2>

        <p className="font-sans text-sm md:text-base text-ink-muted max-w-xl mx-auto leading-relaxed">
          The central crystal motif dynamically computes real-time light refraction, chromatic aberration, and cursor proximity physics directly on the GPU.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-2 font-mono text-xs text-ink-subtle">
          <Move className="h-4 w-4 animate-pulse text-terracotta" />
          <span>MOVE YOUR CURSOR / DRAG TO TILT SCULPTURE</span>
        </div>
      </div>
    </section>
  );
}
