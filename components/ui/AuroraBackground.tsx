'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AuroraBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  hues?: string[];
  blur?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export default function AuroraBackground({
  intensity = 'medium',
  hues = ['from-brand-primary/20', 'via-brand-accent/10', 'to-brand-secondary/20'],
  blur = 'lg',
  className = '',
  children
}: AuroraBackgroundProps) {
  const { shouldReduceMotion } = useReducedMotion();

  const intensityMap = {
    low: 'opacity-30',
    medium: 'opacity-50',
    high: 'opacity-70'
  };

  const blurMap = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg'
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora gradients */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial ${hues[0]} rounded-full ${blurMap[blur]} ${intensityMap[intensity]} ${
            shouldReduceMotion ? '' : 'animate-pulse'
          }`}
          style={{
            animation: shouldReduceMotion ? 'none' : 'aurora1 8s ease-in-out infinite alternate'
          }}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-radial ${hues[1]} rounded-full ${blurMap[blur]} ${intensityMap[intensity]} ${
            shouldReduceMotion ? '' : 'animate-pulse'
          }`}
          style={{
            animation: shouldReduceMotion ? 'none' : 'aurora2 6s ease-in-out infinite alternate-reverse',
            animationDelay: '1s'
          }}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-radial ${hues[2]} rounded-full ${blurMap[blur]} ${intensityMap[intensity]} ${
            shouldReduceMotion ? '' : 'animate-pulse'
          }`}
          style={{
            animation: shouldReduceMotion ? 'none' : 'aurora3 10s ease-in-out infinite alternate',
            animationDelay: '2s'
          }}
        />
      </div>
      
      {children}
      
      <style jsx>{`
        @keyframes aurora1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes aurora2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -20px) scale(1.2); }
        }
        
        @keyframes aurora3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -40px) scale(0.8); }
          75% { transform: translate(-30px, 30px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}