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
    name: "PENDEM JR",
    firstName: "PENDEM",
    lastName: "JR",
    role: "CREATIVE DEVELOPER & DESIGNER",
    headline: "DIGITAL EXPERIENCES THAT PEOPLE REMEMBER",
    location: "HYDERABAD, INDIA",
    timezone: "Asia/Kolkata",
    availability: "Available for Q3/Q4 select projects",
    email: "pendemjr@gmail.com",
    socials: [
      { name: "GITHUB", url: "https://github.com" },
      { name: "LINKEDIN", url: "https://linkedin.com" },
      { name: "TWITTER / X", url: "https://x.com" },
      { name: "INSTAGRAM", url: "https://instagram.com" },
    ],
    bio: [
      "I operate at the intersection of creative direction, 3D WebGL engineering, and modern frontend architecture. I build spatial digital worlds that turn complex technical concepts into visceral visual experiences.",
      "With a background spanning motion choreography, shader development, and full-stack React systems, I help forward-thinking brands, studios, and founders stand out through uncompromising design execution.",
    ],
    philosophy: [
      "I DON'T JUST BUILD WEBSITES.",
      "I CRAFT IMMERSIVE DIGITAL WORLDS WITH CONFIDENCE & PRECISION."
    ],
    portraitImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
  },
  projects: [
    {
      id: "aetheria",
      number: "01",
      title: "AETHERIA SPATIAL AUDIO",
      category: "BRAND & WEBGL EXPERIENCE",
      year: "2026",
      stack: ["THREE.JS", "REACT THREE FIBER", "GSAP", "GLSL SHADERS", "NEXT.JS"],
      tagline: "An interactive spatial audio engine showcase with real-time audio-reactive 3D simulations.",
      summary: "A spatial sound platform built to demonstrate real-time WebGL node synthesis, custom vertex displacement shaders, and dynamic camera choreography.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#D44D35",
      caseStudy: {
        client: "Aetheria Audio Labs",
        role: "Lead Creative Developer",
        duration: "3 Months",
        challenge: "Aetheria needed a web experience to convey the feeling of 360-degree acoustic immersion without requiring external hardware plugins.",
        solution: "Engineered a WebGL point-cloud visualization powered by Web Audio API FFT data and custom R3F instanced meshes, synchronized via GSAP ScrollTrigger.",
        impact: "+340% increase in user session duration and featured on Site of the Day showcases.",
        gallery: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
        ],
        liveUrl: "https://example.com/aetheria",
      },
    },
    {
      id: "chronos",
      number: "02",
      title: "CHRONOS HAUTE HORLOGERIE",
      category: "E-COMMERCE & 3D CONFIGURATOR",
      year: "2025",
      stack: ["R3F", "DREI", "TYPESCRIPT", "TAILWIND", "LENIS"],
      tagline: "Ultra-luxury watch customization engine rendered entirely in real-time GLTF WebGL.",
      summary: "High-precision physical watch rendering with customizable materials, ray-cast mesh interactions, and fluid micro-animations.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#2A2A2A",
      caseStudy: {
        client: "Chronos Timepieces",
        role: "3D Web Developer & UI Designer",
        duration: "4 Months",
        challenge: "Rendering high-poly Swiss watch mechanisms in browser environments at 60 FPS across both desktop and mobile viewports.",
        solution: "Optimized GLTF models using Draco compression, MeshTransmissionMaterial shaders for sapphires, and dynamic DPR scaling.",
        impact: "Processed $2.4M in pre-orders within the first 30 days of launch.",
        gallery: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200",
        ],
        liveUrl: "https://example.com/chronos",
      },
    },
    {
      id: "synapse",
      number: "03",
      title: "SYNAPSE AI DESIGN SYSTEM",
      category: "INTERACTIVE BRAND PORTAL",
      year: "2025",
      stack: ["NEXT.JS", "GSAP SCROLLTRIGGER", "SPLITTYPE", "CANVAS 2D"],
      tagline: "Generative brand identity platform for an advanced intelligence studio.",
      summary: "Editorial web experience combining fluid typography masking, procedural noise fields, and interactive physics node cards.",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#4A5568",
      caseStudy: {
        client: "Synapse Intelligence",
        role: "Creative Director & Engineer",
        duration: "2 Months",
        challenge: "Communicating complex neural network abstractions through elegant editorial design rather than generic sci-fi tropes.",
        solution: "Built custom text clip-path transitions, scroll-driven Canvas 2D vector field nodes, and a responsive dark/light editorial palette.",
        impact: "Awarded Distinction in Motion Graphics and Web Design.",
        gallery: [
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
        ],
        liveUrl: "https://example.com/synapse",
      },
    },
    {
      id: "velox",
      number: "04",
      title: "VELOX ELECTRIC MOBILITY",
      category: "EXPERIMENTAL LAUNCH SITE",
      year: "2024",
      stack: ["THREE.JS", "GLSL", "GSAP", "REACT", "ZUSTAND"],
      tagline: "Cinematic camera path journey following an autonomous vehicle prototype through futuristic landscapes.",
      summary: "Scroll-scrubbed camera animation through a procedural GLSL terrain scene with dynamic lighting transitions.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#D44D35",
      caseStudy: {
        client: "Velox Mobility",
        role: "Lead WebGL Engineer",
        duration: "3 Months",
        challenge: "Creating an immersive 3D automotive reveal that runs smoothly on low-power mobile GPUs.",
        solution: "Utilized CatmullRomCurve3 spline camera route interpolations, instanced vegetation meshes, and automatic performance degradation fallbacks.",
        impact: "Over 1.2M unique visitors with zero recorded GPU crash incidents.",
        gallery: [
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200",
        ],
        liveUrl: "https://example.com/velox",
      },
    },
  ] as Project[],
  timeline: [
    {
      year: "2026",
      role: "INDEPENDENT CREATIVE DEVELOPER",
      company: "STUDIO PENDEM",
      description: "Partnering with global brands, design agencies, and tech pioneers to craft award-winning WebGL experiences and design systems.",
      highlights: [
        "Architected spatial WebGL sites for high-growth tech startups.",
        "Built bespoke R3F shader materials and custom GSAP storytelling pipelines.",
      ],
      artifactImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2025",
      role: "SENIOR FRONTEND ARCHITECT",
      company: "NEXUS INTERACTIVE",
      description: "Led the frontend and WebGL engineering division, building flagship web apps and interactive motion systems.",
      highlights: [
        "Reduced initial bundle sizes by 42% while adding 3D scenes.",
        "Mentored a team of 6 frontend and 3D developers.",
      ],
      artifactImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2024",
      role: "CREATIVE TECHNOLOGIST",
      company: "KINETIC DIGITAL",
      description: "Focused on micro-interactions, GSAP ScrollTrigger timelines, and procedural Canvas 2D visualizer tools.",
      highlights: [
        "Built 12+ client websites featured on CSS Design Awards and Awwwards.",
        "Created an internal R3F component UI system.",
      ],
      artifactImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2023",
      role: "UI/UX & INTERACTION ENGINEER",
      company: "FORMA LABS",
      description: "Engineered web typography systems, smooth scroll integrations, and high-performance React web applications.",
      highlights: [
        "Pioneered responsive variable font animations.",
        "Built component libraries adopted across 8 internal projects.",
      ],
      artifactImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2022",
      role: "FRONTEND DEVELOPER & 3D EXPLORER",
      company: "INDIE FREELANCE",
      description: "Started deep exploration of Three.js, WebGL shaders, math physics simulations, and modern JavaScript ecosystems.",
      highlights: [
        "Mastered WebGL fundamentals, GLSL shaders, and Three.js math.",
        "Launched first open-source 3D interactive experiments.",
      ],
      artifactImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    },
  ] as TimelineMilestone[],
  capabilities: [
    {
      number: "01",
      title: "CREATIVE DEVELOPMENT",
      description: "Building bespoke web applications where code serves visual narrative. High performance, zero visual compromise.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      number: "02",
      title: "WEBGL & 3D INTERACTION",
      description: "Real-time 3D scenes, custom GLSL shaders, lighting pipelines, and procedural geometry inside the browser.",
      tags: ["Three.js", "R3F", "Drei", "GLSL Shaders", "Blender"],
    },
    {
      number: "03",
      title: "MOTION & STORYTELLING",
      description: "Choreographed animation timelines, scroll-driven narratives, character tracking, and seamless scene transitions.",
      tags: ["GSAP", "ScrollTrigger", "Lenis", "Framer Motion"],
    },
    {
      number: "04",
      title: "EDITORIAL DESIGN & DIRECTION",
      description: "Asymmetrical typography layouts, generous whitespace, confident branding, and handcrafted micro-interactions.",
      tags: ["Typography", "Layout Systems", "Figma", "UI/UX"],
    },
  ] as Capability[],
  technologies: [
    "REACT", "NEXT.JS", "TYPESCRIPT", "THREE.JS", "R3F", "GLSL SHADERS",
    "GSAP", "SCROLLTRIGGER", "LENIS", "ZUSTAND", "TAILWIND CSS", "BLENDER",
    "WEBGL", "POSTPROCESSING", "HTML5 CANVAS", "FIGMA"
  ],
};
