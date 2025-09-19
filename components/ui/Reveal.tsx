'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { transitions, dur, ease } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  delayStep?: number; // For staggered animations
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  delayStep = 0,
  duration = dur.md,
  className = '',
  once = true
}: RevealProps) {
  const { shouldReduceMotion } = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getTransition = () => {
    switch (direction) {
      case 'up':
        return transitions.slideUp;
      case 'down':
        return transitions.slideDown;
      case 'left':
        return transitions.slideLeft;
      case 'right':
        return transitions.slideRight;
      case 'fade':
      default:
        return transitions.fade;
    }
  };

  const transition = getTransition();

  return (
    <motion.div
      className={className}
      initial={transition.initial}
      whileInView={transition.animate}
      exit={transition.exit}
      transition={{
        duration,
        delay: delay + delayStep,
        ease: ease.out
      }}
      viewport={{ once, margin: '-10%' }}
    >
      {children}
    </motion.div>
  );
}