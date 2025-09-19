'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import FrameChevron from './frames/FrameChevron';
import FrameStacked from './frames/FrameStacked';

interface BillboardProps {
  mode?: 'light' | 'dark' | 'alice-blue';
  align?: 'image-left' | 'image-right';
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  frameType?: 'chevron' | 'stacked' | 'none';
  watermarkIcon?: ReactNode;
  cta?: {
    text: string;
    href: string;
  };
  className?: string;
}

/**
 * Billboard - Full-width marketing section with framed images
 * 
 * Usage examples:
 * <Billboard title="Transform Your Business" image="/hero.jpg" frameType="chevron" />
 * <Billboard mode="dark" align="image-right" title="Platform" description="..." />
 */
export default function Billboard({
  mode = 'light',
  align = 'image-left',
  title,
  subtitle,
  description,
  image,
  imageAlt,
  frameType = 'chevron',
  watermarkIcon,
  cta,
  className = ''
}: BillboardProps) {
  const { shouldReduceMotion } = useReducedMotion();

  const modeStyles = {
    light: 'bg-background text-foreground',
    dark: 'bg-brand-night text-white',
    'alice-blue': 'bg-gradient-to-br from-blue-400 to-blue-500 text-white'
  };

  const FrameComponent = frameType === 'chevron' ? FrameChevron : 
                       frameType === 'stacked' ? FrameStacked : 
                       'div';

  const getFrameVariant = (): 'accent' | 'light' | 'dark' => {
    return mode === 'light' ? 'accent' : 'light';
  };

  const frameProps = frameType !== 'none' ? {
    variant: getFrameVariant(),
    padding: 'md' as const
  } : {};

  return (
    <section className={`py-24 sm:py-32 ${modeStyles[mode]} ${className}`}>
      {/* Watermark Icon */}
      {watermarkIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <div className="text-9xl">
            {watermarkIcon}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center ${
          align === 'image-right' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          {/* Content */}
          <motion.div
            className={align === 'image-right' ? 'lg:col-start-1' : ''}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {subtitle && (
              <p className={`text-base font-semibold leading-7 mb-4 ${
                mode === 'light' ? 'text-brand-primary' : 'text-blue-200'
              }`}>
                {subtitle}
              </p>
            )}
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              {title}
            </h2>
            
            {description && (
              <p className={`text-lg leading-8 mb-8 ${
                mode === 'light' ? 'text-muted-foreground' : 'text-gray-200'
              }`}>
                {description}
              </p>
            )}

            {cta && (
              <a
                href={cta.href}
                className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  mode === 'light' 
                    ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                    : 'bg-white text-brand-night hover:bg-gray-100'
                }`}
              >
                {cta.text}
              </a>
            )}
          </motion.div>

          {/* Image */}
          {image && (
            <motion.div
              className={align === 'image-right' ? 'lg:col-start-2' : ''}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {frameType !== 'none' ? (
                <FrameComponent {...frameProps}>
                  <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={imageAlt || title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </FrameComponent>
              ) : (
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={imageAlt || title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}