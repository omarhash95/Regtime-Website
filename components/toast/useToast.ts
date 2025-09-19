'use client';

import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

export function useToast() {
  const [state, setState] = useState<ToastState>({ toasts: [] });

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 4000
    };

    setState(prev => ({
      toasts: [...prev.toasts, newToast]
    }));

    // Auto-dismiss
    if (newToast.duration! > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration!);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setState(prev => ({
      toasts: prev.toasts.filter(toast => toast.id !== id)
    }));
  }, []);

  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    return addToast(props);
  }, [addToast]);

  // Convenience methods
  const success = useCallback((title: string, description?: string) => {
    return toast({ title, description, type: 'success' });
  }, [toast]);

  const error = useCallback((title: string, description?: string) => {
    return toast({ title, description, type: 'error' });
  }, [toast]);

  const info = useCallback((title: string, description?: string) => {
    return toast({ title, description, type: 'info' });
  }, [toast]);

  const warning = useCallback((title: string, description?: string) => {
    return toast({ title, description, type: 'warning' });
  }, [toast]);

  return {
    toasts: state.toasts,
    toast,
    success,
    error,
    info,
    warning,
    removeToast
  };
}