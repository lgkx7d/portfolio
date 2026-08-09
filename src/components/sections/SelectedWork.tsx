"use client";

import { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = [
  { id: "web", title: "WEB", desc: "Interactive web experiences, spatial 3D engines & web apps.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200" },
  { id: "ui", title: "UI", desc: "Digital interfaces, design systems, and responsive layouts.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200" },
  { id: "posters", title: "POSTERS", desc: "Editorial print design, graphic posters & typographic grids.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200" },
  { id: "visual", title: "VISUAL DESIGN", desc: "Art direction, composition, and visual brand identity.", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200" },
  { id: "branding", title: "BRANDING", desc: "Logos, brand marks, and generative visual identity.", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" },
  { id: "experiments", title: "EXPERIMENTS", desc: "GLSL shaders, procedural Canvas motion, and 3D interactions.", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200" },
];

export function SelectedWork({ onSelectProject }: SelectedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[0] | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const xTo = gsap.quickTo(preview, "x", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.4, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX + 20);
      yTo(e.clientY + 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeCategory]);

  return (
    <section id="work" className="relative px-6 py-24 md:px-12 bg-ivory border-t border-ink/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta">
              04 // CREATIVE SPECTRUM
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink mt-2">
              THINGS I MAKE.
            </h2>
          </div>
          <p className="font-sans text-xs uppercase tracking-widest text-ink-muted max-w-xs">
            Exploring the space where design and technology overlap — websites, UI, 3D, posters, and branding.
          </p>
        </div>

        {/* Floating Lerped Preview Card */}
        {activeCategory && (
          <div
            ref={previewRef}
            className="pointer-events-none fixed top-0 left-0 z-[700] hidden md:block h-52 w-80 overflow-hidden rounded-xl bg-ink shadow-2xl border border-ivory/20"
          >
            <div className="relative h-full w-full">
              <Image src={activeCategory.image} alt={activeCategory.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-ink/30 p-4 flex flex-col justify-end text-ivory">
                <span className="font-display text-lg font-bold">{activeCategory.title}</span>
                <span className="font-sans text-[11px] text-ivory/70 line-clamp-1">{activeCategory.desc}</span>
              </div>
            </div>
          </div>
        )}

        {/* Editorial Category Wall */}
        <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
          {CATEGORIES.map((cat, index) => (
            <div
              key={cat.id}
              onMouseEnter={() => setActiveCategory(cat)}
              onMouseLeave={() => setActiveCategory(null)}
              className="group py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center cursor-pointer hover:bg-ivory-dark/40 transition-colors px-4 -mx-4 rounded-xl"
              data-cursor="view"
            >
              <span className="md:col-span-2 font-mono text-sm font-bold text-terracotta">
                0{index + 1}
              </span>

              <h3 className="md:col-span-6 font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl group-hover:text-terracotta transition-colors">
                {cat.title}
              </h3>

              <div className="md:col-span-4 flex items-center justify-between font-sans text-xs text-ink-muted">
                <span>{cat.desc}</span>
                <ArrowUpRight className="h-5 w-5 text-ink group-hover:text-terracotta transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Projects Showcase Cards */}
        <div className="mt-20 space-y-16">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink-subtle">FEATURED CASE STUDIES</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer rounded-2xl bg-ivory-dark/40 border border-ink/10 p-6 space-y-4 hover:border-terracotta transition-all duration-300"
                data-cursor="view"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-xl">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-center font-mono text-xs text-terracotta">
                  <span>{project.number} // {project.category}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h4 className="font-display text-2xl font-bold text-ink group-hover:text-terracotta transition-colors">{project.title}</h4>
                <p className="font-sans text-xs text-ink-muted leading-relaxed line-clamp-2">{project.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
