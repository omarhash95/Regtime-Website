# Regtime Brand Implementation Guide

This document outlines the complete brand implementation for the Regtime business website, including asset usage, color tokens, typography, and design guidelines.

## 🎨 Brand Assets Overview

### Logo Variations Available
- **IconMark**: Square logo mark (540px) - Alice Blue, Dim Gray, Night, White
- **Wordmark**: Text-only logo (1080px) - Multiple color variations
- **Lockup**: Combined icon + text (1080px) - Primary brand logo
- **Vertical**: Stacked layout (1080px) - Alternative orientation
- **Limited**: Compact version (1080px) - Space-constrained usage
- **Product Logos**: Regtime Manager (Blue), Marketer (Cadet), Builder (Maize)

### Building Sequence Graphics
- Foundation, Growth, Success progression
- Available in: Gray, White, Night, Baby Blue, Alice Blue

## 🎯 Asset-to-UI Mapping (Implemented)

### Primary Logo Usage
```
Header (Desktop): Lockup Alice Blue - 32px height
Header (Mobile): Lockup Alice Blue - 24px height
Footer: Lockup White - 40px height (on dark background)
Favicon: IconMark Alice Blue - 16x16, 32x32 sizes
Social/OG: IconMark Alice Blue - 540x540px
```

### Product-Specific Logos
```
Services Page - Manager Section: Regtime Manager Blue
Services Page - Marketer Section: Regtime Marketer Cadet  
Services Page - Builder Section: Regtime Builder Maize
```

### Building Sequence Usage
```
Homepage Hero Section: regtime_building1_gray.png (Foundation)
Homepage Hero Section: regtime_building2_gray.png (Growth)
Homepage Hero Section: regtime_building3_gray.png (Success)
```

## 🎨 Color System (Tailwind Implementation)

### Brand Colors
```css
brand: {
  primary: '#4A90E2',    // Alice Blue - Primary brand color
  secondary: '#5F9EA0',  // Cadet - Secondary accent
  accent: '#F0E68C',     // Maize - Highlight/CTA color
  night: '#2C3E50',      // Night - Dark theme primary
}
```

### Semantic Color Usage
```css
background: hsl(0 0% 100%)           // White backgrounds
foreground: hsl(210 40% 20%)         // Dark text (brand.night derived)
muted: hsl(0 0% 96.1%)              // Light gray sections
border: hsl(0 0% 89.8%)             // Subtle borders
```

### Color Application Guidelines

#### Primary Actions
- **Buttons**: `bg-brand-primary` with `hover:bg-brand-primary/90`
- **Links**: `text-brand-primary` with `hover:text-brand-primary/80`
- **Focus States**: `focus:ring-brand-primary`

#### Secondary Actions
- **Buttons**: `bg-brand-secondary` with appropriate hover states
- **Accents**: `text-brand-secondary` for supporting elements

#### Highlights & CTAs
- **Special Buttons**: `bg-brand-accent` for standout actions
- **Badges**: `bg-brand-accent/10` with `text-brand-accent`

#### Dark Theme
- **Background**: `bg-brand-night`
- **Text**: `text-white` or `text-gray-100`

## 📝 Typography System

### Font Implementation
```css
font-family: {
  'aspekta': ['var(--font-aspekta)', 'Inter', 'system-ui', 'sans-serif'],
  'heading': ['var(--font-aspekta)', 'Inter', 'system-ui', 'sans-serif'],
  'body': ['var(--font-aspekta)', 'Inter', 'system-ui', 'sans-serif'],
}
```

### Font Weights Available
- **Light**: 300 (Aspekta-300.woff2)
- **Regular**: 400 (Aspekta-400.woff2) - Body text
- **Medium**: 500 (Aspekta-500.woff2)
- **SemiBold**: 600 (Aspekta-600.woff2) - Headings
- **Bold**: 700 (Aspekta-700.woff2) - Emphasis

### Typography Scale
```css
/* Headings */
h1: text-4xl sm:text-6xl font-bold (600)
h2: text-3xl sm:text-4xl font-bold (600)
h3: text-2xl font-bold (600)
h4: text-xl font-semibold (600)

/* Body */
body: text-base font-normal (400)
large: text-lg font-normal (400)
small: text-sm font-normal (400)
```

## 🖼️ Image Guidelines

