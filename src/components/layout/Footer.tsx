"use client";

import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: PORTFOLIO_DATA.personal.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now) + " IST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-ink/10 bg-ivory text-ink">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          {/* Col 1: Identity */}
          <div className="space-y-2">
            <p className="font-display text-sm font-bold tracking-widest">{PORTFOLIO_DATA.personal.name}</p>
            <p className="font-sans text-xs text-ink-muted">© {new Date().getFullYear()} — All rights reserved</p>
          </div>

          {/* Col 2: Location & Clock */}
          <div className="space-y-1 font-sans text-xs">
            <p className="font-semibold uppercase tracking-widest text-ink-muted">LOCATION & TIME</p>
            <p className="text-ink">{PORTFOLIO_DATA.personal.location}</p>
            <p className="font-mono text-terracotta font-semibold">{timeString || "22:34:00 IST"}</p>
          </div>

          {/* Col 3: Social Links */}
          <div className="space-y-1 font-sans text-xs">
            <p className="font-semibold uppercase tracking-widest text-ink-muted">CONNECT</p>
            <div className="flex flex-wrap gap-4 pt-1">
              {PORTFOLIO_DATA.personal.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-ink hover:text-terracotta transition-colors"
                  data-cursor="hover"
                >
                  {social.name} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Back to top */}
          <div className="flex items-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 border-b border-ink/30 pb-1 font-sans text-xs font-semibold tracking-widest text-ink hover:border-terracotta hover:text-terracotta transition-all"
              data-cursor="hover"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
