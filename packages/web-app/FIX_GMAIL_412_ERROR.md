# Fix Gmail 412 Error: Insufficient Authentication Scopes

## The Problem

**Error**: `412 Gmail_API: Request had insufficient authentication scopes`

This means your Gmail service connection in EmailJS doesn't have the right permissions to send emails.

## Quick Fix: Reconnect Gmail with Proper Permissions

### Step 1: Go to EmailJS Dashboard
1. Log in to https://dashboard.emailjs.com/
2. Click **"Email Services"** in the left sidebar
3. Find your Gmail service (Service ID: `service_th95v45`)

### Step 2: Reconnect Gmail Account
1. Click on your Gmail service
2. Look for **"Reconnect"**, **"Edit"**, or **"Disconnect"** button
3. Click it to disconnect the current connection
4. Click **"Connect Account"** again
5. **IMPORTANT**: When Google asks for permissions:
   - ✅ Check **ALL** permission boxes
   - ✅ Grant **"Send email on your behalf"**
   - ✅ Grant **"Manage your email"**
   - ✅ Click **"Allow"** (don't skip any permissions)

### Step 3: Verify Connection
- Service should show as **"Connected"** and **"Active"**
- No error messages

### Step 4: Test Again
```bash
pnpm emailjs:test
```

## Alternative: Use EmailJS Service (Easier, No OAuth)

If Gmail keeps having issues, switch to EmailJS's own service (no OAuth needed):

### Step 1: Create New EmailJS Service
1. Go to **Email Services** → **Add New Service**
2. Select **"EmailJS"** (not Gmail)
3. Click **"Create Service"**
4. Copy the new Service ID

### Step 2: Update Your .env File
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx  # Your new EmailJS service ID
```

### Step 3: Test
```bash
pnpm emailjs:test
```

**Note**: 
- ✅ EmailJS service = Easier setup, no OAuth
- ⚠️ Emails come from EmailJS domain (not your domain)
- ✅ Gmail service = Emails from your domain, but requires OAuth setup

## Why This Happens

Gmail API needs these OAuth scopes:
- `https://www.googleapis.com/auth/gmail.send`
- `https://www.googleapis.com/auth/gmail.compose`

If these weren't granted during initial connection, you get the 412 error.

## Troubleshooting

### If "Reconnect" doesn't work:
1. **Delete the Gmail service** completely
2. **Create a new one** from scratch
3. Make sure to grant **ALL** permissions when connecting

### If you can't grant permissions:
1. Go to https://myaccount.google.com/permissions
2. Find "EmailJS" in third-party apps
3. **Remove it**
4. Go back to EmailJS and reconnect fresh

### Check Google Account Type:
- **Personal Gmail**: Should work fine
- **Google Workspace**: May need admin approval
- **2FA Enabled**: Make sure to complete 2FA when connecting

## Recommended: Use EmailJS Service for Now

For fastest setup, I recommend using EmailJS service:
1. No OAuth complexity
2. Works immediately
3. You can switch to Gmail later for production

Just create a new "EmailJS" service and update your Service ID in `.env`.

