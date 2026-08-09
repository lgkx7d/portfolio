"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SculpturalMotifProps {
  mouse: React.MutableRefObject<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
    speed?: number;
  }>;
  isPressed?: boolean;
}

export function SculpturalMotif({ mouse, isPressed }: SculpturalMotifProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lMeshRef = useRef<THREE.Mesh>(null);
  const pMeshRef = useRef<THREE.Mesh>(null);
  const orbitRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow continuous rotation
    groupRef.current.rotation.y += delta * 0.12;

    if (lMeshRef.current) {
      lMeshRef.current.rotation.x += delta * 0.2;
      lMeshRef.current.rotation.z += delta * 0.1;
    }

    if (pMeshRef.current) {
      pMeshRef.current.rotation.y -= delta * 0.25;
      pMeshRef.current.rotation.x += delta * 0.15;
    }

    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.x -= delta * 0.08;
      orbitRingRef.current.rotation.z += delta * 0.18;
    }

    // Pointer tilt
    const targetRotX = mouse.current.normalizedY * 0.35;
    const targetRotY = mouse.current.normalizedX * 0.35;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

    // Mouse Press Tension (Advance LP sculpture toward camera)
    const targetZ = isPressed ? 1.5 : 0;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Sculptural Mesh 1: Interlocking L Geometry */}
        <mesh ref={lMeshRef} scale={1.7}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={256}
            transmission={0.88}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.4}
            chromaticAberration={0.08}
            anisotropy={0.15}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#FFFFFF"
          />
        </mesh>

        {/* Sculptural Mesh 2: Interlocking P Geometry Wireframe */}
        <mesh ref={pMeshRef} scale={1.3} position={[0, 0, 0]}>
          <octahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial
            color="#111111"
            metalness={0.9}
            roughness={0.1}
            wireframe
          />
        </mesh>

        {/* Outer Orbit Ring */}
        <mesh ref={orbitRingRef} scale={2.5}>
          <torusGeometry args={[1, 0.016, 16, 100]} />
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
