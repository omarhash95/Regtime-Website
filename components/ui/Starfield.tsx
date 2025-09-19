'use client';

import { Suspense, lazy, useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Lazy load Three.js components
const Canvas = lazy(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })));
const Points = lazy(() => import('@react-three/drei').then(mod => ({ default: mod.Points })));

interface StarfieldProps {
  className?: string;
  count?: number;
}

function Stars({ count = 5000 }: { count?: number }) {
  const ref = useRef<any>();
  const { shouldReduceMotion } = useReducedMotion();

  useEffect(() => {
    if (!ref.current || shouldReduceMotion) return;

    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    ref.current.geometry.setAttribute('position', new (window as any).THREE.BufferAttribute(positions, 3));
  }, [count, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <Points ref={ref} limit={count}>
      <pointsMaterial size={1.5} sizeAttenuation color="#ffffff" transparent opacity={0.6} />
    </Points>
  );
}

export default function Starfield({ className = '', count = 5000 }: StarfieldProps) {
  const { shouldReduceMotion } = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} />;
  }

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Suspense fallback={<div />}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars count={count} />
        </Canvas>
      </Suspense>
    </div>
  );
}