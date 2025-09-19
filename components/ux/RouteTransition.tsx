'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { transitions, dur, ease } from '@/lib/motion';

interface RouteTransitionProps {
  children: React.ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();
  const { shouldReduceMotion } = useReducedMotion();
  const [visitedRoutes, setVisitedRoutes] = useState<Set<string>>(new Set([pathname])); // Initialize with current path
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle initial load
  useEffect(() => {
    // Mark as not initial load after first render
    setIsInitialLoad(false);
  }, []);

  // Track visited routes to avoid re-animating
  useEffect(() => {
    setVisitedRoutes(prev => new Set(prev).add(pathname));
  }, [pathname]);

  const isFirstVisit = !visitedRoutes.has(pathname) && !isInitialLoad;
  const shouldAnimate = !shouldReduceMotion && isFirstVisit && !isInitialLoad;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={shouldAnimate ? transitions.fade.initial : false}
        animate={shouldAnimate ? transitions.fade.animate : { opacity: 1 }}
        exit={shouldAnimate ? transitions.fade.exit : {}}
        transition={{
          duration: shouldAnimate ? dur.sm : 0,
          ease: ease.out
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}