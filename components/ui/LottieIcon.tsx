'use client';

import { lazy, Suspense } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Lottie = lazy(() => import('lottie-react'));

interface LottieIconProps {
  animationData: any;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export default function LottieIcon({
  animationData,
  size = 24,
  loop = true,
  autoplay = true,
  className = ''
}: LottieIconProps) {
  const { shouldReduceMotion } = useReducedMotion();

  const lottieProps = {
    animationData,
    loop: shouldReduceMotion ? false : loop,
    autoplay: shouldReduceMotion ? false : autoplay,
    style: { width: size, height: size },
    className
  };

  return (
    <Suspense fallback={<div style={{ width: size, height: size }} className={className} />}>
      <Lottie {...lottieProps} />
    </Suspense>
  );
}