'use client';

import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number; // 0-1, how strong the tilt effect is
  glareEffect?: boolean;
  disabled?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  tiltStrength = 0.1,
  glareEffect = false,
  disabled = false
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || shouldReduceMotion || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    const rotateX = -deltaY * tiltStrength * 10;
    const rotateY = deltaX * tiltStrength * 10;
    
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    if (glareEffect) {
      const glareX = (deltaX + 1) * 50;
      const glareY = (deltaY + 1) * 50;
      ref.current.style.setProperty('--glare-x', `${glareX}%`);
      ref.current.style.setProperty('--glare-y', `${glareY}%`);
    }
  };

  const handleMouseLeave = () => {
    if (!ref.current || shouldReduceMotion) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const motionProps = shouldReduceMotion ? {} : {
    whileHover: { scale: 1.02 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  };

  return (
    <motion.div
      ref={ref}
      className={`${className} ${disabled ? '' : 'cursor-pointer'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transformStyle: 'preserve-3d',
        transition: shouldReduceMotion ? 'none' : 'transform 0.1s ease-out',
        willChange: 'transform',
        ...(glareEffect && {
          background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)`
        })
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}