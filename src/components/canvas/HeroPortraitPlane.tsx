"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const HeroPortraitShader = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uTension: { value: 0 },
    uVelocity: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uHover;
    uniform float uTension;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Proximity wave displacement
      float dist = distance(uv, uMouse);
      float wave = sin(dist * 12.0 - uTime * 3.0) * 0.08 * (uHover + uTension * 1.5);
      pos.z += wave;

      // Press tension pinch
      pos.x *= (1.0 - uTension * 0.08 * sin(dist * 6.0));
      pos.y *= (1.0 - uTension * 0.08 * cos(dist * 6.0));

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTension;
    uniform float uVelocity;
    uniform float uTime;

    // Pseudo-random noise
    float rand(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;

      // Velocity RGB edge split
      float split = (0.012 * uHover + 0.025 * uTension + 0.005 * uVelocity);
      vec4 r = texture2D(uTexture, uv + vec2(split, 0.0));
      vec4 g = texture2D(uTexture, uv);
      vec4 b = texture2D(uTexture, uv - vec2(split, 0.0));

      vec3 color = vec3(r.r, g.g, b.b);

      // Artistic Monochrome Thresholding
      float luminance = dot(color, vec3(0.299, 0.587, 0.114));
      float threshold = smoothstep(0.2, 0.8, luminance);
      vec3 monoColor = mix(vec3(0.07), vec3(0.96, 0.95, 0.94), threshold);

      // Subtle Terracotta Tint on high velocity / tension
      vec3 accentColor = mix(monoColor, vec3(0.83, 0.30, 0.21), uTension * 0.4);

      // Film Grain Overlay
      float noise = (rand(uv * uTime) - 0.5) * 0.06;
      accentColor += noise;

      gl_FragColor = vec4(accentColor, 1.0);
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
    speed?: number;
  }>;
  isPressed?: boolean;
}

export function HeroPortraitPlane({ imageSrc, mouse, isPressed }: HeroPortraitPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uTension: { value: 0 },
      uVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;

    // Target mouse UV
    const targetUvX = (mouse.current.normalizedX + 1) * 0.5;
    const targetUvY = (mouse.current.normalizedY + 1) * 0.5;

    mat.uniforms.uMouse.value.x = THREE.MathUtils.lerp(mat.uniforms.uMouse.value.x, targetUvX, 0.1);
    mat.uniforms.uMouse.value.y = THREE.MathUtils.lerp(mat.uniforms.uMouse.value.y, targetUvY, 0.1);

    // Tension lerp on press
    const targetTension = isPressed ? 1 : 0;
    mat.uniforms.uTension.value = THREE.MathUtils.lerp(mat.uniforms.uTension.value, targetTension, 0.1);

    // Velocity uniform lerp
    const targetVel = Math.min((mouse.current.speed || 0) * 0.05, 1);
    mat.uniforms.uVelocity.value = THREE.MathUtils.lerp(mat.uniforms.uVelocity.value, targetVel, 0.1);

    // Plane tilt
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.current.normalizedX * 0.18, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.current.normalizedY * 0.18, 0.05);
  });

  return (
    <mesh
      ref={meshRef}
      scale={[3.4, 4.4, 1]}
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
        args={[HeroPortraitShader]}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
