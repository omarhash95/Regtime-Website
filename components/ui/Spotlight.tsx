'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SpotlightProps {
  size?: number;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
  className?: string;
}

export default function Spotlight({
  size = 300,
  intensity = 'medium',
  color = 'rgba(74, 144, 226, 0.15)',
  className = ''
}: SpotlightProps) {
  const { shouldReduceMotion } = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    let rafId: number;
    const updateSpotlight = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mousePosition.x - size / 2}px, ${mousePosition.y - size / 2}px, 0)`;
      }
      rafId = requestAnimationFrame(updateSpotlight);
    };

    document.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(updateSpotlight);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mousePosition, size, shouldReduceMotion]);

  const intensityMap = {
    low: 0.1,
    medium: 0.15,
    high: 0.25
  };

  if (shouldReduceMotion) {
    return (
      <div 
        className={`fixed inset-0 pointer-events-none z-10 ${className}`}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color.replace(/[\d.]+\)$/, `${intensityMap[intensity]})`)} 0%, transparent 50%)`
        }}
      />
    );
  }

  return (
    <div 
      ref={spotlightRef}
      className={`fixed pointer-events-none z-10 ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        willChange: 'transform'
      }}
    />
  );
}