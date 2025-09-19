'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { transitions, dur, ease } from '@/lib/motion';

interface KPITileProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
  animationDuration?: number;
}

export default function KPITile({
  title,
  value,
  suffix = '',
  prefix = '',
  description,
  icon,
  trend,
  className = '',
  animationDuration = 2000
}: KPITileProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { shouldReduceMotion } = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Count-up animation
  useEffect(() => {
    if (!isVisible || shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / animationDuration, 1);
      
      // Easing function for smooth count-up
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, value, animationDuration, shouldReduceMotion]);

  const getTrendColor = () => {
    if (!trend) return '';
    switch (trend.direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`bg-card rounded-lg p-6 shadow-sm ring-1 ring-border hover:shadow-md transition-shadow ${className}`}
      {...(shouldReduceMotion ? {} : transitions.slideUp)}
      transition={{ duration: dur.md, ease: ease.out }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && (
          <div className="text-brand-primary">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">
          {prefix}
          {displayValue.toLocaleString()}
          {suffix}
        </div>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {trend && (
          <div className={`flex items-center text-sm ${getTrendColor()}`}>
            <span className="mr-1" aria-hidden="true">
              {getTrendIcon()}
            </span>
            <span className="font-medium">
              {trend.value > 0 ? '+' : ''}{trend.value}%
            </span>
            <span className="ml-1 text-muted-foreground">
              {trend.label}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}