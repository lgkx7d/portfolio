"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Copy, Check, ArrowUpRight } from "lucide-react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12 bg-ink text-ivory border-t border-ink/10">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header Badge */}
        <div className="flex justify-between items-start border-b border-ivory/20 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta">
              07 // INIT COLLABORATION
            </span>
            <h2 className="font-display text-5xl font-extrabold tracking-tight md:text-8xl text-ivory mt-4">
              HAVE AN IDEA?<br />
              <span className="text-terracotta">LET'S BUILD IT.</span>
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Email Copy CTA */}
          <div className="relative z-20 md:col-span-8 space-y-4">
            <p className="font-sans text-xs uppercase tracking-widest text-ivory/60">
              DIRECT INQUIRIES & COLLABORATIONS
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="font-display text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ivory hover:text-terracotta transition-colors underline decoration-terracotta/40 underline-offset-8 break-all"
                data-cursor="external"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>

              <MagneticButton onClick={copyEmail}>
                <div className="flex items-center space-x-2 rounded-full border border-ivory/30 bg-ivory/10 px-5 py-2.5 font-mono text-xs font-bold text-ivory hover:bg-terracotta hover:border-terracotta transition-all">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      <span>COPIED ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </div>
              </MagneticButton>
            </div>
          </div>

          {/* Social Columns */}
          <div className="relative z-10 md:col-span-4 space-y-3 font-sans text-xs">
            <p className="font-mono text-xs uppercase tracking-widest text-ivory/40">SOCIAL ECOSYSTEM</p>
            <div className="grid grid-cols-2 gap-3">
              {PORTFOLIO_DATA.personal.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-ivory/10 p-3 hover:border-terracotta hover:bg-ivory/5 transition-all"
                  data-cursor="external"
                >
                  <span className="font-mono font-bold">{social.name}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
