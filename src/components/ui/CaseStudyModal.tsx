"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Project } from "@/data/portfolio";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (project) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        modal,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[950] flex items-center justify-center bg-ink/70 backdrop-blur-md p-4 md:p-12 overflow-y-auto">
      <div
        ref={modalRef}
        className="relative my-auto w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-ivory text-ink p-6 md:p-12 shadow-2xl border border-ink/10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 hover:bg-ink hover:text-ivory transition-all"
          aria-label="Close modal"
          data-cursor="hover"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="space-y-4 border-b border-ink/10 pb-8">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-xs font-bold text-terracotta">{project.number}</span>
            <span className="font-sans text-xs uppercase tracking-widest text-ink-muted">{project.category}</span>
            <span className="font-mono text-xs text-ink-subtle">— {project.year}</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h2>
          <p className="font-sans text-lg text-ink-muted max-w-2xl">{project.tagline}</p>

          {project.caseStudy.liveUrl && (
            <a
              href={project.caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-full bg-ink px-6 py-2.5 font-sans text-xs font-bold tracking-widest text-ivory hover:bg-terracotta transition-colors"
              data-cursor="hover"
            >
              <span>VIEW LIVE PROJECT</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-6 border-b border-ink/10 py-6 md:grid-cols-4 font-sans text-xs">
          <div>
            <p className="text-ink-subtle uppercase tracking-widest">CLIENT</p>
            <p className="font-semibold text-ink mt-1">{project.caseStudy.client}</p>
          </div>
          <div>
            <p className="text-ink-subtle uppercase tracking-widest">ROLE</p>
            <p className="font-semibold text-ink mt-1">{project.caseStudy.role}</p>
          </div>
          <div>
            <p className="text-ink-subtle uppercase tracking-widest">TIMELINE</p>
            <p className="font-semibold text-ink mt-1">{project.caseStudy.duration}</p>
          </div>
          <div>
            <p className="text-ink-subtle uppercase tracking-widest">TECH STACK</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.stack.map((tech) => (
                <span key={tech} className="font-mono text-[10px] bg-ivory-dark px-1.5 py-0.5 rounded text-ink-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Core Content */}
        <div className="space-y-8 py-8">
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-sm">
            <div className="space-y-2">
              <h3 className="font-display text-sm font-bold tracking-widest uppercase text-terracotta">THE CHALLENGE</h3>
              <p className="text-ink-muted leading-relaxed">{project.caseStudy.challenge}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-sm font-bold tracking-widest uppercase text-terracotta">THE SOLUTION</h3>
              <p className="text-ink-muted leading-relaxed">{project.caseStudy.solution}</p>
            </div>
          </div>

          <div className="rounded-lg bg-ivory-dark p-6 space-y-2">
            <h3 className="font-display text-xs font-bold tracking-widest uppercase text-ink">OUTCOME & IMPACT</h3>
            <p className="font-sans text-base font-semibold text-ink-light">{project.caseStudy.impact}</p>
          </div>

          {/* Gallery */}
          {project.caseStudy.gallery.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.caseStudy.gallery.slice(1).map((imgUrl, i) => (
                <div key={i} className="relative h-60 w-full overflow-hidden rounded-lg">
                  <Image src={imgUrl} alt={`${project.title} breakdown ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
