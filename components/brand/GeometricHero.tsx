'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Image from 'next/image';

interface GeometricHeroProps {
  className?: string;
}

/**
 * GeometricHero - Hero section with geometric overlay styling
 * Based on the first reference image with cityscape and geometric elements
 */
export default function GeometricHero({ className = '' }: GeometricHeroProps) {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/brand/hero-cityscape.jpg"
          alt="Urban cityscape"
          fill
          className="object-cover"
          priority
        />
        {/* Geometric overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/90 via-slate-600/70 to-transparent" />
      </div>

      {/* Geometric Frame Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-right geometric lines */}
        <svg
          className="absolute top-0 right-0 w-96 h-96 text-white/20"
          viewBox="0 0 400 400"
          fill="none"
        >
          <motion.path
            d="M100 50 L350 50 L350 300 L200 300"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={shouldReduceMotion ? {} : { pathLength: 0 }}
            animate={shouldReduceMotion ? {} : { pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M150 100 L300 100 L300 250"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            initial={shouldReduceMotion ? {} : { pathLength: 0 }}
            animate={shouldReduceMotion ? {} : { pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            We treat residents as partners,{' '}
            <span className="text-brand-primary">not obstacles.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transparent lease renewals, intuitive portals, and respectful communications 
            foster cooperation and long-term trust.
          </p>
        </motion.div>

        {/* Logo and URL */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Image
            src="/Lockup White 1080px.png"
            alt="Regtime"
            width={200}
            height={60}
            className="opacity-90"
          />
          <span className="text-white/80 text-lg">www.regtime.com</span>
        </motion.div>
      </div>
    </section>
  );
}