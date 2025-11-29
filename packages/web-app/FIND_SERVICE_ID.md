# How to Find Your EmailJS Service ID

## Step-by-Step Instructions

### Method 1: From Email Services Page (Easiest)

1. **Log in to EmailJS**
   - Go to https://www.emailjs.com/
   - Click "Sign In" (top right)

2. **Navigate to Email Services**
   - In the left sidebar, click **"Email Services"**
   - You should see a list of your services

3. **Find Your Service**
   - If you have a service already, click on it
   - If you don't have one yet, click **"Add New Service"** button

4. **Copy the Service ID**
   - Once you're viewing a service, look at the top of the page
   - You'll see **"Service ID"** displayed prominently
   - It looks like: `service_abc123xyz` or `service_xxxxx`
   - Click the copy icon next to it, or manually copy it

### Method 2: From Service Settings

1. Go to **Email Services** → Click on your service
2. Look for a section labeled **"Service ID"** or **"ID"**
3. It's usually at the top of the service details page
4. Copy the value (starts with `service_`)

### Method 3: If You Haven't Created a Service Yet

If you don't see any services, you need to create one first:

1. **Click "Add New Service"** button
2. **Choose a service type**:
   - **EmailJS** (easiest for testing)
   - **Gmail** (recommended for production)
   - **Outlook** or other providers

3. **For EmailJS service**:
   - Just click "Create Service"
   - The Service ID will be shown immediately

4. **For Gmail service**:
   - Click "Connect Account"
   - Sign in with your Google account
   - Authorize EmailJS
   - Click "Create Service"
   - The Service ID will be shown

5. **Copy the Service ID** that appears after creation

## Visual Guide

```
EmailJS Dashboard
├── Email Services (click here)
│   ├── [Your Service Name] (click to view)
│   │   └── Service ID: service_abc123xyz ← COPY THIS
│   │
│   └── [Add New Service] (if you don't have one)
│       └── After creating → Service ID appears
```

## What It Looks Like

The Service ID will look like one of these formats:
- `service_abc123xyz`
- `service_xxxxx`
- `service_12345678`

**Important**: It always starts with `service_`

## Common Issues

### "I don't see Email Services in the sidebar"
- Make sure you're logged in
- Try refreshing the page
- The sidebar should be on the left side of the dashboard

### "I created a service but can't find the ID"
- Click on the service name in the list
- The Service ID is usually at the top of the service details page
- Look for a label that says "Service ID" or just "ID"

### "The ID doesn't start with 'service_'"
- Make sure you're looking at the Service ID, not the Template ID
- Service ID = starts with `service_`
- Template ID = starts with `template_`

## Quick Checklist

- [ ] Logged into EmailJS dashboard
- [ ] Clicked "Email Services" in left sidebar
- [ ] Either clicked on existing service OR created a new one
- [ ] Found the "Service ID" (starts with `service_`)
- [ ] Copied it to your `.env` file as `VITE_EMAILJS_SERVICE_ID`

## Still Can't Find It?

1. **Take a screenshot** of your EmailJS dashboard
2. **Check the URL** - it might show the service ID in the URL
3. **Create a new service** - the ID is always shown right after creation
4. **Contact EmailJS support** - they're very helpful: https://www.emailjs.com/support/

## Next Steps

Once you have your Service ID:

1. Open your `.env` file: `packages/web-app/.env`
2. Find the line: `VITE_EMAILJS_SERVICE_ID=service_xxxxx`
3. Replace `service_xxxxx` with your actual Service ID
4. Save the file
5. Run: `pnpm emailjs:validate` to verify

