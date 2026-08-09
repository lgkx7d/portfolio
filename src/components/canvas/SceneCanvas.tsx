"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { SculpturalMotif } from "@/components/canvas/SculpturalMotif";
import { Suspense } from "react";

interface SceneCanvasProps {
  mouse: React.MutableRefObject<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
  }>;
}

export function SceneCanvas({ mouse }: SceneCanvasProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#D44D35" />

        <Suspense fallback={null}>
          <SculpturalMotif mouse={mouse} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
