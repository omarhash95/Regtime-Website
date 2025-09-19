export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.2, 0.8, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.25, 0.46, 0.45, 0.94] as const
};

export const scrollConfig = {
  stages: {
    hero: { start: 0, end: 0.2 },
    story: { start: 0.2, end: 0.7 },
    cta: { start: 0.7, end: 1 }
  }
};

// Progressive enhancement: detect scroll-driven animations support
export const supportsScrollTimeline = () => {
  if (typeof window === 'undefined') return false;
  return 'ScrollTimeline' in window;
};

// Utility for creating scroll-based progress values
export const createScrollProgress = (
  scrollY: number,
  elementTop: number,
  elementHeight: number,
  windowHeight: number
) => {
  const start = elementTop - windowHeight;
  const end = elementTop + elementHeight;
  const progress = (scrollY - start) / (end - start);
  return clamp01(progress);
};

// Smooth step function for eased transitions
export const smoothStep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

// Map scroll progress to different easing curves
export const applyEasing = (progress: number, type: keyof typeof ease = 'out') => {
  const [x1, y1, x2, y2] = ease[type];
  // Simplified cubic-bezier approximation
  const t = progress;
  return t * t * (3 - 2 * t); // Smooth step as fallback
};