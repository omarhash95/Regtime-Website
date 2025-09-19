'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PosterTileProps {
  variant: 'image' | 'image-caption' | 'headline-baby-blue' | 'headline-slate' | 'dark-copy-block';
  title?: string;
  caption?: string;
  image?: string;
  icon?: ReactNode;
  logo?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * PosterTile - Social media style poster tiles
 * 
 * Usage examples:
 * <PosterTile variant="image" image="/photo.jpg" logo />
 * <PosterTile variant="headline-baby-blue" title="Your Message Here" />
 * <PosterTile variant="dark-copy-block" title="Platform" caption="Description text" />
 */
export default function PosterTile({
  variant,
  title,
  caption,
  image,
  icon,
  logo = false,
  className = '',
  children
}: PosterTileProps) {
  const { shouldReduceMotion } = useReducedMotion();

  const baseClasses = "relative aspect-square rounded-2xl overflow-hidden group cursor-pointer";
  
  const variantStyles = {
    'image': 'bg-muted',
    'image-caption': 'bg-muted',
    'headline-baby-blue': 'bg-gradient-to-br from-blue-300 to-blue-400 text-white',
    'headline-slate': 'bg-gradient-to-br from-slate-600 to-slate-800 text-white',
    'dark-copy-block': 'bg-gradient-to-br from-gray-900 to-black text-white'
  };

  const tiltAnimation = shouldReduceMotion ? {} : {
    whileHover: { 
      rotateX: 2, 
      rotateY: 2, 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    whileTap: { scale: 0.98 }
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantStyles[variant]} ${className}`}
      style={{ perspective: '1000px' }}
      {...tiltAnimation}
    >
      {/* Background Image */}
      {image && (variant === 'image' || variant === 'image-caption') && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title || 'Poster image'}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Content Container */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Logo in corner */}
        {logo && (
          <div className="absolute top-4 right-4">
            <Image
              src="/IconMark White 540px.png"
              alt="Regtime"
              width={24}
              height={24}
              className="opacity-90"
            />
          </div>
        )}

        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0 mb-4">
            {icon}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          {title && (
            <h3 className={`font-bold leading-tight mb-2 ${
              variant === 'headline-baby-blue' || variant === 'headline-slate' 
                ? 'text-2xl' 
                : variant === 'dark-copy-block'
                ? 'text-xl'
                : 'text-lg'
            }`}>
              {title}
            </h3>
          )}
          
          {caption && (
            <p className={`leading-relaxed ${
              variant === 'dark-copy-block' 
                ? 'text-gray-300 text-sm' 
                : 'text-white/90 text-sm'
            }`}>
              {caption}
            </p>
          )}

          {children}
        </div>

        {/* Bottom Caption for image variant */}
        {variant === 'image-caption' && caption && (
          <div className="mt-4">
            <p className="text-white text-sm font-medium">{caption}</p>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </motion.div>
  );
}