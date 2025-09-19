'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GeometricFrameProps {
  children: ReactNode;
  variant?: 'angular' | 'corner-cut' | 'diagonal';
  className?: string;
  animate?: boolean;
}

/**
 * GeometricFrame - Creates geometric frame overlays like in the reference images
 */
export default function GeometricFrame({
  children,
  variant = 'angular',
  className = '',
  animate = false
}: GeometricFrameProps) {
  const { shouldReduceMotion } = useReducedMotion();

  const getClipPath = () => {
    switch (variant) {
      case 'angular':
        return 'polygon(0 0, calc(100% - 4rem) 0, 100% 4rem, 100% 100%, 0 100%)';
      case 'corner-cut':
        return 'polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 2rem 100%, 0 calc(100% - 2rem))';
      case 'diagonal':
        return 'polygon(0 0, 100% 0, 85% 100%, 0 100%)';
      default:
        return 'none';
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main content with geometric clip */}
      <motion.div
        className="relative"
        style={{
          clipPath: getClipPath()
        }}
        initial={animate && !shouldReduceMotion ? { scale: 0.95, opacity: 0 } : {}}
        animate={animate && !shouldReduceMotion ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* Geometric frame overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full text-white/30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          {variant === 'angular' && (
            <motion.path
              d="M0 0 L96 0 L100 4 L100 100 L0 100 Z"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              initial={animate && !shouldReduceMotion ? { pathLength: 0 } : {}}
              animate={animate && !shouldReduceMotion ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
          {variant === 'corner-cut' && (
            <motion.path
              d="M0 0 L98 0 L100 2 L100 98 L98 100 L2 100 L0 98 Z"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              initial={animate && !shouldReduceMotion ? { pathLength: 0 } : {}}
              animate={animate && !shouldReduceMotion ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
          {variant === 'diagonal' && (
            <motion.path
              d="M0 0 L100 0 L85 100 L0 100 Z"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              initial={animate && !shouldReduceMotion ? { pathLength: 0 } : {}}
              animate={animate && !shouldReduceMotion ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </svg>
      </div>
    </div>
  );
}