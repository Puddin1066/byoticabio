# How to Get EmailJS Credentials

## Quick Start Guide

### Step 1: Sign Up for EmailJS (Free)

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right corner)
3. Sign up with:
   - Email address
   - Password
   - Or use Google/GitHub login
4. Verify your email address (check your inbox)

### Step 2: Get Your Public Key

1. After logging in, go to **Account** → **General** (or click your profile icon)
2. Scroll down to find **"Public Key"**
3. Copy the Public Key (looks like: `xxxxxxxxxxxxx` or `user_xxxxxxxxxxxxx`)
4. This is your `VITE_EMAILJS_PUBLIC_KEY`

### Step 3: Create an Email Service

1. In the EmailJS dashboard, click **"Email Services"** in the left sidebar
2. Click **"Add New Service"** button
3. Choose one of these options:

   **Option A: EmailJS (Easiest for Testing)**
   - Select **"EmailJS"** service
   - This uses EmailJS's own email service (good for testing)
   - Click **"Create Service"**
   - Note the **Service ID** (looks like: `service_xxxxx`)

   **Option B: Gmail (Recommended for Production)**
   - Select **"Gmail"**
   - Click **"Connect Account"**
   - **Important**: Sign in with your Google Workspace account (e.g., `john@bioticabio.com` or `noreply@bioticabio.com`)
   - This allows you to send emails FROM your bioticabio.com domain
   - Authorize EmailJS to send emails
   - Click **"Create Service"**
   - Note the **Service ID** (looks like: `service_xxxxx`)
   - **Why use Gmail service?** If your domain (bioticabio.com) is hosted on Google Workspace, using Gmail service lets you send FROM your domain email addresses, which improves deliverability and looks more professional

   **Option C: Other Providers**
   - You can also use Outlook, Yahoo, or custom SMTP
   - Follow the provider-specific instructions

4. **Save your Service ID** - this is your `VITE_EMAILJS_SERVICE_ID`

### Step 4: Create an Email Template

1. In the EmailJS dashboard, click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"** button
3. Fill in the template:

   **Template Name**: `lead_notification` (or any name you prefer)

   **Subject**: 
   ```
   New {{form_type}} lead from ByoticaBio.ai
   ```

   **Content** (HTML or Plain Text):
   ```
   New Lead Submission:

   Type: {{form_type}}
   Name: {{lead_name}}
   Email: {{lead_email}}
   Company: {{lead_company}}
   Phone: {{lead_phone}}
   Project Type: {{project_type}}

   Message:
   {{message}}

   Timestamp: {{timestamp}}
   Source: ByoticaBio.ai Landing Page
   ```

   **Or use HTML format** (click "HTML" tab):
   ```html
   <h2>New Lead Submission</h2>
   <p><strong>Type:</strong> {{form_type}}</p>
   <p><strong>Name:</strong> {{lead_name}}</p>
   <p><strong>Email:</strong> {{lead_email}}</p>
   <p><strong>Company:</strong> {{lead_company}}</p>
   <p><strong>Phone:</strong> {{lead_phone}}</p>
   <p><strong>Project Type:</strong> {{project_type}}</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   <hr>
   <p><small>Timestamp: {{timestamp}}<br>Source: ByoticaBio.ai Landing Page</small></p>
   ```

4. **Important**: Make sure the template variable names match exactly:
   - `{{to_email}}`
   - `{{form_type}}`
   - `{{lead_name}}`
   - `{{lead_email}}`
   - `{{lead_company}}`
   - `{{lead_phone}}`
   - `{{project_type}}`
   - `{{message}}`
   - `{{timestamp}}`
   - `{{subject}}`

5. Click **"Save"**
6. **Note the Template ID** (looks like: `template_xxxxx`) - this is your `VITE_EMAILJS_TEMPLATE_ID`

### Step 5: Configure Your .env File

1. Create a `.env` file in `packages/web-app/` directory (if it doesn't exist)
2. Add your credentials:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
VITE_EMAILJS_TO_EMAIL=john@bioticabio.com

# Enable email notifications
VITE_ENABLE_EMAIL_NOTIFICATIONS=true
```

3. Replace the values:
   - `service_xxxxx` → Your Service ID from Step 3
   - `template_xxxxx` → Your Template ID from Step 4
   - `xxxxxxxxxxxxx` → Your Public Key from Step 2
   - `john@bioticabio.com` → The email address where you want to receive notifications

### Step 6: Restart Your Dev Server

After creating/updating the `.env` file:

1. Stop your dev server (Ctrl+C)
2. Start it again: `pnpm run dev`
3. The new environment variables will be loaded

### Step 7: Test It!

1. Open your app in the browser
2. Look for the **Testing Dashboard** (bottom-right corner)
3. Click the **"Test Email"** button
4. Check `john@bioticabio.com` for the test email

## Where to Find Your Credentials in EmailJS Dashboard

### Public Key
- **Location**: Account → General → Public Key
- **Looks like**: `user_abc123xyz` or `abc123xyz`

### Service ID
- **Location**: Email Services → [Your Service] → Service ID
- **Looks like**: `service_abc123xyz`

### Template ID
- **Location**: Email Templates → [Your Template] → Template ID
- **Looks like**: `template_abc123xyz`

## Free Tier Limits

- **200 emails per month** (free tier)
- Perfect for testing and small projects
- Upgrade available if you need more

## Troubleshooting

### "EmailJS not configured" error
- Make sure all three variables are set in `.env`
- Make sure variable names start with `VITE_`
- Restart your dev server after updating `.env`

### Email not sending
- Check EmailJS dashboard for error logs
- Verify template variable names match exactly
- Make sure your email service is connected properly
- Check browser console for error messages

### Can't find credentials
- Service ID: Email Services → Click on your service → Service ID is at the top
- Template ID: Email Templates → Click on your template → Template ID is at the top
- Public Key: Click your profile icon → Account → General → Scroll to Public Key

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

