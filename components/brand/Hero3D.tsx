'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import HolographicRibbon from '@/scenes/HolographicRibbon';

interface Hero3DProps {
  height?: number;
  intensity?: number;
  speed?: number;
  parallaxStrength?: number;
  className?: string;
}

export default function Hero3D({ 
  height = 420, 
  intensity = 0.35,
  speed = 0.8,
  parallaxStrength = 0.1,
  className = ''
}: Hero3DProps) {
  const [shouldShow3D, setShouldShow3D] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldShow3D(!mq.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldShow3D(!e.matches);
    };
    
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: '100%', height }}
    >
      <HolographicRibbon 
        preset="depth"
        intensity={intensity}
        speed={speed}
        className="absolute inset-0"
      />
    </div>
  );
}