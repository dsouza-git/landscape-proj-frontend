"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeonTorusProps {
  mousePosition: { x: number; y: number };
  position?: [number, number, number];
  color?: string;
  scale?: number;
}

export default function NeonTorus({
  mousePosition,
  position = [0, 0, 0],
  color = "#7b2ff7",
  scale = 1,
}: NeonTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#00d4ff") },
        uColor2: { value: new THREE.Color(color) },
        uColor3: { value: new THREE.Color("#ff00e5") },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uMouseX;
        uniform float uMouseY;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          float pattern = sin(vUv.x * 6.28 + uTime * 0.5) * 0.5 + 0.5;
          float mouseInfluence = (uMouseX + 1.0) * 0.5;
          
          vec3 color = mix(uColor1, uColor2, pattern);
          color = mix(color, uColor3, sin(vUv.y * 3.14 + uTime * 0.3) * 0.5 + 0.5);
          
          // Fresnel effect for glow
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          color += fresnel * uColor1 * 0.5;
          
          // Mouse influence on brightness
          float brightness = 0.8 + mouseInfluence * 0.4;
          color *= brightness;
          
          gl_FragColor = vec4(color, 0.9);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [color]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.15 + mousePosition.y * 0.4;
    meshRef.current.rotation.y = t * 0.2 + mousePosition.x * 0.4;
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;

    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
    meshRef.current.position.x = position[0] + mousePosition.x * 0.3;

    // Update shader uniforms
    gradientMaterial.uniforms.uTime.value = t;
    gradientMaterial.uniforms.uMouseX.value = mousePosition.x;
    gradientMaterial.uniforms.uMouseY.value = mousePosition.y;

    // Glow mesh follows main mesh
    if (glowRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation);
      glowRef.current.position.copy(meshRef.current.position);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1.5, 0.4, 32, 64]} />
        <primitive object={gradientMaterial} attach="material" />
      </mesh>
      <mesh ref={glowRef} position={position} scale={scale * 1.02}>
        <torusGeometry args={[1.5, 0.42, 32, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
