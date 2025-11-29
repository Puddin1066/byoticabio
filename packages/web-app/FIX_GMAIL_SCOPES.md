# Fix Gmail API "Insufficient Authentication Scopes" Error

## Error: 412 Gmail_API: Request had insufficient authentication scopes

This error means your Gmail service in EmailJS doesn't have the right permissions to send emails.

## Solution: Reconnect Gmail Service with Proper Scopes

### Step 1: Go to EmailJS Dashboard

1. Log in to https://dashboard.emailjs.com/
2. Click **"Email Services"** in the left sidebar
3. Find your Gmail service (the one with Service ID: `service_th95v45`)

### Step 2: Reconnect Gmail Account

**Option A: Edit Existing Service**

1. Click on your Gmail service
2. Look for **"Reconnect"** or **"Edit"** button
3. Click **"Reconnect Account"** or **"Disconnect and Reconnect"**
4. Sign in with your Google account again
5. **IMPORTANT**: When Google asks for permissions, make sure to:
   - Grant **"Send email on your behalf"** permission
   - Grant **"Manage your email"** permission
   - Click **"Allow"** for all requested permissions

**Option B: Delete and Recreate Service**

1. Delete the current Gmail service
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with your Google account
6. **Grant all requested permissions** when prompted
7. Click **"Create Service"**
8. Copy the new Service ID and update your `.env` file

### Step 3: Verify Permissions

After reconnecting, check that the service shows:
- ✅ Connected
- ✅ Permissions granted
- ✅ Ready to send emails

## Alternative: Use EmailJS Service Instead

If Gmail continues to have issues, you can use EmailJS's own email service (simpler, no OAuth needed):

### Step 1: Create EmailJS Service

1. Go to **Email Services** → **Add New Service**
2. Select **"EmailJS"** (not Gmail)
3. Click **"Create Service"**
4. Copy the Service ID

### Step 2: Update Your .env

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx  # Your new EmailJS service ID
```

### Step 3: Test

```bash
pnpm emailjs:test
```

**Note**: EmailJS service is easier to set up but emails will come from EmailJS's domain. Gmail service is better for production as emails come from your domain.

## Why This Happens

Gmail API requires specific OAuth scopes to send emails:
- `https://www.googleapis.com/auth/gmail.send`
- `https://www.googleapis.com/auth/gmail.compose`

If these weren't granted during the initial connection, you'll get the 412 error.

## Quick Fix Checklist

- [ ] Go to EmailJS dashboard → Email Services
- [ ] Find your Gmail service
- [ ] Click "Reconnect" or "Edit"
- [ ] Sign in with Google again
- [ ] **Grant ALL requested permissions** (don't skip any)
- [ ] Verify service shows as "Connected"
- [ ] Test with: `pnpm emailjs:test`

## Still Having Issues?

1. **Try EmailJS service instead** (no OAuth needed)
2. **Check Google account permissions**:
   - Go to https://myaccount.google.com/permissions
   - Find "EmailJS" in the list
   - Remove it and reconnect
3. **Use a different email service**:
   - Outlook
   - Custom SMTP
   - Or stick with EmailJS service

