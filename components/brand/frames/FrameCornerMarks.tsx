'use client';

import { ReactNode } from 'react';

interface FrameCornerMarksProps {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'accent';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * FrameCornerMarks - Minimal corner mark frame
 * 
 * Usage examples:
 * <FrameCornerMarks><img src="..." /></FrameCornerMarks>
 * <FrameCornerMarks variant="accent" padding="lg">content</FrameCornerMarks>
 */
export default function FrameCornerMarks({
  children,
  variant = 'light',
  padding = 'md',
  className = ''
}: FrameCornerMarksProps) {
  const variantStyles = {
    light: 'text-border',
    dark: 'text-brand-night',
    accent: 'text-brand-primary'
  };

  const paddingStyles = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className={`relative ${paddingStyles[padding]} ${className}`}>
      {children}
      
      {/* Corner marks */}
      <div className={`absolute top-0 left-0 w-4 h-4 ${variantStyles[variant]}`}>
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0 4 L0 0 L4 0" />
        </svg>
      </div>
      
      <div className={`absolute top-0 right-0 w-4 h-4 ${variantStyles[variant]}`}>
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 0 L16 0 L16 4" />
        </svg>
      </div>
      
      <div className={`absolute bottom-0 left-0 w-4 h-4 ${variantStyles[variant]}`}>
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0 12 L0 16 L4 16" />
        </svg>
      </div>
      
      <div className={`absolute bottom-0 right-0 w-4 h-4 ${variantStyles[variant]}`}>
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 12 L16 16 L12 16" />
        </svg>
      </div>
    </div>
  );
}