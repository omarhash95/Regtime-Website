'use client';

interface TechGridProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  opacity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function TechGrid({
  variant = 'light',
  size = 'md',
  opacity = 'low',
  className = ''
}: TechGridProps) {
  const sizeMap = {
    sm: '12px',
    md: '16px',
    lg: '20px'
  };

  const opacityMap = {
    low: variant === 'light' ? 'opacity-[0.03]' : 'opacity-[0.05]',
    medium: variant === 'light' ? 'opacity-[0.06]' : 'opacity-[0.1]',
    high: variant === 'light' ? 'opacity-[0.1]' : 'opacity-[0.15]'
  };

  const gridColor = variant === 'light' 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(255, 255, 255, 0.1)';

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${opacityMap[opacity]} ${className}`}
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${sizeMap[size]},
            ${gridColor} ${sizeMap[size]},
            ${gridColor} calc(${sizeMap[size]} + 1px)
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent ${sizeMap[size]},
            ${gridColor} ${sizeMap[size]},
            ${gridColor} calc(${sizeMap[size]} + 1px)
          )
        `,
        backgroundSize: `${sizeMap[size]} ${sizeMap[size]}`
      }}
    >
      {/* Subtle noise overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />
    </div>
  );
}