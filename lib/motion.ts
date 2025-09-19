export const ease = {
  standard: [0.2, 0.8, 0.2, 1],
  out: [0.16, 1, 0.3, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.25, 0.46, 0.45, 0.94]
} as const;

export const dur = {
  xs: 0.18,
  sm: 0.28,
  md: 0.44,
  lg: 0.8,
  xl: 1.2
} as const;

export const spring = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 24,
  mass: 1
};

export const springGentle = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 20,
  mass: 0.8
};

export const springBouncy = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 18,
  mass: 0.6
};

export const transitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
  },
  slideDown: {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 }
  },
  slideRight: {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }
} as const;