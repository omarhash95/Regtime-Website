'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LogoOverImageProps {
  backgroundImage: string;
  logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  logoSize?: 'sm' | 'md' | 'lg';
  forceVariant?: 'light' | 'dark';
  className?: string;
  children?: React.ReactNode;
}

/**
 * LogoOverImage - Automatically chooses logo variant based on background
 * 
 * Usage examples:
 * <LogoOverImage backgroundImage="/dark-building.jpg" logoPosition="top-right" />
 * <LogoOverImage backgroundImage="/light-sky.jpg" forceVariant="dark" />
 */
export default function LogoOverImage({
  backgroundImage,
  logoPosition = 'top-right',
  logoSize = 'md',
  forceVariant,
  className = '',
  children
}: LogoOverImageProps) {
  const [logoVariant, setLogoVariant] = useState<'light' | 'dark'>('light');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine logo variant based on image luminance
  useEffect(() => {
    if (forceVariant) {
      setLogoVariant(forceVariant);
      return;
    }

    // Simple heuristic: if image path contains 'dark', 'night', 'black' use light logo
    // Otherwise use dark logo. In production, you'd analyze actual image luminance
    const isDarkImage = /dark|night|black|shadow/i.test(backgroundImage);
    setLogoVariant(isDarkImage ? 'light' : 'dark');
  }, [backgroundImage, forceVariant]);

  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const logoSrc = logoVariant === 'light' 
    ? '/IconMark White 540px.png'
    : '/IconMark Night 540px.png';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        className="object-cover"
        onLoad={() => setImageLoaded(true)}
      />

      {/* Overlay for better logo visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Logo */}
      {imageLoaded && (
        <div className={`absolute z-10 ${positionStyles[logoPosition]}`}>
          <div className="p-2 rounded-lg bg-black/10 backdrop-blur-sm">
            <Image
              src={logoSrc}
              alt="Regtime"
              width={logoSize === 'sm' ? 32 : logoSize === 'md' ? 48 : 64}
              height={logoSize === 'sm' ? 32 : logoSize === 'md' ? 48 : 64}
              className={`${sizeStyles[logoSize]} opacity-90 hover:opacity-100 transition-opacity`}
            />
          </div>
        </div>
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
}