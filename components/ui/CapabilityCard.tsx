'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CapabilityCardProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  features?: string[];
  className?: string;
  delay?: number;
}

export default function CapabilityCard({
  icon: Icon,
  title,
  description,
  features = [],
  className = '',
  delay = 0
}: CapabilityCardProps) {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut" 
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={`group relative bg-card rounded-xl p-6 border border-border hover:border-brand-primary/50 hover:shadow-brand-lg transition-all duration-300 ${className}`}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 rounded-lg mb-4 group-hover:bg-brand-primary/20 transition-colors duration-300">
          <Icon className="h-6 w-6 text-brand-primary" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-brand-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white mb-4 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: delay + (index * 0.1),
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
                className="flex items-center text-sm text-white"
              >
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mr-3 flex-shrink-0 group-hover:bg-brand-secondary transition-colors duration-300" />
                {feature}
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Subtle Border Animation */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl border border-brand-primary/20" />
      </div>
    </motion.div>
  );
}