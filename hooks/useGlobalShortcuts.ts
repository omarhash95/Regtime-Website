'use client';

import { useEffect, useCallback } from 'react';
import { tinykeys } from 'tinykeys';

interface ShortcutConfig {
  key: string;
  handler: () => void;
  description: string;
  category?: string;
}

export function useGlobalShortcuts(shortcuts: ShortcutConfig[]) {
  const isInputFocused = useCallback(() => {
    const activeElement = document.activeElement;
    if (!activeElement) return false;
    
    const tagName = activeElement.tagName.toLowerCase();
    const isContentEditable = activeElement.getAttribute('contenteditable') === 'true';
    
    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      isContentEditable
    );
  }, []);

  useEffect(() => {
    const keyMap: Record<string, () => void> = {};
    
    shortcuts.forEach(({ key, handler }) => {
      keyMap[key] = () => {
        if (isInputFocused()) return;
        handler();
      };
    });

    const unsubscribe = tinykeys(window, keyMap);
    
    return unsubscribe;
  }, [shortcuts, isInputFocused]);
}

export function useSequenceShortcuts(sequences: Record<string, () => void>) {
  useEffect(() => {
    let currentSequence = '';
    let sequenceTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if input is focused
      const activeElement = document.activeElement;
      if (activeElement) {
        const tagName = activeElement.tagName.toLowerCase();
        const isContentEditable = activeElement.getAttribute('contenteditable') === 'true';
        
        if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || isContentEditable) {
          return;
        }
      }

      // Only handle single letter keys
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        currentSequence += e.key.toLowerCase();
        
        // Clear timeout and set new one
        clearTimeout(sequenceTimeout);
        sequenceTimeout = setTimeout(() => {
          currentSequence = '';
        }, 1000);

        // Check for matches
        Object.entries(sequences).forEach(([sequence, handler]) => {
          if (currentSequence === sequence) {
            e.preventDefault();
            handler();
            currentSequence = '';
            clearTimeout(sequenceTimeout);
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(sequenceTimeout);
    };
  }, [sequences]);
}