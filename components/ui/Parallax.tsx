'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function Parallax({
  children,
  speed = 0.5,
  className = ''
}: ParallaxProps) {
  const { shouldReduceMotion } = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shouldReduceMotion ? 'none' : `translateY(${Math.max(-20, Math.min(20, offset))}px)`,
        willChange: shouldReduceMotion ? 'auto' : 'transform'
      }}
    >
      {children}
    </div>
  );
}