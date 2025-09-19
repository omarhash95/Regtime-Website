'use client';

import { ReactNode } from 'react';

interface FrameStackedProps {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'accent';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * FrameStacked - Layered geometric frame with depth
 * 
 * Usage examples:
 * <FrameStacked><img src="..." /></FrameStacked>
 * <FrameStacked variant="dark" padding="lg">content</FrameStacked>
 */
export default function FrameStacked({
  children,
  variant = 'light',
  padding = 'md',
  className = ''
}: FrameStackedProps) {
  const variantStyles = {
    light: {
      primary: 'border-border bg-background',
      secondary: 'border-muted bg-muted/50'
    },
    dark: {
      primary: 'border-brand-night bg-brand-night/10',
      secondary: 'border-brand-night/50 bg-brand-night/5'
    },
    accent: {
      primary: 'border-brand-primary bg-brand-primary/10',
      secondary: 'border-brand-primary/50 bg-brand-primary/5'
    }
  };

  const paddingStyles = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Background layer */}
      <div 
        className={`absolute inset-0 translate-x-2 translate-y-2 border-2 ${variantStyles[variant].secondary}`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 1rem) 0, 100% 1rem, 100% 100%, 1rem 100%, 0 calc(100% - 1rem))'
        }}
      />
      
      {/* Main content layer */}
      <div 
        className={`relative ${paddingStyles[padding]} border-2 ${variantStyles[variant].primary} bg-background`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 1rem) 0, 100% 1rem, 100% 100%, 1rem 100%, 0 calc(100% - 1rem))'
        }}
      >
        {children}
      </div>
    </div>
  );
}