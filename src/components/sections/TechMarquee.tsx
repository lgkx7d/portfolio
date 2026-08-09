"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export function TechMarquee() {
  const techList = [...PORTFOLIO_DATA.technologies, ...PORTFOLIO_DATA.technologies];

  return (
    <section className="relative overflow-hidden py-12 bg-ink text-ivory border-t border-b border-ink/10">
      <div className="flex whitespace-nowrap animate-marquee">
        {techList.map((item, index) => (
          <div key={index} className="flex items-center mx-6 space-x-6">
            <span className="font-display text-2xl md:text-4xl font-extrabold tracking-widest text-ivory/80 hover:text-terracotta transition-colors">
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-terracotta" />
          </div>
        ))}
      </div>
    </section>
  );
}
