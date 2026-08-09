"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Philosophy() {
  return (
    <section className="relative px-6 py-32 md:px-12 bg-ivory text-ink border-t border-ink/10">
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta mb-8 block">
          06 // PHILOSOPHY
        </span>

        <div className="space-y-4 font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-8xl leading-tight">
          {PORTFOLIO_DATA.personal.philosophy.map((line, i) => (
            <div
              key={i}
              className={`${i === 1 ? "text-terracotta pl-4 md:pl-16" : "text-ink"}`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
