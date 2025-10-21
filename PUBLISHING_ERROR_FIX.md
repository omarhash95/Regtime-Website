# Fix for "[object Object]" Publishing Error

## ✅ Your Build Works

```bash
npm run build
# ✓ Generating static pages (23/23)
# ✓ Build complete
```

The application builds successfully. The publishing error is NOT a code problem.

---

## 🔴 The Actual Problem

**You're missing environment variables in Bolt.**

The generic "[object Object]" error means Bolt can't start your server because it needs:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 🛠️ How to Fix (2 minutes)

### Step 1: Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Open your project
3. Click "Settings" → "API"
4. Copy these two values:
   - **Project URL** → This is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → This is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: Add to Bolt

1. Go to your Bolt project dashboard
2. Click "Settings" or "Environment Variables"
3. Add:
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://yourproject.supabase.co

   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: your-actual-anon-key
   ```
4. Save

### Step 3: Publish Again

Click "Publish" or "Deploy" in Bolt.

**It should work now.**

---

## Why This Fixes It

Your application uses Supabase middleware that runs on every request:

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
```

This middleware needs the Supabase URL and key to function.

**Without env vars:**
- Build succeeds (static compilation)
- Server start fails (middleware crashes)
- Bolt shows "[object Object]" error

**With env vars:**
- Build succeeds
- Server starts successfully
- App works ✅

---

## Other Configuration Already Done

I've already fixed:

✅ **Next.js 13.5.6** - Works in Bolt (no SWC required)
✅ **Standalone output** - Self-contained deployment
✅ **Port configuration** - Uses Bolt's PORT variable
✅ **Babel transpilation** - No native addons needed
✅ **Build succeeds** - All 23 routes compile

**Only missing: Environment variables**

---

## Verification

After adding env vars and publishing, you should see:

```
✓ Build completed
✓ Starting production server
✓ Ready on http://0.0.0.0:3000
```

And you'll be able to visit your Bolt URL and see the app running.

---

## If It Still Fails

1. **Check the actual error** in Bolt's build logs (not just "[object Object]")
2. **Verify env var names** - Must be exact: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Verify env var values** - Copy from Supabase dashboard, no extra spaces
4. **Try redeploying** - Sometimes Bolt needs a fresh deploy after adding vars

---

## Alternative: Test Without Supabase

If you want to test deployment without Supabase:

1. Comment out middleware:
   ```typescript
   // middleware.ts
   export async function middleware(request: NextRequest) {
     return NextResponse.next() // Skip Supabase check
   }
   ```

2. Publish to Bolt
3. Should deploy successfully
4. Then add env vars and uncomment middleware

---

## Summary

**Problem:** "[object Object]" when publishing to Bolt
**Cause:** Missing Supabase environment variables
**Fix:** Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Bolt settings
**Time:** 2 minutes

**Your code is fine. Just add the environment variables.**
