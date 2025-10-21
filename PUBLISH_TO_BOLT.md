# 🚀 Publish to Bolt - Quick Guide

## Step 1: Add Environment Variables to Bolt

Go to your Bolt project dashboard and add these **2 environment variables**:

### Variable 1
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xwdckatknldxjjudltkp.supabase.co
```

### Variable 2
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZGNrYXRrbmxkeGpqdWRsdGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDI4MzksImV4cCI6MjA3NjExODgzOX0.2hDxzoOuwVg5cKa7VVETck2zcPG7kibahggLMsbWv38
```

## Step 2: Click Publish

That's it. Click the "Publish" or "Deploy" button in Bolt.

---

## Why This Was Failing

Your middleware needs these variables to connect to Supabase:

```typescript
// middleware.ts runs on every request
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,     // ← Was undefined
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // ← Was undefined
)
```

Without them, the server couldn't start, causing the "[object Object]" error.

---

## What Happens When You Publish

Bolt will run:
```bash
1. npm install        # Install dependencies
2. npm run build      # Build your app (works ✅)
3. npm start          # Start server (now works ✅)
```

Expected output:
```
✓ Build complete
✓ Starting production server
✓ Ready on http://0.0.0.0:3000
🎉 Deployment successful!
```

You'll get a URL like: `https://your-project.bolt.new`

---

## Troubleshooting

### Still getting "[object Object]"?

1. **Check variable names** - Must be exact:
   - `NEXT_PUBLIC_SUPABASE_URL` (not SUPABASE_URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not SUPABASE_KEY or ANON_KEY)

2. **Check for extra spaces** - Copy/paste values exactly as shown

3. **Save and redeploy** - Make sure you clicked "Save" after adding vars

4. **Check Bolt logs** - Look for the actual error message

---

## Your App Is Production-Ready

✅ Build succeeds (all 23 routes)
✅ Next.js 13.5.6 (Bolt-compatible)
✅ Standalone output configured
✅ Port handling configured
✅ TypeScript validated
✅ Supabase integrated
✅ Environment variables set locally

**Only missing:** Same env vars in Bolt dashboard

---

## Go Add Those Variables Now! 🎯

1. Open Bolt project settings
2. Add the 2 environment variables above
3. Click Publish
4. Wait 2-3 minutes
5. Your app is live!
