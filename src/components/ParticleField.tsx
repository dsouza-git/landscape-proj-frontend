"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  mousePosition: { x: number; y: number };
  count?: number;
}

export default function ParticleField({ mousePosition, count = 800 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#FF6B00"),
      new THREE.Color("#FF8C38"),
      new THREE.Color("#FFAA60"),
      new THREE.Color("#8B5E3C"),
      new THREE.Color("#5C3A1E"),
      new THREE.Color("#FAF5F0"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 18;
      positions[i3 + 1] = (Math.random() - 0.5) * 18;
      positions[i3 + 2] = (Math.random() - 0.5) * 12;

      velocities[i3] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.004;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return { positions, velocities, colors };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3] + Math.sin(t * 0.2 + i * 0.01) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.15 + i * 0.01) * 0.001;
      posArray[i3 + 2] += velocities[i3 + 2];

      posArray[i3] += mousePosition.x * 0.008;
      posArray[i3 + 1] += mousePosition.y * 0.008;

      if (posArray[i3] > 9) posArray[i3] = -9;
      if (posArray[i3] < -9) posArray[i3] = 9;
      if (posArray[i3 + 1] > 9) posArray[i3 + 1] = -9;
      if (posArray[i3 + 1] < -9) posArray[i3 + 1] = 9;
      if (posArray[i3 + 2] > 6) posArray[i3 + 2] = -6;
      if (posArray[i3 + 2] < -6) posArray[i3 + 2] = 6;
    }
    posAttr.needsUpdate = true;

    meshRef.current.rotation.y = t * 0.015 + mousePosition.x * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
