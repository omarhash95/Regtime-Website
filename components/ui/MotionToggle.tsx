'use client';

import { motion } from 'framer-motion';
import { Play, Pause, Settings } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function MotionToggle() {
  const { shouldReduceMotion, preference, setMotionPreference } = useReducedMotion();

  const options = [
    { value: 'system', label: 'Auto', icon: Settings },
    { value: 'off', label: 'On', icon: Play },
    { value: 'on', label: 'Off', icon: Pause }
  ] as const;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-400">Motion:</span>
      <div className="flex bg-white/10 rounded-lg p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setMotionPreference(option.value)}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
              preference === option.value
                ? 'bg-white/20 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label={`Set motion preference to ${option.label.toLowerCase()}`}
          >
            <option.icon className="h-3 w-3" />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}