"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { SculpturalMotif } from "@/components/canvas/SculpturalMotif";
import { Suspense } from "react";
import * as THREE from "three";

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

function VirtualLight({ mouse }: SceneCanvasProps) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    const targetX = mouse.current.normalizedX * 10;
    const targetY = mouse.current.normalizedY * 10;

    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.1);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.1);
  });

  return <pointLight ref={lightRef} position={[0, 0, 5]} intensity={2.5} color="#F7F5F0" />;
}

export function SceneCanvas({ mouse, isPressed }: SceneCanvasProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-75">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#D44D35" />
        <VirtualLight mouse={mouse} />

        <Suspense fallback={null}>
          <SculpturalMotif mouse={mouse} isPressed={isPressed} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