### Logo Sizing
- **Header Desktop**: 32px height, auto width
- **Header Mobile**: 24px height, auto width
- **Footer**: 40px height, auto width
- **Favicon**: 16x16, 32x32 pixel sizes

### Product Images
- **Service Cards**: 200px width, auto height
- **Building Sequence**: 200x200px square format
- **Team Photos**: 400x300px (3:2 aspect ratio)

### Image Optimization
- All images use Next.js `Image` component
- Automatic WebP conversion
- Lazy loading enabled
- Proper alt text for accessibility

## 🎨 Design Tokens

### Spacing System (8px base)
```css
spacing: {
  xs: 4px,   sm: 8px,   md: 16px,
  lg: 24px,  xl: 32px,  2xl: 48px,
  3xl: 64px, 4xl: 96px, 5xl: 128px
}
```

### Border Radius
```css
border-radius: {
  sm: 4px,   md: 6px,   lg: 8px,
  xl: 12px,  2xl: 16px, 3xl: 24px
}
```

### Shadows
```css
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
shadow: 0 1px 3px rgba(0,0,0,0.1)
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
```

## 📱 Component Guidelines

### Header
- Sticky positioning with backdrop blur
- Mobile hamburger menu
- Logo scales responsively
- CTA button always visible

### Footer
- Dark background (brand.night)
- White logo variant
- Contact information
- Social media links
- Copyright notice

### Buttons
```css
/* Primary */
.btn-primary {
  @apply bg-brand-primary text-white hover:bg-brand-primary/90;
}

/* Secondary */
.btn-secondary {
  @apply bg-brand-secondary text-white hover:bg-brand-secondary/90;
}

/* Accent */
.btn-accent {
  @apply bg-brand-accent text-brand-night hover:bg-brand-accent/90;
}
```

### Cards
```css
.card {
  @apply bg-card rounded-lg shadow-sm ring-1 ring-border;
}

.card-hover {
  @apply hover:ring-brand-primary/50 hover:shadow-lg transition-all;
}
```

## 🔧 Technical Implementation

### Font Loading
- Uses `next/font/local` for optimal performance
- Font files stored in `/public/fonts/`
- CSS variables for global application
- Fallback fonts: Inter, system-ui, sans-serif

### Color System
- HSL values for better manipulation
- CSS custom properties for theme switching
- Semantic naming for maintainability
- Consistent opacity scales (10%, 20%, 50%, 80%, 90%)

### Responsive Breakpoints
```css
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

## ✅ Brand Compliance Checklist

### Logo Usage ✅
- [x] Correct logo variants in appropriate contexts
- [x] Proper sizing and spacing maintained
- [x] High-resolution assets used
- [x] Fallback handling implemented

### Color Usage ✅
- [x] Brand colors implemented as Tailwind tokens
- [x] Semantic color system established
- [x] Consistent hover/focus states
- [x] Accessibility contrast ratios met

### Typography ✅
- [x] Aspekta font loaded and applied
- [x] Proper font weights assigned
- [x] Consistent type scale
- [x] Readable line heights and spacing

### Layout & Spacing ✅
- [x] 8px spacing system implemented
- [x] Consistent component spacing
- [x] Proper visual hierarchy
- [x] Responsive grid systems

### Performance ✅
- [x] Optimized font loading
- [x] Image optimization
- [x] Minimal CSS bundle
- [x] Fast page load times

## 🎯 Usage Guidelines

### Do's
- Use semantic color tokens (brand.primary) instead of hex values
- Maintain consistent spacing using the 8px system
- Use appropriate logo variants for context
- Follow the established typography hierarchy
- Implement proper hover and focus states

### Don'ts
- Don't use raw hex colors in components
- Don't modify logo proportions or colors
- Don't use inconsistent spacing values
- Don't mix font families
- Don't ignore accessibility requirements

## 🔄 Future Enhancements

### Planned Features
- Dark mode toggle with brand.night theme
- Animation system with brand-appropriate timing
- Component library documentation
- Brand asset management system
- A/B testing framework

### Maintenance
- Regular brand asset updates
- Performance monitoring
- Accessibility audits
- SEO optimization reviews

## 📞 Support

For brand-related questions or asset requests, contact:
- **Design Team**: design@regtime.com
- **Development Team**: dev@regtime.com
- **Brand Guidelines**: brand@regtime.com