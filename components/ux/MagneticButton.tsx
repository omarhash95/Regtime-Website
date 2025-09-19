'use client';

import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number; // 0-1, how strong the magnetic effect is
  radius?: number; // pixels, how far the effect reaches
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.3,
  radius = 100,
  disabled = false,
  type = 'button'
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || shouldReduceMotion || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < radius) {
      const factor = (1 - distance / radius) * strength;
      const x = deltaX * factor;
      const y = deltaY * factor;
      
      (ref.current as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (!ref.current || shouldReduceMotion) return;
    (ref.current as HTMLElement).style.transform = 'translate(0px, 0px)';
  };

  const motionProps = shouldReduceMotion ? {} : {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  };

  const commonProps = {
    ref: ref as any,
    className: `${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { 
      transition: shouldReduceMotion ? 'none' : 'transform 0.2s ease-out',
      willChange: 'transform'
    },
    ...motionProps
  };

  if (href && !disabled) {
    return (
      <motion.div {...commonProps}>
        <Link href={href} className="block w-full h-full">
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...commonProps}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}