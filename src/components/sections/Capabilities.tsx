"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Capabilities() {
  return (
    <section id="capabilities" className="relative px-6 py-24 md:px-12 bg-ivory border-t border-ink/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta">
              05 // SERVICES & SKILLS
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink mt-2">
              CAPABILITIES.
            </h2>
          </div>
          <p className="font-sans text-xs uppercase tracking-widest text-ink-muted max-w-xs">
            End-to-end technical execution from initial visual concept to deployed WebGL engine.
          </p>
        </div>

        {/* Asymmetrical Capability Rows */}
        <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
          {PORTFOLIO_DATA.capabilities.map((cap) => (
            <div
              key={cap.number}
              className="group py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-ivory-dark/40 transition-colors px-4 -mx-4 rounded-xl"
              data-cursor="hover"
            >
              <span className="lg:col-span-2 font-display text-2xl font-extrabold text-terracotta">
                {cap.number}
              </span>

              <div className="lg:col-span-5 space-y-2">
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl group-hover:text-terracotta transition-colors">
                  {cap.title}
                </h3>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <p className="font-sans text-sm text-ink-muted leading-relaxed">
                  {cap.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-ivory-dark px-2.5 py-1 font-mono text-[10px] text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
