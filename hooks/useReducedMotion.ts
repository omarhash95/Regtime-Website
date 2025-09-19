'use client';

import { useState, useEffect } from 'react';

type MotionPreference = 'system' | 'on' | 'off';

export function useReducedMotion() {
  const [preference, setPreference] = useState<MotionPreference>('system');
  const [systemPrefersReduced, setSystemPrefersReduced] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSystemPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Load user preference from localStorage
    const stored = localStorage.getItem('ui:reducedMotion') as MotionPreference;
    if (stored && ['system', 'on', 'off'].includes(stored)) {
      setPreference(stored);
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setMotionPreference = (pref: MotionPreference) => {
    setPreference(pref);
    localStorage.setItem('ui:reducedMotion', pref);
  };

  const shouldReduceMotion = 
    preference === 'on' || 
    (preference === 'system' && systemPrefersReduced);

  return {
    shouldReduceMotion,
    preference,
    setMotionPreference,
    systemPrefersReduced
  };
}