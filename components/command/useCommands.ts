'use client';

import { useRouter } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useToastContext } from '@/components/toast/ToastProvider';

export interface Command {
  id: string;
  title: string;
  description?: string;
  keywords: string[];
  shortcut?: string;
  category: 'navigation' | 'theme' | 'content' | 'actions' | 'admin';
  handler: () => void;
  icon?: string;
}

export function useCommands() {
  const router = useRouter();
  const { preference, setMotionPreference } = useReducedMotion();
  const { success, info } = useToastContext();

  const commands: Command[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Home',
      description: 'Go to homepage',
      keywords: ['home', 'main', 'index', 'start'],
      shortcut: 'g h',
      category: 'navigation',
      handler: () => router.push('/'),
      icon: '🏠'
    },
    {
      id: 'nav-about',
      title: 'About',
      description: 'Learn about Regtime',
      keywords: ['about', 'company', 'team', 'story'],
      shortcut: 'g a',
      category: 'navigation',
      handler: () => router.push('/about'),
      icon: '👥'
    },
    {
      id: 'nav-services',
      title: 'Services',
      description: 'View our services',
      keywords: ['services', 'products', 'offerings', 'plans'],
      shortcut: 'g s',
      category: 'navigation',
      handler: () => router.push('/services'),
      icon: '⚡'
    },
    {
      id: 'nav-contact',
      title: 'Contact',
      description: 'Get in touch',
      keywords: ['contact', 'support', 'help', 'reach'],
      shortcut: 'g c',
      category: 'navigation',
      handler: () => router.push('/contact'),
      icon: '📞'
    },
    {
      id: 'nav-privacy',
      title: 'Privacy Policy',
      description: 'View privacy policy',
      keywords: ['privacy', 'policy', 'legal', 'terms'],
      category: 'navigation',
      handler: () => router.push('/privacy'),
      icon: '🔒'
    },

    // Theme
    {
      id: 'motion-auto',
      title: 'Motion: Auto',
      description: 'Follow system preference',
      keywords: ['motion', 'animation', 'auto', 'system'],
      category: 'theme',
      handler: () => setMotionPreference('system'),
      icon: preference === 'system' ? '✅' : '⚙️'
    },
    {
      id: 'motion-on',
      title: 'Motion: On',
      description: 'Enable animations',
      keywords: ['motion', 'animation', 'on', 'enable'],
      category: 'theme',
      handler: () => setMotionPreference('off'),
      icon: preference === 'off' ? '✅' : '🎬'
    },
    {
      id: 'motion-off',
      title: 'Motion: Off',
      description: 'Disable animations',
      keywords: ['motion', 'animation', 'off', 'disable', 'reduce'],
      category: 'theme',
      handler: () => setMotionPreference('on'),
      icon: preference === 'on' ? '✅' : '🚫'
    },

    // Actions
    {
      id: 'action-inquiry',
      title: 'Start New Inquiry',
      description: 'Open contact form',
      keywords: ['inquiry', 'contact', 'form', 'new', 'start'],
      category: 'actions',
      handler: () => router.push('/contact'),
      icon: '✉️'
    },
    {
      id: 'action-copy-email',
      title: 'Copy Email',
      description: 'Copy hello@regtime.com',
      keywords: ['copy', 'email', 'contact'],
      category: 'actions',
      handler: () => {
        navigator.clipboard.writeText('hello@regtime.com');
        success('Email copied', 'hello@regtime.com copied to clipboard');
      },
      icon: '📧'
    },
    {
      id: 'action-copy-phone',
      title: 'Copy Phone',
      description: 'Copy +1 (555) 123-4567',
      keywords: ['copy', 'phone', 'number', 'contact'],
      category: 'actions',
      handler: () => {
        navigator.clipboard.writeText('+1 (555) 123-4567');
        success('Phone copied', '+1 (555) 123-4567 copied to clipboard');
      },
      icon: '📱'
    },
    {
      id: 'help-shortcuts',
      title: 'Keyboard Shortcuts',
      description: 'View all shortcuts',
      keywords: ['help', 'shortcuts', 'keys', 'commands'],
      shortcut: '?',
      category: 'content',
      handler: () => {
        info('Keyboard Shortcuts', 'Cmd/Ctrl + K: Command palette, G+H/A/S/C: Navigate');
      },
      icon: '❓'
    }
  ];

  // Add admin commands in development
  if (process.env.NODE_ENV === 'development') {
    commands.push(
      {
        id: 'admin-tokens',
        title: 'Dump Design Tokens',
        description: 'Log tokens to console',
        keywords: ['admin', 'tokens', 'debug', 'console'],
        category: 'admin',
        handler: () => {
          console.log('Design Tokens:', {
            colors: getComputedStyle(document.documentElement),
            motion: { preference }
          });
        },
        icon: '🔧'
      }
    );
  }

  return commands;
}