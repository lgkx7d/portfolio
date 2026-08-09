"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 bg-ivory border-t border-ink/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center space-x-3 mb-12 font-mono text-xs uppercase tracking-widest text-terracotta">
          <span>02 // IDENTITY & BACKGROUND</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Big Headline */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink">
              BRIDGING CREATIVE DIRECTION & WEBGL CODE.
            </h2>
            <div className="h-1 w-20 bg-terracotta" />
          </div>

          {/* Right Column: Bio Paragraphs */}
          <div className="lg:col-span-7 space-y-8 font-sans text-base md:text-lg leading-relaxed text-ink-muted">
            {PORTFOLIO_DATA.personal.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Key Focus Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-ink/10 font-sans text-xs">
              <div>
                <span className="font-mono uppercase text-terracotta font-bold">CORE FOCUS</span>
                <p className="mt-1 font-semibold text-ink">3D WebGL Experiences, Spatial Systems, Editorial Websites</p>
              </div>
              <div>
                <span className="font-mono uppercase text-terracotta font-bold">BASE</span>
                <p className="mt-1 font-semibold text-ink">{PORTFOLIO_DATA.personal.location}</p>
              </div>
            </div>

            {/* Social Link Pills */}
            <div className="flex flex-wrap gap-4 pt-4">
              {PORTFOLIO_DATA.personal.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 rounded-full border border-ink/20 px-5 py-2 font-mono text-xs font-semibold text-ink hover:border-terracotta hover:bg-terracotta hover:text-white transition-all"
                  data-cursor="hover"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
