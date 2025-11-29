# Fix Vercel Deployment Issues

## Issue 1: Wrong Root Directory Path

**Error**: `The provided path "~/biothings_explorer/packages/web-app/packages/web-app" does not exist`

**Solution**: Update Vercel project settings:

1. Go to: https://vercel.com/johns-projects-ebcf5697/byoticabio/settings
2. Under "General" → "Root Directory"
3. Set to: `packages/web-app` (NOT `packages/web-app/packages/web-app`)
4. Save settings

OR use Vercel CLI:
```bash
vercel project ls
# Then update via dashboard or API
```

## Issue 2: Build Error - Missing End Tag

**Error**: `Element is missing end tag` in `ByoticaBioLandingView.vue`

**Solution**: Fix the Vue component:

1. Check the file: `src/views/ByoticaBioLandingView.vue`
2. Ensure all tags are properly closed
3. Check for unclosed `<template>`, `<script>`, or HTML elements
4. Run: `pnpm build` locally to verify fix

## Quick Fix Commands

```bash
# 1. Fix root directory in Vercel dashboard
# Go to: https://vercel.com/johns-projects-ebcf5697/byoticabio/settings

# 2. Fix Vue component
cd packages/web-app
# Edit ByoticaBioLandingView.vue to fix missing end tag

# 3. Test build locally
pnpm build

# 4. Deploy after fixes
vercel --prod
```

## After Fixing

Once both issues are resolved:
- Build will succeed
- Deployment will work
- CI/CD will function properly

