"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGeometriesProps {
  mousePosition: { x: number; y: number };
}

function FloatingShape({
  position,
  geometry,
  color,
  wireframe,
  speed,
  mousePosition,
  scale = 1,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "dodecahedron" | "tetrahedron";
  color: string;
  wireframe: boolean;
  speed: number;
  mousePosition: { x: number; y: number };
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const originalPos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = t * speed * 0.3 + mousePosition.y * 0.3;
    meshRef.current.rotation.y = t * speed * 0.4 + mousePosition.x * 0.3;
    meshRef.current.rotation.z = Math.sin(t * speed * 0.2) * 0.2;

    meshRef.current.position.x = originalPos.x + Math.sin(t * speed * 0.5) * 0.5 + mousePosition.x * 0.4;
    meshRef.current.position.y = originalPos.y + Math.cos(t * speed * 0.3) * 0.5 + mousePosition.y * 0.3;
    meshRef.current.position.z = originalPos.z + Math.sin(t * speed * 0.4) * 0.3;

    // Breathing scale effect
    const breathe = 1 + Math.sin(t * speed) * 0.05;
    meshRef.current.scale.setScalar(scale * breathe);
  });

  const geoElement = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[0.6, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.5, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.5, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[0.6, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position}>
      {geoElement}
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.6 : 0.8}
        emissive={color}
        emissiveIntensity={wireframe ? 0.5 : 0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

const shapes: Array<{
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "dodecahedron" | "tetrahedron";
  color: string;
  wireframe: boolean;
  speed: number;
  scale: number;
}> = [
  { position: [-4, 2, -2], geometry: "icosahedron", color: "#00d4ff", wireframe: true, speed: 0.5, scale: 0.8 },
  { position: [4.5, -1.5, -3], geometry: "octahedron", color: "#7b2ff7", wireframe: true, speed: 0.7, scale: 0.9 },
  { position: [-3, -2.5, -1], geometry: "dodecahedron", color: "#ff00e5", wireframe: false, speed: 0.4, scale: 0.6 },
  { position: [3, 3, -4], geometry: "tetrahedron", color: "#c471ed", wireframe: true, speed: 0.6, scale: 0.7 },
  { position: [-5, 0, -2.5], geometry: "octahedron", color: "#4a90d9", wireframe: false, speed: 0.3, scale: 0.5 },
  { position: [5, 1, -3.5], geometry: "icosahedron", color: "#00d4ff", wireframe: true, speed: 0.45, scale: 0.6 },
  { position: [0, -3, -2], geometry: "dodecahedron", color: "#7b2ff7", wireframe: true, speed: 0.55, scale: 0.5 },
  { position: [-2, 3.5, -4], geometry: "tetrahedron", color: "#ff00e5", wireframe: false, speed: 0.35, scale: 0.4 },
];

export default function FloatingGeometries({ mousePosition }: FloatingGeometriesProps) {
  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} mousePosition={mousePosition} />
      ))}
    </group>
  );
}
