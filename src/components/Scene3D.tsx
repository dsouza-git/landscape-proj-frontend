"use client";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";

interface Scene3DProps {
  mousePosition: { x: number; y: number };
}

export default function Scene3D({ mousePosition }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Warm lighting */}
      <ambientLight intensity={0.4} color="#FFF5E6" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#FF8C38" />
      <pointLight position={[-5, 3, 3]} intensity={0.6} color="#FFAA60" />
      <pointLight position={[0, -3, 5]} intensity={0.4} color="#5C3A1E" />

      {/* Fog for depth */}
      <fog attach="fog" args={["#1A0E05", 6, 20]} />

      {/* Background particles in warm tones */}
      <ParticleField mousePosition={mousePosition} count={1000} />
    </Canvas>
  );
}
