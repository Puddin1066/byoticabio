# Complete Vercel Setup Guide

This guide will walk you through connecting your repository to Vercel and setting up CI/CD workflows.

## Step 1: Connect Repository to Vercel Dashboard

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit https://vercel.com/new
   - Sign in or create an account

2. **Import Git Repository**:
   - Click "Import Git Repository"
   - Select "GitHub"
   - Authorize Vercel to access your GitHub account
   - Find and select: `Puddin1066/byoticabio`
   - Click "Import"

3. **Configure Project**:
   - **Project Name**: `byoticabio` (or your preferred name)
   - **Root Directory**: Click "Edit" and set to: `packages/web-app`
   - **Framework Preset**: Vite (should auto-detect)
   - **Build Command**: `pnpm build` (or leave default)
   - **Output Directory**: `dist` (or leave default)
   - **Install Command**: `pnpm install` (or leave default)

4. **Environment Variables**:
   Click "Environment Variables" and add:
   
   ```
   VITE_EMAILJS_SERVICE_ID=service_mjpd6bh
   VITE_EMAILJS_TEMPLATE_ID=template_q5szk2k
   VITE_EMAILJS_PUBLIC_KEY=ycjEPi5f7wh4SlBaE
   VITE_EMAILJS_TO_EMAIL=john@bioticabio.com
   VITE_ENABLE_EMAIL_NOTIFICATIONS=true
   ```
   
   **Important**: 
   - Add these for **Production**, **Preview**, and **Development** environments
   - Click "Add" after each variable
   - Use your actual values (not the examples above)

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at: `https://byoticabio.vercel.app` (or your custom domain)

### Option B: Via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Link Project**:
   ```bash
   cd packages/web-app
   vercel link
   ```
   - Select your Vercel account/team
   - Create new project or link to existing
   - Follow prompts

4. **Deploy**:
   ```bash
   vercel --prod
   ```

## Step 2: Get Vercel Credentials for CI/CD

To enable GitHub Actions workflows, you need:

1. **Vercel Token**:
   - Go to https://vercel.com/account/tokens
   - Click "Create Token"
   - Name it: `GitHub Actions`
   - Copy the token (you'll only see it once!)

2. **Organization ID**:
   - Go to https://vercel.com/account
   - Your Organization ID is in the URL or API settings

3. **Project ID**:
   - Go to your project in Vercel dashboard
   - Settings → General
   - Copy the "Project ID"

## Step 3: Add GitHub Secrets

1. **Go to GitHub Repository**:
   - https://github.com/Puddin1066/byoticabio
   - Click "Settings" → "Secrets and variables" → "Actions"

2. **Add Secrets**:
   Click "New repository secret" and add:
   
   - **Name**: `VERCEL_TOKEN`
     **Value**: (Your Vercel token from Step 2)
   
   - **Name**: `VERCEL_ORG_ID`
     **Value**: (Your Organization ID from Step 2)
   
   - **Name**: `VERCEL_PROJECT_ID`
     **Value**: (Your Project ID from Step 2)

3. **Verify Secrets**:
   - You should see all three secrets listed
   - They will be masked in logs for security

## Step 4: Enable GitHub Actions

The CI/CD workflows are already created in:
- `.github/workflows/vercel-deploy.yml` (Production deployments)
- `.github/workflows/vercel-preview.yml` (Preview deployments)

**They will automatically:**
- Deploy to production on push to `main` branch
- Create preview deployments for pull requests
- Only trigger when `packages/web-app` files change

## Step 5: Test the Setup

1. **Make a small change**:
   ```bash
   echo "# Test" >> packages/web-app/README.md
   git add packages/web-app/README.md
   git commit -m "test: Trigger Vercel deployment"
   git push
   ```

2. **Check GitHub Actions**:
   - Go to: https://github.com/Puddin1066/byoticabio/actions
   - You should see "Deploy to Vercel" workflow running
   - Wait for it to complete (green checkmark)

3. **Check Vercel Dashboard**:
   - Go to your Vercel project
   - You should see a new deployment
   - Click on it to see the live URL

## Step 6: Custom Domain (Optional)

1. **Add Domain in Vercel**:
   - Go to your project → Settings → Domains
   - Add your custom domain (e.g., `byoticabio.com`)
   - Follow DNS configuration instructions

2. **Update DNS Records**:
   - Add the CNAME or A records as instructed
   - Wait for DNS propagation (can take up to 48 hours)

## Verification Checklist

- [ ] Repository connected to Vercel
- [ ] Project configured with root directory: `packages/web-app`
- [ ] All environment variables added
- [ ] First deployment successful
- [ ] GitHub secrets added (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] GitHub Actions workflows enabled
- [ ] Test deployment triggered successfully

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify `pnpm build` works locally
- Check environment variables are set correctly

### GitHub Actions Fails
- Verify all three secrets are added correctly
- Check workflow file syntax
- Review GitHub Actions logs

### Environment Variables Not Working
- Ensure variables start with `VITE_` prefix
- Check they're added for correct environment (Production/Preview)
- Redeploy after adding variables

### Routing Issues (404 errors)
- Verify `vercel.json` has rewrites configured
- Check Vue Router is using history mode
- Ensure all routes redirect to `index.html`

## Next Steps

Once setup is complete:
1. ✅ Every push to `main` auto-deploys to production
2. ✅ Pull requests get preview deployments
3. ✅ Your app is live and automatically updated
4. ✅ EmailJS integration works in production

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Support](https://vercel.com/support)

