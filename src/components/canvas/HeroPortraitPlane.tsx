"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const PortraitShader = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Subtle wave displacement based on cursor proximity
      float dist = distance(uv, uMouse);
      float wave = sin(dist * 10.0 - uTime * 2.0) * 0.05 * uHover;
      pos.z += wave;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;
      
      // RGB shift on hover
      float shift = 0.01 * uHover * sin(uTime * 3.0);
      vec4 r = texture2D(uTexture, uv + vec2(shift, 0.0));
      vec4 g = texture2D(uTexture, uv);
      vec4 b = texture2D(uTexture, uv - vec2(shift, 0.0));

      gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
    }
  `,
};

interface HeroPortraitPlaneProps {
  imageSrc: string;
  mouse: React.MutableRefObject<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
  }>;
}

export function HeroPortraitPlane({ imageSrc, mouse }: HeroPortraitPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;

    // Map normalized mouse (-1 to 1) to UV space (0 to 1)
    const targetUvX = (mouse.current.normalizedX + 1) * 0.5;
    const targetUvY = (mouse.current.normalizedY + 1) * 0.5;

    mat.uniforms.uMouse.value.x = THREE.MathUtils.lerp(mat.uniforms.uMouse.value.x, targetUvX, 0.1);
    mat.uniforms.uMouse.value.y = THREE.MathUtils.lerp(mat.uniforms.uMouse.value.y, targetUvY, 0.1);

    // Subtle plane tilt
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.current.normalizedX * 0.15, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.current.normalizedY * 0.15, 0.05);
  });

  return (
    <mesh
      ref={meshRef}
      scale={[3.2, 4.2, 1]}
      onPointerOver={() => {
        if (meshRef.current) {
          (meshRef.current.material as THREE.ShaderMaterial).uniforms.uHover.value = 1;
        }
      }}
      onPointerOut={() => {
        if (meshRef.current) {
          (meshRef.current.material as THREE.ShaderMaterial).uniforms.uHover.value = 0;
        }
      }}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        args={[PortraitShader]}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
