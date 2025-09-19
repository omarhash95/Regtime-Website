'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StatCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  decimals?: number;
  className?: string;
}

export default function StatCounter({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  separator = ',',
  decimals = 0,
  className = ''
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const { shouldReduceMotion } = useReducedMotion();
  
  const motionValue = useMotionValue(start);
  const springValue = useSpring(motionValue, {
    duration: shouldReduceMotion ? 0 : duration,
    bounce: 0
  });
  
  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });
    
    return unsubscribe;
  }, [springValue]);

  const formatNumber = (num: number) => {
    const rounded = Number(num.toFixed(decimals));
    const parts = rounded.toString().split('.');
    
    // Add thousand separators
    if (separator && parts[0].length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    
    return parts.join('.');
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{formatNumber(displayValue)}{suffix}
    </motion.span>
  );
}