# EmailJS on Vercel - How It Works & Deployment Guide

## How EmailJS Works

### Architecture Overview

EmailJS is a **client-side email service** that works entirely in the browser. Here's how it works:

```
┌─────────────┐
│   Browser   │
│  (Your App) │
└──────┬──────┘
       │
       │ 1. User submits form
       │
       ▼
┌─────────────────┐
│  EmailJS SDK    │
│ (@emailjs/browser)│
└──────┬──────────┘
       │
       │ 2. Send email via EmailJS API
       │    (Uses Service ID, Template ID, Public Key)
       │
       ▼
┌─────────────────┐
│  EmailJS Cloud  │
│   (emailjs.com) │
└──────┬──────────┘
       │
       │ 3. EmailJS processes email
       │    (Uses your configured email service)
       │
       ▼
┌─────────────────┐
│ Email Provider  │
│ (Gmail/Outlook/ │
│  EmailJS SMTP)  │
└─────────────────┘
       │
       │ 4. Email delivered
       │
       ▼
┌─────────────────┐
│  Recipient      │
│  Inbox          │
└─────────────────┘
```

### Key Points

1. **No Backend Required**: EmailJS runs entirely in the browser
2. **Direct API Calls**: Your app calls EmailJS's API directly from the client
3. **EmailJS as Middleman**: EmailJS acts as a proxy between your app and email providers
4. **Template-Based**: Uses pre-configured email templates in EmailJS dashboard
5. **Secure**: Uses public keys (not private keys) - safe to expose in client code

### How It Works Step-by-Step

1. **User Action**: User submits a form on your website
2. **Client-Side Code**: Your Vue app calls `emailjs.send()`
3. **EmailJS API**: Request goes to EmailJS's servers with:
   - Service ID (which email service to use)
   - Template ID (which email template to use)
   - Template parameters (form data)
   - Public Key (for authentication)
4. **EmailJS Processing**: EmailJS:
   - Validates the request
   - Fetches your email template
   - Replaces template variables with your data
   - Sends email via your configured email service
5. **Email Delivery**: Email is sent through your email provider (Gmail, Outlook, etc.)

## Will It Work on Vercel?

### ✅ YES - EmailJS Works Perfectly on Vercel!

**Why it works:**
- EmailJS is **client-side only** - no server-side code needed
- Vercel serves static files (HTML, JS, CSS) - perfect for client-side services
- No backend API required
- No server environment variables needed (uses client-side env vars)

### Vercel Deployment Considerations

#### 1. Environment Variables

**Important**: Vercel uses different environment variable handling than local development.

**Local Development** (`.env` file):
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
VITE_EMAILJS_TO_EMAIL=j.jayround@gmail.com
```

**Vercel Deployment** (Vercel Dashboard):
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the same variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_TO_EMAIL`

**Note**: Vite automatically exposes variables prefixed with `VITE_` to the client bundle. This is safe for EmailJS because:
- Public Key is meant to be public (it's in the name)
- Service ID and Template ID are not sensitive
- No private keys or secrets are exposed

#### 2. Build Configuration

Vercel will automatically:
- Detect Vite project
- Run `pnpm build` (or `npm run build`)
- Serve the built static files

No special configuration needed!

#### 3. CORS and Security

EmailJS handles CORS automatically. Your Vercel-deployed app can call EmailJS API without issues.

#### 4. Rate Limits

EmailJS free tier: **200 emails/month**
- This applies regardless of where your app is hosted
- Vercel deployment doesn't change this limit
- Consider upgrading EmailJS plan for production

## Deployment Checklist

### Before Deploying to Vercel

- [ ] EmailJS account created
- [ ] Email service configured in EmailJS dashboard
- [ ] Email template created in EmailJS dashboard
- [ ] Environment variables added to Vercel project:
  - [ ] `VITE_EMAILJS_SERVICE_ID`
  - [ ] `VITE_EMAILJS_TEMPLATE_ID`
  - [ ] `VITE_EMAILJS_PUBLIC_KEY`
  - [ ] `VITE_EMAILJS_TO_EMAIL`
- [ ] Test email sent successfully locally
- [ ] Build works: `pnpm build`

### After Deploying to Vercel

- [ ] Test email from production URL
- [ ] Verify environment variables are loaded
- [ ] Check browser console for errors
- [ ] Test form submission on production site
- [ ] Verify email delivery

## Testing on Vercel

### Check Environment Variables

In browser console on your Vercel-deployed site:
```javascript
console.log('EmailJS Config:', {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? '✅ Set' : '❌ Missing',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? '✅ Set' : '❌ Missing',
  toEmail: import.meta.env.VITE_EMAILJS_TO_EMAIL || 'Not set',
});
```

### Send Test Email

```javascript
// In browser console on production site
await window.sendTestEmailTo('j.jayround@gmail.com', 'Test from Vercel deployment')
```

## Common Issues & Solutions

### Issue: "EmailJS not configured" on Vercel

**Solution**: 
1. Check Vercel environment variables are set
2. Ensure variable names start with `VITE_`
3. Redeploy after adding variables
4. Check variable values match EmailJS dashboard

### Issue: Emails not sending from production

**Solution**:
1. Check EmailJS dashboard for errors
2. Verify email service is active in EmailJS
3. Check browser console for API errors
4. Verify template variables match exactly
5. Check EmailJS rate limits (200/month free tier)

### Issue: Environment variables not available

**Solution**:
1. Variables must be set in Vercel dashboard (not just `.env` file)
2. Variables must start with `VITE_` to be exposed to client
3. Redeploy after adding variables
4. Clear browser cache and hard refresh

## Security Considerations

### ✅ Safe to Expose
- `VITE_EMAILJS_PUBLIC_KEY` - Public key, designed to be public
- `VITE_EMAILJS_SERVICE_ID` - Not sensitive
- `VITE_EMAILJS_TEMPLATE_ID` - Not sensitive

### ⚠️ Considerations
- EmailJS public keys are rate-limited per key
- Monitor EmailJS dashboard for unusual activity
- Consider using different keys for dev/prod if needed
- EmailJS has built-in spam protection

## Alternative: Server-Side Email (If Needed)

If you need more control or higher limits, consider:

1. **Vercel Serverless Functions** + EmailJS
   - Create API route in Vercel
   - Call EmailJS from serverless function
   - More secure but requires backend code

2. **Resend** (as you mentioned)
   - Requires Vercel serverless function
   - Better deliverability
   - Higher limits
   - Requires backend code

3. **SendGrid**
   - Requires Vercel serverless function
   - Enterprise-grade
   - Higher costs

**For your use case**: EmailJS is perfect because:
- ✅ No backend needed
- ✅ Works immediately on Vercel
- ✅ Free tier sufficient for testing
- ✅ Easy to upgrade later

## Summary

**EmailJS will work perfectly on Vercel** because:
1. It's client-side only (no server needed)
2. Vercel serves static files (perfect match)
3. Just need to add environment variables in Vercel dashboard
4. No special configuration required

**Next Steps**:
1. Set up EmailJS account (if not done)
2. Configure email service and template
3. Add environment variables to Vercel
4. Deploy and test!

