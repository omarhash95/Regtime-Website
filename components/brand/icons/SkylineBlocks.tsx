'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SkylineBlocksProps {
  strokeWidth?: number;
  rounded?: boolean;
  color?: string;
  className?: string;
  animate?: boolean;
}

/**
 * SkylineBlocks - Geometric block building illustration
 * 
 * Usage examples:
 * <SkylineBlocks /> // Default
 * <SkylineBlocks strokeWidth={2} color="#4A90E2" animate />
 * <SkylineBlocks rounded={false} className="w-24 h-12" />
 */
export default function SkylineBlocks({
  strokeWidth = 1.5,
  rounded = true,
  color = 'currentColor',
  className = 'w-16 h-8',
  animate = false
}: SkylineBlocksProps) {
  const { shouldReduceMotion } = useReducedMotion();
  const shouldAnimate = animate && !shouldReduceMotion;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.8, ease: "easeInOut" }
    }
  };

  return (
    <svg
      viewBox="0 0 64 32"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap={rounded ? "round" : "butt"}
      strokeLinejoin={rounded ? "round" : "miter"}
      role="img"
      aria-label="Geometric block buildings"
    >
      {/* Block Building 1 - L-shaped */}
      <motion.path
        d="M4 28 L4 16 L12 16 L12 8 L20 8 L20 28 Z"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
      />
      
      {/* Block Building 2 - Stepped */}
      <motion.path
        d="M24 28 L24 20 L28 20 L28 12 L32 12 L32 6 L40 6 L40 28 Z"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.4, duration: 1.8, ease: "easeInOut" } : undefined}
      />
      
      {/* Block Building 3 - Simple block */}
      <motion.rect
        x="44"
        y="14"
        width="8"
        height="14"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.8, duration: 1.8, ease: "easeInOut" } : undefined}
      />
      
      {/* Block Building 4 - T-shaped */}
      <motion.path
        d="M54 28 L54 18 L52 18 L52 10 L60 10 L60 18 L58 18 L58 28 Z"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 1.2, duration: 1.8, ease: "easeInOut" } : undefined}
      />
    </svg>
  );
}