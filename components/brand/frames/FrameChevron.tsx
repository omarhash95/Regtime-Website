'use client';

import { ReactNode } from 'react';

interface FrameChevronProps {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'accent';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * FrameChevron - Angular chevron-style photo frame
 * 
 * Usage examples:
 * <FrameChevron><img src="..." /></FrameChevron>
 * <FrameChevron variant="accent" padding="lg">content</FrameChevron>
 */
export default function FrameChevron({
  children,
  variant = 'light',
  padding = 'md',
  className = ''
}: FrameChevronProps) {
  const variantStyles = {
    light: 'border-border bg-background',
    dark: 'border-brand-night bg-brand-night/5',
    accent: 'border-brand-primary bg-brand-primary/5'
  };

  const paddingStyles = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Chevron clip path container */}
      <div 
        className={`relative ${paddingStyles[padding]} border-2 ${variantStyles[variant]}`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 2rem 100%, 0 calc(100% - 2rem))'
        }}
      >
        {children}
      </div>
      
      {/* Optional corner accent lines */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
        <svg
          viewBox="0 0 32 32"
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8 0 L32 0 L32 24" className={`${variant === 'accent' ? 'text-brand-primary' : 'text-border'}`} />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
        <svg
          viewBox="0 0 32 32"
          className="w-full h-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M0 8 L0 32 L24 32" className={`${variant === 'accent' ? 'text-brand-primary' : 'text-border'}`} />
        </svg>
      </div>
    </div>
  );
}