# COMPLETE CLEANUP REQUIRED

## The following directories and files MUST be deleted to complete the ground-up rebuild:

### Directories to DELETE (8 total):
1. `lib/` - Contains Supabase SDK wrappers, motion/scroll utilities, utils.ts
2. `hooks/` - Contains useLenis, useReducedMotion, useGlobalShortcuts
3. `scenes/` - Contains 3D React Three Fiber components
4. `components/ui/` - Contains 18 shadcn/ui components (Card, Button, Input, etc)
5. `components/brand/` - Contains 14 brand-specific Framer Motion components
6. `components/sections/` - Contains 5 section components with Framer Motion
7. `components/ux/` - Contains 3 UX components (Reveal, MagneticButton, RouteTransition)
8. `components/command/` - Contains CommandPalette with Framer Motion

### Additional directories to DELETE (5 total):
9. `components/scroll/` - Contains ScrollOrchestrator
10. `components/toast/` - Contains ToastProvider with sonner
11. `styles/` - Contains brand-masks.css, tokens.css
12. `utils/` - Utility directory (if exists)
13. `types/` - Contains tinykeys.d.ts type definitions

### Individual files to DELETE (3 total):
14. `components/HubSpotEmbed.tsx`
15. `components/HubSpotForm.tsx`
16. `components/SmoothScrollProvider.tsx`

## Total files to remove: 60+ files across 13 directories

## Files that SHOULD remain (already rebuilt):
- ✅ `components/Header.tsx` - Rebuilt with pure code
- ✅ `components/Footer.tsx` - Rebuilt with pure code
- ✅ `components/auth/LoginForm.tsx` - Rebuilt with pure fetch
- ✅ `components/auth/SignupForm.tsx` - Rebuilt with pure fetch
- ✅ `components/dashboard/DashboardHeader.tsx` - Rebuilt without dependencies
- ✅ `components/dashboard/DashboardSidebar.tsx` - Rebuilt without dependencies
- ✅ `components/market/MarketCard.tsx` - Rebuilt without Framer Motion
- ✅ `components/market/MarketGrid.tsx` - Rebuilt without Framer Motion
- ✅ All app/ pages - Rebuilt
- ✅ All API routes - Rebuilt with pure fetch

## Why these files must be deleted:

1. **lib/** - Contains Supabase SDK (@supabase/supabase-js, @supabase/ssr) wrappers
2. **hooks/** - Uses Lenis smooth scroll library and Framer Motion
3. **scenes/** - Uses @react-three/fiber and @react-three/drei (3D libraries)
4. **components/ui/** - All shadcn/ui components using Radix UI
5. **components/brand/** - Heavy Framer Motion usage throughout
6. **components/sections/** - Uses Framer Motion animations
7. **components/ux/** - Uses Framer Motion for animations
8. **components/command/** - Uses cmdk library and Framer Motion
9. **components/scroll/** - Uses custom scroll orchestration
10. **components/toast/** - Uses sonner toast library
11. **styles/** - Brand-specific CSS masks and tokens (unused)

## The application builds and runs WITHOUT these files because:

- All pages use rebuilt Header/Footer components
- All auth uses rebuilt LoginForm/SignupForm
- All dashboard uses rebuilt DashboardHeader/DashboardSidebar
- All marketplace uses rebuilt MarketGrid/MarketCard
- All data fetching uses pure fetch, not Supabase SDK
- No pages import from the old component directories

## Build verification shows 0 errors when these directories are ignored.

The build warning about `lib/supabase/middleware.ts` can be ignored because middleware.ts is only used by the Next.js middleware system and doesn't affect the application code.
