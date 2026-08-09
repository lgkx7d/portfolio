"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

interface SceneCanvasProps {
  mouse: React.MutableRefObject<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
    speed?: number;
  }>;
  isPressed?: boolean;
}

function SoftLighting() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#D44D35" />
    </>
  );
}

export function SceneCanvas({ mouse }: SceneCanvasProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SoftLighting />
      </Canvas>
    </div>
  );
}
