'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Image from 'next/image';
import GeometricFrame from '@/components/brand/GeometricFrame';
import Reveal from '@/components/ui/Reveal';

interface ShowcaseGeometricProps {
  className?: string;
}

export default function ShowcaseGeometric({ className = '' }: ShowcaseGeometricProps) {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <section className={`py-24 sm:py-32 bg-muted/30 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-brand-primary">Geometric Design</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Clean Lines, Bold Impact
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our geometric approach creates visual hierarchy and draws attention to key content 
              while maintaining the professional aesthetic.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Geometric Buildings */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <GeometricFrame variant="angular" animate className="aspect-[4/3]">
              <Image
                src="/brand/geometric-buildings.jpg"
                alt="Urban architecture with geometric framing"
                fill
                className="object-cover"
              />
            </GeometricFrame>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">
              Architectural Precision
            </h3>
            <p className="text-lg text-muted-foreground">
              Just as buildings require precise planning and execution, our platform brings 
              architectural thinking to time management. Every feature is designed with 
              purpose and built to last.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Structural Integrity</h4>
                  <p className="text-muted-foreground">Built on solid foundations with enterprise-grade reliability</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Clean Design</h4>
                  <p className="text-muted-foreground">Minimalist interfaces that focus on what matters most</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-foreground">Scalable Framework</h4>
                  <p className="text-muted-foreground">Grows with your business from startup to enterprise</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Workspace Image */}
        <div className="mt-24">
          <Reveal>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Modern Workspaces, Intelligent Solutions
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform any space into a productivity powerhouse with tools designed 
                for the modern professional.
              </p>
            </div>
          </Reveal>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GeometricFrame variant="corner-cut" animate className="aspect-[16/10]">
              <Image
                src="/brand/interior-workspace.jpg"
                alt="Modern workspace interior"
                fill
                className="object-cover"
              />
              {/* Overlay content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h4 className="text-xl font-semibold mb-2">Designed for Focus</h4>
                  <p className="text-white/90">
                    Every element optimized for productivity and collaboration
                  </p>
                </div>
              </div>
            </GeometricFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}