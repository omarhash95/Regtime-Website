'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SkylineBarsProps {
  strokeWidth?: number;
  rounded?: boolean;
  color?: string;
  className?: string;
  animate?: boolean;
}

/**
 * SkylineBars - Simple geometric building bars illustration
 * 
 * Usage examples:
 * <SkylineBars /> // Default
 * <SkylineBars strokeWidth={2} color="#4A90E2" animate />
 * <SkylineBars rounded={false} className="w-24 h-12" />
 */
export default function SkylineBars({
  strokeWidth = 1.5,
  rounded = true,
  color = 'currentColor',
  className = 'w-16 h-8',
  animate = false
}: SkylineBarsProps) {
  const { shouldReduceMotion } = useReducedMotion();
  const shouldAnimate = animate && !shouldReduceMotion;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" }
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
      aria-label="Stylized building skyline"
    >
      {/* Building 1 - Tall */}
      <motion.rect
        x="4"
        y="6"
        width="8"
        height="22"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
      />
      
      {/* Building 2 - Medium */}
      <motion.rect
        x="16"
        y="12"
        width="10"
        height="16"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.2, duration: 1.2, ease: "easeInOut" } : undefined}
      />
      
      {/* Building 3 - Short */}
      <motion.rect
        x="30"
        y="18"
        width="6"
        height="10"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.4, duration: 1.2, ease: "easeInOut" } : undefined}
      />
      
      {/* Building 4 - Medium-tall */}
      <motion.rect
        x="40"
        y="8"
        width="8"
        height="20"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.6, duration: 1.2, ease: "easeInOut" } : undefined}
      />
      
      {/* Building 5 - Tall */}
      <motion.rect
        x="52"
        y="4"
        width="7"
        height="24"
        variants={shouldAnimate ? pathVariants : undefined}
        initial={shouldAnimate ? "hidden" : undefined}
        animate={shouldAnimate ? "visible" : undefined}
        transition={shouldAnimate ? { delay: 0.8, duration: 1.2, ease: "easeInOut" } : undefined}
      />
    </svg>
  );
}