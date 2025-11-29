#!/bin/bash

# Vercel Deployment Script
# This script helps deploy the Vue app to Vercel

set -e

echo "🚀 Starting Vercel deployment process..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Navigate to web-app directory
cd "$(dirname "$0")"

# Check if already linked to a Vercel project
if [ ! -f ".vercel/project.json" ]; then
    echo "📦 Linking to Vercel project..."
    vercel link
fi

# Deploy to production
echo "🌐 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Vercel dashboard if not already set"
echo "2. Verify the deployment at the provided URL"
echo "3. Check build logs if there are any issues"

