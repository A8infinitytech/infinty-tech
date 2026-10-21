"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AbstractCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
    
    // Mouse interaction
    const targetX = state.mouse.x * 0.5;
    const targetY = state.mouse.y * 0.5;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.2}>
        <MeshDistortMaterial
          color="#3B82F6"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.6}
          roughness={0.2}
          opacity={0.3}
          transparent
        />
      </Sphere>
      {/* Secondary wireframe sphere for depth */}
      <Sphere args={[1.05, 50, 50]} scale={1.2}>
        <meshStandardMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.05;
    ref.current.rotation.x = time * 0.02;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#7C3AED" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFFFFF" />
      <AbstractCore />
      <ParticleField />
    </Canvas>
  );
}

