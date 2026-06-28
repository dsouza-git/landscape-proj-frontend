"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AbstractFoxProps {
  mousePosition: { x: number; y: number };
}

/**
 * Creates an abstract fox shape using geometric primitives.
 * The fox is composed of:
 * - Head (sphere, slightly flattened)
 * - Two triangular ears
 * - Snout (cone)
 * - Body (elongated sphere)
 * - Tail (curved tube)
 * - Legs (thin cylinders)
 * All in wireframe/semi-transparent style with warm orange/brown tones.
 */
export default function AbstractFox({ mousePosition }: AbstractFoxProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const tailRef = useRef<THREE.Mesh>(null!);
  const earLeftRef = useRef<THREE.Mesh>(null!);
  const earRightRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  // Fox body shader material
  const foxMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#FF6B00") },
        uColor2: { value: new THREE.Color("#FF8C38") },
        uColor3: { value: new THREE.Color("#5C3A1E") },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Subtle vertex displacement for "breathing" effect
          vec3 pos = position;
          float displacement = sin(pos.x * 3.0 + uTime * 0.8) * 0.02 
                             + sin(pos.y * 2.0 + uTime * 1.2) * 0.02;
          pos += normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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
          float pattern = sin(vUv.x * 4.0 + uTime * 0.4) * 0.5 + 0.5;
          float mouseInfluence = (uMouseX + 1.0) * 0.5;
          
          vec3 color = mix(uColor1, uColor2, pattern);
          color = mix(color, uColor3, sin(vUv.y * 2.5 + uTime * 0.3) * 0.3 + 0.3);
          
          // Fresnel glow
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
          color += fresnel * uColor1 * 0.6;
          
          float brightness = 0.85 + mouseInfluence * 0.3;
          color *= brightness;
          
          gl_FragColor = vec4(color, 0.85);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
    });
  }, []);

  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#FF6B00",
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      emissive: "#FF6B00",
      emissiveIntensity: 0.4,
    });
  }, []);

  // Tail curve
  const tailCurve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.3, 0.3, -0.2),
      new THREE.Vector3(0.8, 0.8, -0.3),
      new THREE.Vector3(1.2, 1.2, -0.1),
      new THREE.Vector3(1.4, 1.5, 0.2),
      new THREE.Vector3(1.3, 1.7, 0.4),
    ]);
    return new THREE.TubeGeometry(curve, 20, 0.08, 8, false);
  }, []);

  // Ambient particles around the fox
  const { particlePositions, particleColors } = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#FF6B00"),
      new THREE.Color("#FF8C38"),
      new THREE.Color("#FFAA60"),
      new THREE.Color("#5C3A1E"),
      new THREE.Color("#FAF5F0"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute particles in a fox-shaped cloud
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2 + Math.random() * 3;
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 0.5;
      positions[i3 + 2] = r * Math.cos(phi) * 0.6;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return { particlePositions: positions, particleColors: colors };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Fox head follows mouse gaze direction
    groupRef.current.rotation.y = mousePosition.x * 0.4 + Math.sin(t * 0.3) * 0.05;
    groupRef.current.rotation.x = mousePosition.y * -0.2 + Math.sin(t * 0.4) * 0.03;

    // Gentle floating
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    groupRef.current.position.x = mousePosition.x * 0.3;

    // Update shader
    foxMaterial.uniforms.uTime.value = t;
    foxMaterial.uniforms.uMouseX.value = mousePosition.x;
    foxMaterial.uniforms.uMouseY.value = mousePosition.y;

    // Tail wagging
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 2.5) * 0.3 + mousePosition.x * 0.2;
      tailRef.current.rotation.x = Math.sin(t * 1.5) * 0.1;
    }

    // Ear twitching
    if (earLeftRef.current) {
      earLeftRef.current.rotation.z = 0.3 + Math.sin(t * 3 + 1) * 0.08;
      earLeftRef.current.rotation.x = Math.sin(t * 2) * 0.05;
    }
    if (earRightRef.current) {
      earRightRef.current.rotation.z = -0.3 + Math.sin(t * 3.5) * 0.08;
      earRightRef.current.rotation.x = Math.sin(t * 2.2 + 0.5) * 0.05;
    }

    // Particles orbit
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < arr.length / 3; i++) {
        const i3 = i * 3;
        arr[i3] += Math.sin(t * 0.2 + i * 0.1) * 0.003 + mousePosition.x * 0.003;
        arr[i3 + 1] += Math.cos(t * 0.3 + i * 0.05) * 0.003 + mousePosition.y * 0.002;
      }
      posAttr.needsUpdate = true;
      particlesRef.current.rotation.y = t * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.3}>
      {/* === FOX HEAD === */}
      <group position={[0, 0.6, 0.8]}>
        {/* Main head - slightly flattened sphere */}
        <mesh scale={[1, 0.85, 0.9]}>
          <sphereGeometry args={[0.55, 16, 12]} />
          <primitive object={foxMaterial} attach="material" />
        </mesh>
        {/* Head wireframe overlay */}
        <mesh scale={[1.03, 0.88, 0.93]}>
          <sphereGeometry args={[0.55, 12, 8]} />
          <primitive object={wireframeMaterial} attach="material" />
        </mesh>

        {/* Left Ear */}
        <mesh ref={earLeftRef} position={[-0.3, 0.5, 0]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.2, 0.55, 4]} />
          <meshStandardMaterial
            color="#FF8C38"
            emissive="#FF6B00"
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        {/* Right Ear */}
        <mesh ref={earRightRef} position={[0.3, 0.5, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.2, 0.55, 4]} />
          <meshStandardMaterial
            color="#FF8C38"
            emissive="#FF6B00"
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>

        {/* Snout */}
        <mesh position={[0, -0.1, 0.5]} rotation={[-Math.PI / 2 + 0.3, 0, 0]}>
          <coneGeometry args={[0.2, 0.5, 8]} />
          <meshStandardMaterial
            color="#5C3A1E"
            emissive="#3C1F0A"
            emissiveIntensity={0.2}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Nose */}
        <mesh position={[0, -0.05, 0.75]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#1A0E05" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.2, 0.1, 0.42]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFAA60"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0.2, 0.1, 0.42]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFAA60"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Eye pupils */}
        <mesh position={[-0.2, 0.1, 0.48]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#1A0E05" />
        </mesh>
        <mesh position={[0.2, 0.1, 0.48]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#1A0E05" />
        </mesh>
      </group>

      {/* === FOX BODY === */}
      <group>
        {/* Main body */}
        <mesh position={[0, 0, 0]} scale={[0.7, 0.6, 1.1]}>
          <sphereGeometry args={[0.8, 16, 12]} />
          <primitive object={foxMaterial} attach="material" />
        </mesh>
        {/* Body wireframe */}
        <mesh position={[0, 0, 0]} scale={[0.73, 0.63, 1.13]}>
          <sphereGeometry args={[0.8, 10, 8]} />
          <primitive object={wireframeMaterial} attach="material" />
        </mesh>

        {/* Chest (lighter area) */}
        <mesh position={[0, -0.05, 0.55]} scale={[0.4, 0.45, 0.3]}>
          <sphereGeometry args={[0.6, 12, 8]} />
          <meshStandardMaterial
            color="#FAF5F0"
            emissive="#FFAA60"
            emissiveIntensity={0.1}
            transparent
            opacity={0.7}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* === LEGS === */}
      {/* Front left */}
      <mesh position={[-0.3, -0.6, 0.4]} rotation={[0.15, 0, 0.05]}>
        <cylinderGeometry args={[0.06, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#8B5E3C" emissive="#5C3A1E" emissiveIntensity={0.2} />
      </mesh>
      {/* Front right */}
      <mesh position={[0.3, -0.6, 0.4]} rotation={[0.15, 0, -0.05]}>
        <cylinderGeometry args={[0.06, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#8B5E3C" emissive="#5C3A1E" emissiveIntensity={0.2} />
      </mesh>
      {/* Back left */}
      <mesh position={[-0.3, -0.6, -0.4]} rotation={[-0.1, 0, 0.05]}>
        <cylinderGeometry args={[0.07, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#8B5E3C" emissive="#5C3A1E" emissiveIntensity={0.2} />
      </mesh>
      {/* Back right */}
      <mesh position={[0.3, -0.6, -0.4]} rotation={[-0.1, 0, -0.05]}>
        <cylinderGeometry args={[0.07, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#8B5E3C" emissive="#5C3A1E" emissiveIntensity={0.2} />
      </mesh>

      {/* === TAIL === */}
      <mesh ref={tailRef} position={[0, 0.1, -0.9]}>
        <primitive object={tailCurve} attach="geometry" />
        <meshStandardMaterial
          color="#FF8C38"
          emissive="#FF6B00"
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      {/* Tail tip (white) */}
      <mesh position={[0, 0.1, -0.9]}>
        <primitive object={tailCurve} attach="geometry" />
        <meshStandardMaterial
          color="#FAF5F0"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* === AMBIENT PARTICLES === */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleColors.length / 3}
            array={particleColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
