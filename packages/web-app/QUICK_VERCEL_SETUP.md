# Quick Vercel Setup (5 Minutes)

## Fastest Way to Deploy

### 1. Connect Repository (2 min)

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `Puddin1066/byoticabio`
4. Configure:
   - **Root Directory**: `packages/web-app`
   - **Framework**: Vite (auto-detected)
5. Click "Deploy"

### 2. Add Environment Variables (2 min)

In Vercel dashboard → Project Settings → Environment Variables, add:

```
VITE_EMAILJS_SERVICE_ID=service_mjpd6bh
VITE_EMAILJS_TEMPLATE_ID=template_q5szk2k
VITE_EMAILJS_PUBLIC_KEY=ycjEPi5f7wh4SlBaE
VITE_EMAILJS_TO_EMAIL=john@bioticabio.com
VITE_ENABLE_EMAIL_NOTIFICATIONS=true
```

**Important**: Add for Production, Preview, AND Development environments.

### 3. Enable CI/CD (1 min)

1. Get Vercel credentials:
   - Token: https://vercel.com/account/tokens
   - Org ID: https://vercel.com/account
   - Project ID: Project Settings → General

2. Add to GitHub Secrets:
   - Go to: https://github.com/Puddin1066/byoticabio/settings/secrets/actions
   - Add: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

3. Done! Every push to `main` auto-deploys.

## Your App Will Be Live At

`https://byoticabio.vercel.app` (or your custom domain)

## Need Help?

See `VERCEL_SETUP_COMPLETE.md` for detailed instructions.

