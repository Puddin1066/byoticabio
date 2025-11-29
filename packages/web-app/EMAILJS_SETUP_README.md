# EmailJS Setup Script

This script uses the **EmailJS REST API** to automatically validate and test your EmailJS configuration.

## Quick Start

### 1. Validate Configuration
Check if your `.env` file has all required credentials:

```bash
pnpm emailjs:validate
# or
node setup-emailjs.js --validate
```

### 2. Test Email Sending
Send a test email to verify everything works:

```bash
pnpm emailjs:test
# or
node setup-emailjs.js --test
```

### 3. Full Setup (Validate + Test)
Run both validation and test:

```bash
pnpm emailjs:setup
# or
node setup-emailjs.js
```

## What It Does

1. **Validates** your `.env` file credentials:
   - Checks if `VITE_EMAILJS_SERVICE_ID` is set
   - Checks if `VITE_EMAILJS_TEMPLATE_ID` is set
   - Checks if `VITE_EMAILJS_PUBLIC_KEY` is set
   - Verifies format (e.g., Service ID starts with `service_`)

2. **Tests** email sending:
   - Uses EmailJS REST API to send a test email
   - Verifies your credentials are correct
   - Confirms your template variables match

3. **Provides Helpful Error Messages**:
   - Tells you exactly what's missing
   - Suggests fixes for common issues
   - Points you to the right documentation

## Current Status

Based on the last validation run:
- ✅ **Public Key**: Found and configured
- ❌ **Service ID**: Missing (needs to be set in `.env`)
- ❌ **Template ID**: Missing (needs to be set in `.env`)

## Next Steps

1. **Get your Service ID**:
   - Go to https://www.emailjs.com/
   - Email Services → Your Service → Copy Service ID
   - Update `.env`: `VITE_EMAILJS_SERVICE_ID=service_xxxxx`

2. **Get your Template ID**:
   - Email Templates → Your Template → Copy Template ID
   - Update `.env`: `VITE_EMAILJS_TEMPLATE_ID=template_xxxxx`

3. **Run the test again**:
   ```bash
   pnpm emailjs:test
   ```

## How It Works

The script uses the **EmailJS REST API** (`https://api.emailjs.com/api/v1.0/email/send`) to:
- Send test emails from Node.js (not just browser)
- Validate credentials before deployment
- Test your configuration without running the full app

This is different from the browser SDK (`@emailjs/browser`) which is used in your Vue app - the script uses the REST API for server-side testing.

## Troubleshooting

### "Configuration is invalid"
- Make sure all three required variables are in your `.env` file
- Check that values don't still have placeholder text (`service_xxxxx`)

### "HTTP 400" or "Invalid"
- Service ID, Template ID, or Public Key may be incorrect
- Template variables may not match your EmailJS template
- Check your EmailJS dashboard for error logs

### "HTTP 403"
- Public Key is incorrect
- Check Account → General → Public Key in EmailJS dashboard

### "HTTP 429" or "rate limit"
- You've hit the free tier limit (200 emails/month)
- Check EmailJS dashboard for usage statistics

## See Also

- [EMAILJS_CREDENTIALS_GUIDE.md](./EMAILJS_CREDENTIALS_GUIDE.md) - Step-by-step guide to get credentials
- [EmailJS REST API Docs](https://www.emailjs.com/docs/rest-api/send/) - API documentation
- [EmailJS Tutorial](https://www.emailjs.com/docs/tutorial/overview/) - Official tutorial

