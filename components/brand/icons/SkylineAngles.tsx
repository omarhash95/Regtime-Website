'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SkylineAnglesProps {
  strokeWidth?: number;
  rounded?: boolean;
  color?: string;
  className?: string;
  animate?: boolean;
}

/**
 * SkylineAngles - Angular geometric building illustration
 * 
 * Usage examples:
 * <SkylineAngles /> // Default
 * <SkylineAngles strokeWidth={2} color="#4A90E2" animate />
 * <SkylineAngles rounded={false} className="w-24 h-12" />
 */
export default function SkylineAngles({
  strokeWidth = 1.5,
  rounded = true,
  color = 'currentColor',
  className = 'w-16 h-8',
  animate = false
}: SkylineAnglesProps) {
  const { shouldReduceMotion } = useReducedMotion();
  const shouldAnimate = animate && !shouldReduceMotion;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
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
      aria-label="Angular building skyline"
    >
      {/* Angular Building 1 */}
      <motion.path
        d="M4 28 L4 12 L10 8 L16 12 L16 28"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
      />
      
      {/* Angular Building 2 */}
      <motion.path
        d="M20 28 L20 16 L28 10 L36 16 L36 28"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.3, duration: 1.5, ease: "easeInOut" } : undefined}
      />
      
      {/* Angular Building 3 */}
      <motion.path
        d="M40 28 L40 18 L44 14 L48 18 L48 28"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.6, duration: 1.5, ease: "easeInOut" } : undefined}
      />
      
      {/* Angular Building 4 */}
      <motion.path
        d="M52 28 L52 10 L58 6 L60 10 L60 28"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.9, duration: 1.5, ease: "easeInOut" } : undefined}
      />
    </svg>
  );
}