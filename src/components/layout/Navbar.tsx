"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "INDEX", id: "hero" },
    { label: "ABOUT", id: "about" },
    { label: "JOURNEY", id: "journey" },
    { label: "WORK", id: "work" },
    { label: "CAPABILITIES", id: "capabilities" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-300 ${
          scrolled ? "bg-ivory/80 py-4 backdrop-blur-md border-b border-ink/5" : "py-6 bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo / Name */}
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center space-x-2 text-left"
            data-cursor="hover"
          >
            <span className="h-2 w-2 rounded-full bg-terracotta transition-transform group-hover:scale-150" />
            <span className="font-display text-sm font-bold tracking-widest text-ink">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-sans text-xs font-semibold tracking-widest text-ink/70 hover:text-terracotta transition-colors"
                data-cursor="hover"
              >
                <ScrambleText text={link.label} />
              </button>
            ))}
          </nav>

          {/* Availability Badge & Mobile Menu Trigger */}
          <div className="flex items-center space-x-4">
            <span className="hidden rounded-full border border-ink/10 bg-ivory-dark/50 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-ink-muted lg:inline-block">
              {PORTFOLIO_DATA.personal.availability}
            </span>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center space-x-2 rounded-full border border-ink/20 px-3 py-1.5 text-ink md:hidden"
              data-cursor="hover"
            >
              <Menu className="h-4 w-4" />
              <span className="font-sans text-[11px] font-bold tracking-wider">MENU</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
}
