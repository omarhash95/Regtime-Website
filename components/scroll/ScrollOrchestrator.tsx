'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { clamp01, smoothStep } from '@/lib/scroll';

interface ScrollStage {
  id: string;
  content: ReactNode;
  duration?: number; // 0-1, how much of the scroll this stage takes
  sticky?: boolean;
}

interface ScrollOrchestratorProps {
  stages: ScrollStage[];
  className?: string;
  children?: ReactNode;
}

export default function ScrollOrchestrator({ 
  stages, 
  className = '',
  children 
}: ScrollOrchestratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const { shouldReduceMotion } = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth spring for scroll progress (disabled in reduced motion)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 1000 : 100,
    damping: shouldReduceMotion ? 100 : 30,
    mass: shouldReduceMotion ? 0.1 : 1
  });

  // Calculate stage progress
  const stageProgress = useTransform(smoothProgress, (latest) => {
    const totalStages = stages.length;
    const stageSize = 1 / totalStages;
    const currentStageIndex = Math.floor(latest * totalStages);
    const stageStart = currentStageIndex * stageSize;
    const stageEnd = (currentStageIndex + 1) * stageSize;
    const progress = (latest - stageStart) / stageSize;
    
    return {
      current: Math.min(currentStageIndex, totalStages - 1),
      progress: clamp01(progress),
      global: latest
    };
  });

  // Update current stage for accessibility
  useEffect(() => {
    const unsubscribe = stageProgress.on('change', ({ current }) => {
      setCurrentStage(current);
    });
    return unsubscribe;
  }, [stageProgress]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${stages.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: useTransform(stageProgress, ({ current, progress }) => {
                if (shouldReduceMotion) {
                  // Discrete steps for reduced motion
                  return current === index ? 1 : 0;
                }
                
                // Smooth transitions
                if (current === index) {
                  return smoothStep(0, 0.2, progress);
                } else if (current === index - 1) {
                  return smoothStep(0.8, 1, progress);
                } else {
                  return 0;
                }
              }),
              transform: shouldReduceMotion ? 'none' : useTransform(
                stageProgress,
                ({ current, progress }) => {
                  if (current === index) {
                    const y = (1 - smoothStep(0, 0.3, progress)) * 20;
                    return `translateY(${y}px)`;
                  } else if (current === index - 1) {
                    const y = -smoothStep(0.7, 1, progress) * 20;
                    return `translateY(${y}px)`;
                  }
                  return 'translateY(0px)';
                }
              )
            }}
            aria-hidden={currentStage !== index}
          >
            {stage.content}
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col space-y-2">
          {stages.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-8 bg-border rounded-full overflow-hidden"
            >
              <motion.div
                className="w-full bg-brand-primary rounded-full"
                style={{
                  height: useTransform(stageProgress, ({ current, progress }) => {
                    if (current === index) {
                      return `${progress * 100}%`;
                    } else if (current > index) {
                      return '100%';
                    }
                    return '0%';
                  })
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Stage {currentStage + 1} of {stages.length}: {stages[currentStage]?.id}
      </div>

      {children}
    </div>
  );
}

// Hook for accessing scroll progress in child components
export function useScrollStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return {
    containerRef,
    progress: scrollYProgress
  };
}