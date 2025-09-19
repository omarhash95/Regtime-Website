'use client';

import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useLenis();

  return <>{children}</>;
}