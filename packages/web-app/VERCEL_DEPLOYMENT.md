# Vercel Deployment Guide

This guide will help you deploy the Vue.js frontend application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Node.js and pnpm installed
3. Git repository access

## Setup Options

### Option 1: Deploy via Vercel CLI (Recommended for first-time setup)

1. **Install Vercel CLI globally** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to the web-app directory**:
   ```bash
   cd packages/web-app
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Link your project** (first time only):
   ```bash
   vercel link
   ```
   This will prompt you to:
   - Select or create a Vercel project
   - Link to an existing Git repository (optional but recommended)

5. **Deploy to production**:
   ```bash
   pnpm vercel:deploy
   ```
   Or use the Vercel CLI directly:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard (Recommended for CI/CD)

1. **Connect your Git repository**:
   - Go to https://vercel.com/new
   - Import your Git repository
   - Select the repository containing this project

2. **Configure the project**:
   - **Root Directory**: Set to `packages/web-app`
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install` (or `npm install`)

3. **Environment Variables** (Required):
   Add these environment variables in the Vercel dashboard under Project Settings > Environment Variables:
   
   **EmailJS Configuration** (for contact forms):
   - `VITE_EMAILJS_SERVICE_ID` - EmailJS service ID
   - `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template ID
   - `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key
   - `VITE_EMAILJS_TO_EMAIL` - Recipient email address (optional, defaults to john@bioticabio.com)
   
   **HubSpot Integration** (optional):
   - `VITE_HUBSPOT_API_KEY` - HubSpot API key for lead capture
   
   **Lead Capture** (optional):
   - `VITE_LEAD_API_ENDPOINT` - Custom API endpoint for lead submission
   - `VITE_ENABLE_EMAIL_NOTIFICATIONS` - Set to `'true'` to enable email notifications
   
   **Analytics** (optional):
   - `VITE_ANALYTICS_ENDPOINT` - Analytics tracking endpoint
   
   **Note**: All environment variables must be prefixed with `VITE_` to be accessible in the Vue app. Set them for Production, Preview, and Development environments as needed.

4. **Deploy**:
   - Click "Deploy" and Vercel will automatically build and deploy your app

## Configuration Files

### vercel.json
The `vercel.json` file contains the deployment configuration:
- **rewrites**: Handles Vue Router history mode by redirecting all routes to `index.html`
- **headers**: Sets cache headers for static assets
- **buildCommand**: Custom build command for the project
- **outputDirectory**: Where the built files are located (`dist`)

## Available Scripts

From the `packages/web-app` directory:

- `pnpm vercel:deploy` - Deploy to production
- `pnpm vercel:dev` - Run Vercel development server locally
- `pnpm vercel:preview` - Create a preview deployment

## Monorepo Configuration

Since this is a monorepo, Vercel needs to be configured to:
1. Install dependencies from the root (`pnpm install` at root)
2. Build from the `packages/web-app` directory
3. Output to `packages/web-app/dist`

The `vercel.json` is configured to handle this automatically when deployed from the `packages/web-app` directory.

## Environment Variables

If your app uses environment variables, add them in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables for Production, Preview, and Development environments

For Vite apps, environment variables must be prefixed with `VITE_` to be exposed to the client.

## Troubleshooting

### Build Fails
- Ensure all dependencies are listed in `package.json`
- Check that the build command works locally: `pnpm build`
- Review build logs in Vercel dashboard

### Routing Issues (404 on refresh)
- The `vercel.json` includes rewrites to handle Vue Router history mode
- If issues persist, verify the rewrite rule is correct

### Monorepo Issues
- Ensure Vercel is configured with the correct root directory (`packages/web-app`)
- The build command should run from the web-app directory context

## Continuous Deployment

Once connected to Git:
- Every push to `main`/`master` branch automatically deploys to production
- Pull requests create preview deployments
- Preview deployments are automatically cleaned up after merge/close

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)

