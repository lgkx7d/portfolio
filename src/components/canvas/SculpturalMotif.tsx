"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SculpturalMotifProps {
  scrollProgress?: number;
  mouse: React.MutableRefObject<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
  }>;
}

export function SculpturalMotif({ mouse }: SculpturalMotifProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x -= delta * 0.15;
      outerRingRef.current.rotation.z += delta * 0.25;
    }

    // Pointer reactivity (subtle tilt towards cursor)
    const targetRotX = mouse.current.normalizedY * 0.4;
    const targetRotY = mouse.current.normalizedX * 0.4;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <group position={[0, 0, 0]}>
        {/* Core Sculptural Mesh */}
        <mesh ref={meshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={256}
            transmission={0.9}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.35}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#FFFFFF"
          />
        </mesh>

        {/* Outer Orbit Ring */}
        <mesh ref={outerRingRef} scale={2.6}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#D44D35"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}
