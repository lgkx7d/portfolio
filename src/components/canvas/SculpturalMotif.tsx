"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

interface SculpturalMotifProps {
  mouse: React.MutableRefObject<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
    speed?: number;
  }>;
}

export function SculpturalMotif({ mouse }: SculpturalMotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth continuous rotation
    groupRef.current.rotation.y += delta * 0.15;

    if (mesh1Ref.current) {
      mesh1Ref.current.rotation.x += delta * 0.25;
      mesh1Ref.current.rotation.z += delta * 0.15;
    }

    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.y -= delta * 0.3;
      mesh2Ref.current.rotation.x += delta * 0.1;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x -= delta * 0.1;
      outerRingRef.current.rotation.z += delta * 0.2;
    }

    // Pointer parallax reaction
    const targetRotX = mouse.current.normalizedY * 0.35;
    const targetRotY = mouse.current.normalizedX * 0.35;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Core LP Sculptural Geometry 1 (Interlocking Icosahedron) */}
        <mesh ref={mesh1Ref} scale={1.6}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={256}
            transmission={0.88}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.38}
            chromaticAberration={0.08}
            anisotropy={0.15}
            distortion={0.25}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#FFFFFF"
          />
        </mesh>

        {/* Interlocking LP Ring (Geometry 2) */}
        <mesh ref={mesh2Ref} scale={1.2} position={[0, 0, 0]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#111111"
            metalness={0.9}
            roughness={0.1}
            wireframe
          />
        </mesh>

        {/* Outer Sculptural Orbit Ring */}
        <mesh ref={outerRingRef} scale={2.4}>
          <torusGeometry args={[1, 0.018, 16, 100]} />
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
