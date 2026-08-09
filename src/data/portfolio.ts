export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  stack: string[];
  tagline: string;
  summary: string;
  image: string;
  accentColor: string;
  caseStudy: {
    client: string;
    role: string;
    duration: string;
    challenge: string;
    solution: string;
    impact: string;
    gallery: string[];
    liveUrl?: string;
  };
}

export interface TimelineMilestone {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  artifactImage?: string;
}

export interface Capability {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "LIKITH PENDEM",
    firstName: "LIKITH",
    lastName: "PENDEM",
    role: "DEVELOPER & DESIGNER",
    headline: "BUILDING THINGS THAT ACTUALLY FEEL DIFFERENT",
    location: "HYDERABAD, INDIA",
    timezone: "Asia/Kolkata",
    availability: "Co-Founder @ Vetris Teen Foundry & Iron Oak",
    email: "likithpendem@gmail.com",
    socials: [
      { name: "GITHUB", url: "https://github.com/lgkx7d" },
      { name: "LINKEDIN", url: "https://linkedin.com" },
      { name: "TWITTER / X", url: "https://x.com" },
      { name: "INSTAGRAM", url: "https://instagram.com" },
    ],
    bio: [
      "I’m Likith Pendem — a senior high student, developer and designer who likes building things that actually feel different.",
      "I started exploring web development and design in 2024, mostly by experimenting, learning, and making stuff for the sake of making it better each time. By 2026, that turned into real work — co-founding Vetris Teen Foundry and starting Iron Oak, while continuing to work across web development, UI, interactive experiences, and creative design.",
      "I’m interested in the space where design and technology overlap — websites, visual systems, 3D interactions, posters, branding, and anything that lets me turn an idea into something people can actually experience. Still learning. Still building. Still figuring out how far I can push it.",
    ],
    philosophy: [
      "STILL LEARNING. STILL BUILDING.",
      "STILL FIGURING OUT HOW FAR I CAN PUSH IT."
    ],
    portraitImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
  },
  projects: [
    {
      id: "vetris",
      number: "01",
      title: "VETRIS TEEN FOUNDRY",
      category: "CO-FOUNDER & CREATIVE TECH",
      year: "2026",
      stack: ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "GSAP", "INTERACTIVE DESIGN"],
      tagline: "Empowering the next generation of builders, creators, and teen innovators.",
      summary: "Co-founded initiative and digital ecosystem built to support teen makers with collaborative tools, platforms, and modern brand systems.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#D44D35",
      caseStudy: {
        client: "Vetris Teen Foundry",
        role: "Co-Founder & Lead Designer/Developer",
        duration: "2026 — Present",
        challenge: "Creating an authentic, high-caliber platform for young builders that feels distinctly modern, bold, and empowering.",
        solution: "Engineered an editorial digital identity platform featuring interactive project showcases, community toolkits, and dynamic kinetic typography.",
        impact: "Fostered a community of young creators and launched flagship collaborative builds.",
        gallery: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
        ],
        liveUrl: "https://github.com/lgkx7d",
      },
    },
    {
      id: "iron-oak",
      number: "02",
      title: "IRON OAK DESIGN STUDIO",
      category: "FOUNDER & CREATIVE DIRECTION",
      year: "2026",
      stack: ["THREE.JS", "R3F", "GLSL SHADERS", "REACT", "DESIGN SYSTEMS"],
      tagline: "Bespoke digital design, 3D WebGL interactions, and visual brand identity.",
      summary: "Creative studio turned venture focused on craftsmanship at the intersection of web design, UI, 3D interactions, and posters.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#2A2A2A",
      caseStudy: {
        client: "Iron Oak",
        role: "Founder & Creative Director",
        duration: "2026 — Present",
        challenge: "Establishing a design identity that merges raw structural aesthetic with fluid real-time WebGL interactivity.",
        solution: "Built custom shader displacement systems, heavy editorial typography grids, and tactile physical material shaders.",
        impact: "Delivered interactive brand experiences and custom 3D web applications.",
        gallery: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200",
        ],
        liveUrl: "https://github.com/lgkx7d",
      },
    },
    {
      id: "aetheria",
      number: "03",
      title: "AETHERIA SPATIAL AUDIO",
      category: "EXPERIMENTAL WEBGL EXPERIENCE",
      year: "2025",
      stack: ["THREE.JS", "R3F", "GSAP", "GLSL SHADERS", "NEXT.JS"],
      tagline: "Interactive spatial sound visualization engine with real-time audio-reactive 3D simulations.",
      summary: "A spatial sound platform built to demonstrate real-time WebGL node synthesis, custom vertex displacement shaders, and camera choreography.",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#4A5568",
      caseStudy: {
        client: "Aetheria Labs",
        role: "Interactive Developer",
        duration: "3 Months",
        challenge: "Conveying 360-degree acoustic immersion through interactive WebGL shaders inside modern desktop viewports.",
        solution: "Engineered WebGL point-cloud visualization powered by audio frequency analysis and custom instanced meshes.",
        impact: "Awarded interactive showcase highlights.",
        gallery: [
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
        ],
        liveUrl: "https://github.com/lgkx7d",
      },
    },
    {
      id: "velox",
      number: "04",
      title: "KINETIC VISUAL SYSTEMS",
      category: "BRANDING & UI EXPERIMENTS",
      year: "2024",
      stack: ["CANVAS 2D", "POSTERS", "TYPOGRAPHY", "FIGMA"],
      tagline: "Exploring how typography, posters, and physical layout principles translate to modern screens.",
      summary: "Experimental visual system study exploring poster layouts, kinetic motion paths, and responsive grid structures.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#D44D35",
      caseStudy: {
        client: "Independent Concept",
        role: "Designer & Developer",
        duration: "2024",
        challenge: "Challenging conventional web layout templates by adopting print editorial poster principles.",
        solution: "Designed high-contrast typographic layouts with dynamic viewport clipping and asymmetrical whitespace.",
        impact: "Formed the foundational design direction for Iron Oak.",
        gallery: [
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200",
        ],
        liveUrl: "https://github.com/lgkx7d",
      },
    },
  ] as Project[],
  timeline: [
    {
      year: "2026",
      role: "CO-FOUNDER & FOUNDER",
      company: "VETRIS TEEN FOUNDRY & IRON OAK",
      description: "Co-founded Vetris Teen Foundry and started Iron Oak. Working across web development, UI, 3D interactive experiences, and creative design.",
      highlights: [
        "Co-founded Vetris Teen Foundry to empower young builders.",
        "Launched Iron Oak studio for creative web experiences and visual design.",
      ],
      artifactImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2025",
      role: "INTERACTIVE DEVELOPER & DESIGNER",
      company: "INDEPENDENT BUILDER",
      description: "Deepened work in Three.js, React Three Fiber, GLSL shaders, and UI design systems.",
      highlights: [
        "Built interactive 3D WebGL experiences and editorial sites.",
        "Refined visual systems, poster typography, and motion choreography.",
      ],
      artifactImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2024",
      role: "EXPLORER & DEVELOPER",
      company: "FIRST EXPERIMENTS",
      description: "Started exploring web development and design through continuous experimentation and building for the sake of making it better each time.",
      highlights: [
        "Mastered frontend fundamentals, React, and layout mechanics.",
        "Began experimenting with creative design, UI, and web motion.",
      ],
      artifactImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
    },
  ] as TimelineMilestone[],
  capabilities: [
    {
      number: "01",
      title: "CREATIVE DEVELOPMENT & UI",
      description: "Building websites and web apps that feel distinctly different. High-performance code paired with uncompromising visual execution.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      number: "02",
      title: "3D INTERACTIONS & WEBGL",
      description: "Real-time 3D scenes, procedural shaders, lighting pipelines, and spatial experiences inside the browser.",
      tags: ["Three.js", "R3F", "Drei", "GLSL Shaders", "Blender"],
    },
    {
      number: "03",
      title: "VISUAL SYSTEMS & BRANDING",
      description: "Designing brand identity systems, posters, UI layouts, and kinetic typography that translate seamlessly across screens.",
      tags: ["Visual Systems", "Posters", "Branding", "Figma"],
    },
    {
      number: "04",
      title: "TEEN FOUNDRY & VENTURES",
      description: "Co-founding Vetris Teen Foundry and Iron Oak to build platforms and experiences for the next generation.",
      tags: ["Vetris", "Iron Oak", "Ventures", "Leadership"],
    },
  ] as Capability[],
  technologies: [
    "REACT", "NEXT.JS", "TYPESCRIPT", "THREE.JS", "R3F", "GLSL SHADERS",
    "GSAP", "SCROLLTRIGGER", "LENIS", "TAILWIND CSS", "FIGMA", "BLENDER",
    "POSTERS", "BRANDING", "VETRIS", "IRON OAK"
  ],
};
