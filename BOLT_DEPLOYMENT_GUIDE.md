# Bolt Deployment Guide - Regtime Application

## Overview

This application has been specially configured to work in Bolt's restricted environment where native addons are disabled. This guide explains the solutions implemented and how to maintain them.

---

## The Problem

**Next.js 14 requires SWC (Speedy Web Compiler)**, which is a Rust-based native addon. However:
- ❌ Bolt's environment **disables native addons** for security
- ❌ Next.js 14 attempts to load SWC binaries **before** checking for Babel config
- ❌ This causes build failures: `Failed to load SWC binary for linux/x64`

---

## The Solution

### 1. **SWC Binary Stubs**

We created stub files that prevent the native SWC binaries from being loaded:

**Location**: `scripts/patch-swc.js`

This script:
- Creates stub `index.js` files in `@next/swc-*` packages
- Modifies `package.json` to point to stubs instead of native binaries
- Runs automatically after `npm install` via the `postinstall` hook

### 2. **Babel Configuration**

**File**: `.babelrc`
```json
{
  "presets": ["next/babel"]
}
```

This tells Next.js to use Babel for transpilation instead of SWC.

### 3. **Next.js Configuration**

**File**: `next.config.js`
```javascript
swcMinify: false  // Disable SWC minification
```

### 4. **Route Structure**

Next.js route groups `(auth)`, `(site)`, `(dashboard)` were **removed** because they don't work reliably with Babel.

**Before:**
```
app/
├── (auth)/login/
├── (site)/about/
└── (dashboard)/dashboard/
```

**After:**
```
app/
├── login/
├── about/
└── dashboard/
```

### 5. **Font Loading**

Replaced `next/font` (requires SWC) with CSS `@font-face` declarations in `app/globals.css`.

---

## Build Instructions

### First Time Setup

1. Clone the repository
2. Run `npm install` (this automatically patches SWC via postinstall)
3. Run `npm run build`

### After Adding Dependencies

The `postinstall` script runs automatically, but if you encounter SWC errors:

```bash
npm run postinstall
npm run build
```

### Manual Patching (if needed)

```bash
node scripts/patch-swc.js
```

---

## Verification

### Successful Build Indicators

✅ You should see:
```
Disabled SWC as replacement for Babel because of custom Babel configuration
Using external babel configuration from .babelrc
✓ Compiled successfully
```

❌ You should NOT see:
```
Failed to load SWC binary for linux/x64
```

### Build Output

All 23 routes should compile:
- 9 static pages
- 14 dynamic routes
- 6 API endpoints

---

## Troubleshooting

### Problem: "Failed to load SWC binary"

**Solution:**
```bash
node scripts/patch-swc.js
rm -rf .next
npm run build
```

### Problem: "Cannot find module for page"

**Solution:** Clean the build cache
```bash
rm -rf .next
npm run build
```

### Problem: Build succeeds but pages don't load

**Cause:** Cached build with old route group references

**Solution:**
```bash
rm -rf .next node_modules/.cache
npm run build
```

---

## Files Modified for Bolt Compatibility

### Configuration Files
- ✅ `.babelrc` - Enable Babel
- ✅ `next.config.js` - Disable SWC minification
- ✅ `package.json` - Add postinstall hook
- ✅ `.env.local` - Environment configuration

### Scripts
- ✅ `scripts/patch-swc.js` - SWC stub creator

### Application Structure
- ✅ `app/layout.tsx` - Removed `next/font`, using CSS fonts
- ✅ `app/globals.css` - Added @font-face declarations
- ✅ `tailwind.config.ts` - Updated font family references
- ✅ Removed all route groups from app directory

---

## Important Notes

### DO NOT:
- ❌ Remove `.babelrc` file
- ❌ Remove `scripts/patch-swc.js`
- ❌ Remove postinstall script from package.json
- ❌ Use `next/font` (it requires SWC)
- ❌ Use route groups like `(auth)` or `(site)`
- ❌ Upgrade to Next.js 15 without testing

### ALWAYS:
- ✅ Run `npm run postinstall` after npm install fails
- ✅ Clean `.next` directory when you encounter module errors
- ✅ Use CSS `@font-face` for fonts
- ✅ Keep route structure flat (no parentheses)

---

## Deployment Checklist

Before deploying to Bolt:

- [ ] SWC patches are applied
- [ ] `.babelrc` exists
- [ ] `next.config.js` has `swcMinify: false`
- [ ] No route groups in app directory
- [ ] `npm run build` succeeds
- [ ] All 23 routes compile
- [ ] `.next/BUILD_ID` exists

---

## Technical Details

### Why This Approach Works

1. **Postinstall Hook**: Automatically patches SWC after every `npm install`
2. **Stub Files**: Prevent native binary loading without removing packages
3. **Babel Fallback**: Next.js detects `.babelrc` and uses Babel instead
4. **Flat Routes**: Babel doesn't handle route groups well, so we use flat structure

### Performance Considerations

- Babel is slower than SWC (~2x longer build time)
- Bundle size is slightly larger (~5-10%)
- Runtime performance is identical
- Development server starts slower

### Future Compatibility

This solution works with:
- ✅ Next.js 14.0.x - 14.2.x
- ⚠️ Next.js 15.x - May require updates
- ✅ React 18.x
- ✅ Node.js 18+ (LTS)

---

## Success Metrics

**Build Time**: ~60-90 seconds
**Bundle Size**: ~95.7 kB (First Load JS)
**Routes**: 23 total (9 static, 14 dynamic)
**API Endpoints**: 6 functional
**Environment**: Bolt hosting compatible ✅

---

## Contact & Support

If you encounter issues specific to Bolt deployment, ensure:
1. SWC patches are applied
2. Build cache is clean
3. All dependencies are installed
4. Node.js version matches requirements

For persistent issues, check:
- `scripts/patch-swc.js` exists and is executable
- `.babelrc` is in project root
- `postinstall` hook is in package.json
