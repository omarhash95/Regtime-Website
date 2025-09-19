'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const products = [
  {
    name: 'Regtime Manager',
    logo: '/Regtime Manager Blue 1080px.png',
    description: 'Comprehensive time management'
  },
  {
    name: 'Regtime Marketer',
    logo: '/Regtime Marketer White 1080px copy.png',
    description: 'Marketing team optimization'
  },
  {
    name: 'Regtime Builder',
    logo: '/Regtime Builder Maize 1080px.png',
    description: 'Construction project tracking'
  }
];

interface LogoBeltProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function LogoBelt({ 
  className = '',
  title = "Complete Product Suite",
  subtitle = "Three specialized solutions for every industry"
}: LogoBeltProps) {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <section className={`py-16 bg-muted/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              whileHover={shouldReduceMotion ? {} : { 
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              viewport={{ once: true }}
              className="group bg-card rounded-xl p-8 border border-border hover:border-brand-primary/30 hover:shadow-brand-md transition-all duration-300"
            >
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={200}
                    height={60}
                    className="h-12 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Choose the right solution for your business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              Compare Products
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-brand-primary text-brand-primary rounded-lg font-semibold hover:bg-brand-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              Get Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}