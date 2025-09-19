'use client';

import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import * as THREE from 'three';

interface ParticleGridMeshProps {
  count?: number;
  size?: number;
  spacing?: number;
  scrollProgress?: number;
  mouseReactive?: boolean;
}

function ParticleGridMesh({ 
  count = 50,
  size = 0.02,
  spacing = 0.5,
  scrollProgress = 0,
  mouseReactive = false
}: ParticleGridMeshProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { shouldReduceMotion } = useReducedMotion();
  const { viewport, pointer } = useThree();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        temp.push({
          position: [
            (i - count / 2) * spacing,
            (j - count / 2) * spacing,
            0
          ],
          originalZ: 0,
          delay: (i + j) * 0.01
        });
      }
    }
    return temp;
  }, [count, spacing]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;

    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      const [x, y] = particle.position;
      
      // Base Z displacement from scroll
      let z = Math.sin(scrollProgress * Math.PI + particle.delay) * 0.3;
      
      // Add mouse interaction if enabled
      if (mouseReactive) {
        const mouseDistance = Math.sqrt(
          Math.pow(pointer.x * viewport.width / 2 - x, 2) + 
          Math.pow(pointer.y * viewport.height / 2 - y, 2)
        );
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 2);
        z += mouseInfluence * 0.5;
      }
      
      // Subtle wave animation
      z += Math.sin(time * 0.5 + x * 2 + y * 2) * 0.1;
      
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(1 + z * 0.5);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, particles.length]}
    >
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial 
        color="#4A90E2" 
        transparent 
        opacity={0.6}
      />
    </instancedMesh>
  );
}

function Scene(props: ParticleGridMeshProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <ParticleGridMesh {...props} />
    </>
  );
}

interface ParticleGridProps extends ParticleGridMeshProps {
  className?: string;
}

export default function ParticleGrid({ 
  className = '', 
  ...gridProps 
}: ParticleGridProps) {
  const { shouldReduceMotion } = useReducedMotion();
  const [mouseReactive, setMouseReactive] = useState(false);

  if (shouldReduceMotion) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10" />
      </div>
    );
  }

  return (
    <div className={`relative ${className} pointer-events-none`}>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setMouseReactive(!mouseReactive)}
          className="px-3 py-1 text-xs bg-card border rounded-md hover:bg-muted transition-colors pointer-events-auto"
          aria-label={`${mouseReactive ? 'Disable' : 'Enable'} mouse interaction`}
        >
          {mouseReactive ? 'Static' : 'Interactive'}
        </button>
      </div>
      
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 pointer-events-none" />
      }>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          style={{ pointerEvents: mouseReactive ? 'auto' : 'none' }}
        >
          <Scene {...gridProps} mouseReactive={mouseReactive} />
        </Canvas>
      </Suspense>
    </div>
  );
}