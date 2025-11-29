# How to Find Your EmailJS Template ID

## Step-by-Step Instructions

### Method 1: From Email Templates Page (Easiest)

1. **Log in to EmailJS**
   - Go to https://www.emailjs.com/
   - Click "Sign In" (top right)

2. **Navigate to Email Templates**
   - In the left sidebar, click **"Email Templates"**
   - You should see a list of your templates

3. **Find Your Template**
   - If you have a template already, click on it
   - If you don't have one yet, click **"Create New Template"** button

4. **Copy the Template ID**
   - Once you're viewing a template, look at the top of the page
   - You'll see **"Template ID"** displayed prominently
   - It looks like: `template_abc123xyz` or `template_xxxxx`
   - Click the copy icon next to it, or manually copy it

### Method 2: From Template Settings

1. Go to **Email Templates** → Click on your template
2. Look for a section labeled **"Template ID"** or **"ID"**
3. It's usually at the top of the template editor page
4. Copy the value (starts with `template_`)

### Method 3: If You Haven't Created a Template Yet

If you don't see any templates, you need to create one first:

1. **Click "Create New Template"** button
2. **Fill in the template details**:

   **Template Name**: `lead_notification` (or any name)

   **Subject**: 
   ```
   New {{form_type}} lead from ByoticaBio.ai
   ```

   **Content** (use these exact variable names):
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

3. **Important Template Variables** (must match exactly):
   - `{{to_email}}` - Recipient email
   - `{{form_type}}` - Type of form (contact, demo, test)
   - `{{lead_name}}` - Lead's name
   - `{{lead_email}}` - Lead's email
   - `{{lead_company}}` - Lead's company
   - `{{lead_phone}}` - Lead's phone
   - `{{project_type}}` - Project type
   - `{{message}}` - Message content
   - `{{timestamp}}` - Timestamp
   - `{{subject}}` - Email subject

4. **Click "Save"**
5. **Copy the Template ID** that appears after saving

## Visual Guide

```
EmailJS Dashboard
├── 📧 Email Templates (click here)
│   ├── [Your Template Name] (click to view)
│   │   └── Template ID: template_abc123xyz ← COPY THIS
│   │
│   └── [+ Create New Template] (if you don't have one)
│       └── After creating → Template ID appears
```

## What It Looks Like

The Template ID will look like one of these formats:
- `template_abc123xyz`
- `template_xxxxx`
- `template_12345678`

**Important**: It always starts with `template_`

## Common Issues

### "I don't see Email Templates in the sidebar"
- Make sure you're logged in
- Try refreshing the page
- The sidebar should be on the left side of the dashboard

### "I created a template but can't find the ID"
- Click on the template name in the list
- The Template ID is usually at the top of the template editor
- Look for a label that says "Template ID" or just "ID"
- Sometimes it's in the URL: `/template/template_xxxxx`

### "The ID doesn't start with 'template_'"
- Make sure you're looking at the Template ID, not the Service ID
- Template ID = starts with `template_`
- Service ID = starts with `service_`

## Quick Checklist

- [ ] Logged into EmailJS dashboard
- [ ] Clicked "Email Templates" in left sidebar
- [ ] Either clicked on existing template OR created a new one
- [ ] Found the "Template ID" (starts with `template_`)
- [ ] Copied it to your `.env` file as `VITE_EMAILJS_TEMPLATE_ID`

## Template Variables Reference

Your template MUST include these variables (case-sensitive):

```
{{to_email}}        - Where to send the email
{{form_type}}       - Type: contact, demo, test
{{lead_name}}       - Name of the lead
{{lead_email}}      - Email of the lead
{{lead_company}}    - Company name
{{lead_phone}}      - Phone number
{{project_type}}    - Project type
{{message}}         - Message content
{{timestamp}}       - When submitted
{{subject}}         - Email subject line
```

## Still Can't Find It?

1. **Take a screenshot** of your EmailJS templates page
2. **Check the URL** - it might show the template ID in the URL:
   - `https://dashboard.emailjs.com/admin/template/template_xxxxx`
3. **Create a new template** - the ID is always shown right after creation
4. **Contact EmailJS support** - they're very helpful: https://www.emailjs.com/support/

## Next Steps

Once you have your Template ID:

1. Open your `.env` file: `packages/web-app/.env`
2. Find the line: `VITE_EMAILJS_TEMPLATE_ID=template_xxxxx`
3. Replace `template_xxxxx` with your actual Template ID
4. Save the file
5. Run: `pnpm emailjs:validate` to verify

