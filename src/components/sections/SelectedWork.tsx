"use client";

import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export function SelectedWork({ onSelectProject }: SelectedWorkProps) {
  return (
    <section id="work" className="relative px-6 py-24 md:px-12 bg-ivory border-t border-ink/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta">
              04 // FEATURED PRODUCTIONS
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink mt-2">
              SELECTED WORK.
            </h2>
          </div>
          <p className="font-sans text-xs uppercase tracking-widest text-ink-muted max-w-xs">
            A curated selection of spatial digital experiences, WebGL configurators, and brand portals.
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-24">
          {PORTFOLIO_DATA.projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer border-b border-ink/10 pb-16"
              data-cursor="project"
            >
              {/* Left Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="font-display text-3xl font-extrabold text-terracotta">{project.number}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {project.category} // {project.year}
                  </span>
                </div>

                <h3 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl group-hover:text-terracotta transition-colors">
                  {project.title}
                </h3>

                <p className="font-sans text-sm text-ink-muted leading-relaxed">
                  {project.summary}
                </p>

                {/* Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-ivory-dark px-2.5 py-1 font-mono text-[10px] text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center space-x-2 font-mono text-xs font-bold text-ink group-hover:text-terracotta transition-colors">
                  <span>EXPLORE CASE STUDY</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>

              {/* Right Image Preview */}
              <div className="lg:col-span-7 relative h-[340px] sm:h-[420px] w-full overflow-hidden rounded-2xl border border-ink/10 shadow-xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
