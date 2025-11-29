# Vercel GitHub Secrets Setup

## Your Vercel Project ID

```
prj_mcCfaWNBlwprTHcQlsJbn2da7J5C
```

## Add to GitHub Secrets

Go to: https://github.com/Puddin1066/byoticabio/settings/secrets/actions

### 1. Add VERCEL_PROJECT_ID
- **Name**: `VERCEL_PROJECT_ID`
- **Value**: `prj_mcCfaWNBlwprTHcQlsJbn2da7J5C`
- Click "Add secret"

### 2. Add VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: (Get from https://vercel.com/account/tokens)
- Click "Add secret"

### 3. Add VERCEL_ORG_ID
- **Name**: `VERCEL_ORG_ID`
- **Value**: (Get from https://vercel.com/account - it's in the URL or API settings)
- Click "Add secret"

## Quick Links

- **GitHub Secrets**: https://github.com/Puddin1066/byoticabio/settings/secrets/actions
- **Vercel Tokens**: https://vercel.com/account/tokens
- **Vercel Account**: https://vercel.com/account

## After Adding Secrets

Once all three secrets are added:
1. Make a small change and push to `main`
2. Check GitHub Actions: https://github.com/Puddin1066/byoticabio/actions
3. Watch the "Deploy to Vercel" workflow run
4. Your app will auto-deploy!

