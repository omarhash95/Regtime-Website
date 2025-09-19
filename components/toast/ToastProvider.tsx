'use client';

import { createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast, type Toast } from './useToast';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { transitions, dur, ease } from '@/lib/motion';

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const toastUtils = useToast();
  const { shouldReduceMotion } = useReducedMotion();

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <ToastContext.Provider value={toastUtils}>
      {children}
      
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
        <AnimatePresence mode="popLayout">
          {toastUtils.toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={`flex items-start p-4 rounded-lg border shadow-lg ${getToastStyles(toast.type)}`}
              {...(shouldReduceMotion ? {} : {
                ...transitions.slideRight,
                layout: true
              })}
              transition={{ duration: dur.sm, ease: ease.out }}
              role="alert"
              aria-live="polite"
            >
              <div className="flex-shrink-0 mr-3">
                {getToastIcon(toast.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => toastUtils.removeToast(toast.id)}
                className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}