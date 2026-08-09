"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.7,
        ease: "power4.inOut",
      });

      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  const navItems = [
    { label: "INDEX", id: "hero" },
    { label: "ABOUT", id: "about" },
    { label: "JOURNEY", id: "journey" },
    { label: "WORK", id: "work" },
    { label: "CAPABILITIES", id: "capabilities" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[990] flex flex-col justify-between bg-ink px-6 py-10 text-ivory md:hidden"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
    >
      <div className="flex items-center justify-between border-b border-ivory/20 pb-6">
        <span className="font-display text-lg tracking-wider">{PORTFOLIO_DATA.personal.name}</span>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-ivory hover:bg-ivory/10"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div ref={linksRef} className="flex flex-col space-y-6">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              onClose();
            }}
            className="group flex items-baseline justify-between text-left font-display text-3xl font-bold tracking-tight text-ivory hover:text-terracotta"
          >
            <span>{item.label}</span>
            <span className="font-mono text-xs text-ivory/40">0{index + 1}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-ivory/20 pt-6 font-sans text-xs tracking-widest text-ivory/60">
        <p>{PORTFOLIO_DATA.personal.location}</p>
        <p className="mt-1">{PORTFOLIO_DATA.personal.availability}</p>
      </div>
    </div>
  );
}
