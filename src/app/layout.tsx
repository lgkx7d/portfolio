import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { FilmGrain } from "@/components/layout/FilmGrain";

export const metadata: Metadata = {
  title: "PENDEM JR — Creative Developer & Designer",
  description: "Portfolio of Pendem Jr — Creative Developer specializing in 3D WebGL experiences, spatial web systems, GLSL shaders, and modern frontend architecture.",
  keywords: ["Creative Developer", "WebGL", "Three.js", "React Three Fiber", "GSAP", "Portfolio", "Frontend Architect", "Hyderabad"],
  openGraph: {
    title: "PENDEM JR — Creative Developer & Designer",
    description: "Digital experiences crafted with confidence, precision, and WebGL technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-ivory text-ink">
      <body className="relative bg-ivory text-ink antialiased">
        <FilmGrain />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
