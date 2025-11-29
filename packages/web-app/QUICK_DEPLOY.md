# Quick Deploy to Vercel

## Fastest Way to Deploy

### Step 1: Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### Step 2: Navigate to web-app directory
```bash
cd packages/web-app
```

### Step 3: Login to Vercel
```bash
vercel login
```

### Step 4: Deploy
```bash
# First time: Link project
vercel link

# Deploy to production
vercel --prod
```

Or use the npm script:
```bash
pnpm vercel:deploy
```

Or use the deployment script:
```bash
./deploy.sh
```

## Environment Variables

**IMPORTANT**: Before deploying, set these environment variables in Vercel dashboard:

1. Go to your project in Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the following (all prefixed with `VITE_`):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TO_EMAIL=your_email@example.com
```

Optional variables:
```
VITE_HUBSPOT_API_KEY=your_hubspot_key
VITE_LEAD_API_ENDPOINT=your_endpoint
VITE_ENABLE_EMAIL_NOTIFICATIONS=true
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
```

## After Deployment

1. Your app will be live at: `https://your-project.vercel.app`
2. You can set a custom domain in Vercel dashboard
3. Every push to main branch will auto-deploy

## Need Help?

See `VERCEL_DEPLOYMENT.md` for detailed documentation.

