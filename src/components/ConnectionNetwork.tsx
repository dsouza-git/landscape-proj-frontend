"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ConnectionNetworkProps {
  mousePosition: { x: number; y: number };
  nodeCount?: number;
}

export default function ConnectionNetwork({ mousePosition, nodeCount = 40 }: ConnectionNetworkProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { nodes, linePositions, lineColors } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        )
      );
    }

    // Pre-calculate connections
    const maxConnections = nodeCount * 4;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    return { nodes, linePositions, lineColors };
  }, [nodeCount]);

  const nodePositions = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = nodes[i].x;
      pos[i * 3 + 1] = nodes[i].y;
      pos[i * 3 + 2] = nodes[i].z;
    }
    return pos;
  }, [nodes, nodeCount]);

  useFrame((state) => {
    if (!groupRef.current || !linesRef.current) return;
    const t = state.clock.getElapsedTime();

    // Update node positions with animation
    const nodeAttr = groupRef.current.children[0] as THREE.Points;
    if (!nodeAttr) return;
    const posAttr = nodeAttr.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      posArray[i3] = nodes[i].x + Math.sin(t * 0.3 + i * 0.5) * 0.3 + mousePosition.x * 0.5;
      posArray[i3 + 1] = nodes[i].y + Math.cos(t * 0.4 + i * 0.3) * 0.3 + mousePosition.y * 0.3;
      posArray[i3 + 2] = nodes[i].z + Math.sin(t * 0.2 + i * 0.7) * 0.2;
    }
    posAttr.needsUpdate = true;

    // Update connections
    const connectionThreshold = 3.5;
    let lineIndex = 0;

    const cyan = new THREE.Color("#00d4ff");
    const purple = new THREE.Color("#7b2ff7");

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const i3 = i * 3;
        const j3 = j * 3;
        const dx = posArray[i3] - posArray[j3];
        const dy = posArray[i3 + 1] - posArray[j3 + 1];
        const dz = posArray[i3 + 2] - posArray[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionThreshold && lineIndex < linePositions.length / 6) {
          const li = lineIndex * 6;
          linePositions[li] = posArray[i3];
          linePositions[li + 1] = posArray[i3 + 1];
          linePositions[li + 2] = posArray[i3 + 2];
          linePositions[li + 3] = posArray[j3];
          linePositions[li + 4] = posArray[j3 + 1];
          linePositions[li + 5] = posArray[j3 + 2];

          const alpha = 1 - dist / connectionThreshold;
          const mixedColor = cyan.clone().lerp(purple, alpha);
          lineColors[li] = mixedColor.r;
          lineColors[li + 1] = mixedColor.g;
          lineColors[li + 2] = mixedColor.b;
          lineColors[li + 3] = mixedColor.r;
          lineColors[li + 4] = mixedColor.g;
          lineColors[li + 5] = mixedColor.b;

          lineIndex++;
        }
      }
    }

    // Clear remaining lines
    for (let i = lineIndex * 6; i < linePositions.length; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    const lineGeo = linesRef.current.geometry;
    (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (lineGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    lineGeo.setDrawRange(0, lineIndex * 2);

    // Global rotation
    groupRef.current.rotation.y = t * 0.03 + mousePosition.x * 0.15;
    groupRef.current.rotation.x = mousePosition.y * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Connection nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00d4ff"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
