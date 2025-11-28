# Email Nurture Sequence Implementation Guide

## Overview

This guide explains how to implement automated email nurturing sequences to complete the B2B marketing funnel. Currently, leads submit forms but receive no automated follow-up.

## What's Missing

**Current State**: Form submissions → Alert message → Manual follow-up required

**Target State**: Form submissions → Automated email sequence → CRM integration → Sales team notification

## Implementation Options

### Option 1: SendGrid (Recommended for Quick Start)

**Pros**:
- Easy to set up
- Good free tier (100 emails/day)
- Good deliverability
- API integration ready

**Cons**:
- Limited marketing automation features
- Need to build sequences manually

**Cost**: Free (100 emails/day) or $15/month (40,000 emails/month)

### Option 2: Mailchimp

**Pros**:
- Better automation workflows
- Easy template builder
- Analytics included
- Free tier available

**Cons**:
- Can be expensive as you scale
- Less developer-friendly API

**Cost**: Free (500 contacts, 1,000 emails/month) or $10-20/month

### Option 3: HubSpot (Best for Full Funnel)

**Pros**:
- Complete CRM + Marketing automation
- Advanced lead scoring
- Sales pipeline management
- Free tier available

**Cons**:
- Steeper learning curve
- Can be expensive as you scale

**Cost**: Free (up to 1,000 contacts) or $20-50/month

## Recommended Implementation: SendGrid

### Step 1: Set Up SendGrid Account

1. Sign up at https://sendgrid.com
2. Verify your domain (for better deliverability)
3. Create an API key with "Mail Send" permissions
4. Get your API key

### Step 2: Install SendGrid SDK

```bash
cd packages/web-app
pnpm add @sendgrid/mail
```

### Step 3: Create Email Templates

Create email template files:

**File**: `packages/web-app/src/utils/emailTemplates.js`

```javascript
/**
 * Email Templates for Lead Nurturing
 */

export const emailTemplates = {
  // Email 1: Immediate welcome
  welcome: {
    vc: {
      subject: 'Thank You - Due Diligence Services for Biotech Investments',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0066cc;">Thank You for Your Interest</h2>
              <p>Hello,</p>
              <p>Thank you for reaching out about our due diligence services. We help VC firms make faster, better decisions on biotech investments using AI-powered knowledge graphs.</p>
              <p><strong>What to Expect:</strong></p>
              <ul>
                <li>Our team will review your inquiry within 24 hours</li>
                <li>We'll schedule a brief call to understand your needs</li>
                <li>You'll receive a customized proposal within 48 hours</li>
              </ul>
              <p><strong>Quick Facts:</strong></p>
              <ul>
                <li>✅ 5-day complete technical assessment</li>
                <li>✅ Query 100+ biomedical APIs simultaneously</li>
                <li>✅ Comprehensive evidence synthesis</li>
              </ul>
              <p>In the meantime, feel free to check out our <a href="https://byoticabio.ai#services">services page</a>.</p>
              <p>Best regards,<br>The ByoticaBio.ai Team</p>
            </div>
          </body>
        </html>
      `,
    },
    biotech: {
      subject: 'Thank You - Drug Discovery & Biotech Intelligence Services',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0066cc;">Thank You for Your Interest</h2>
              <p>Hello,</p>
              <p>Thank you for reaching out about our biotech intelligence services. We help biotech companies accelerate drug discovery and make data-driven decisions using advanced knowledge graph technology.</p>
              <p><strong>What to Expect:</strong></p>
              <ul>
                <li>Our team will review your inquiry within 24 hours</li>
                <li>We'll schedule a brief call to understand your project</li>
                <li>You'll receive a customized proposal within 48 hours</li>
              </ul>
              <p><strong>How We Help Biotech Companies:</strong></p>
              <ul>
                <li>✅ Target identification & prioritization</li>
                <li>✅ Multi-hop reasoning across knowledge domains</li>
                <li>✅ 100+ biomedical APIs in one query</li>
              </ul>
              <p>Best regards,<br>The ByoticaBio.ai Team</p>
            </div>
          </body>
        </html>
      `,
    },
    pharma: {
      subject: 'Thank You - Competitive Intelligence Services',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0066cc;">Thank You for Your Interest</h2>
              <p>Hello,</p>
              <p>Thank you for reaching out about our competitive intelligence services. We help pharma companies understand competitive landscapes and identify opportunities using comprehensive knowledge graph analysis.</p>
              <p><strong>What to Expect:</strong></p>
              <ul>
                <li>Our team will review your inquiry within 24 hours</li>
                <li>We'll schedule a brief call to understand your needs</li>
                <li>You'll receive a customized proposal within 48 hours</li>
              </ul>
              <p>Best regards,<br>The ByoticaBio.ai Team</p>
            </div>
          </body>
        </html>
      `,
    },
    entrepreneur: {
      subject: 'Thank You - Biotech Intelligence for Startups',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0066cc;">Thank You for Your Interest</h2>
              <p>Hello,</p>
              <p>Thank you for reaching out! We help startups and entrepreneurs validate opportunities and accelerate research using AI-powered knowledge graphs.</p>
              <p><strong>What to Expect:</strong></p>
              <ul>
                <li>Our team will review your inquiry within 24 hours</li>
                <li>We offer a free consultation to discuss your needs</li>
                <li>Fast turnaround - results in days, not months</li>
              </ul>
              <p>Best regards,<br>The ByoticaBio.ai Team</p>
            </div>
          </body>
        </html>
      `,
    },
  },
  
  // Email 2: Day 1 follow-up
  day1: {
    vc: {
      subject: 'How We Helped a VC Firm Evaluate a Biotech Investment',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0066cc;">Real Results: 5-Day Due Diligence</h2>
              <p>Hello,</p>
              <p>Yesterday you expressed interest in our due diligence services. I wanted to share a quick example of how we help VC firms.</p>
              <p><strong>Case Study:</strong></p>
              <p>A venture capital firm needed to evaluate a biotech acquisition target's scientific validity. Traditional due diligence would take 2-3 months.</p>
              <p><strong>Our Approach:</strong></p>
              <ul>
                <li>Comprehensive evidence synthesis across 100+ APIs</li>
                <li>Multi-hop reasoning to discover hidden connections</li>
                <li>Automated literature mining and analysis</li>
              </ul>
              <p><strong>Result:</strong> Complete technical assessment in 5 days, saving 3 months of manual research.</p>
              <p><a href="https://byoticabio.ai#results" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Learn More</a></p>
              <p>Would you like to discuss how we can help with your next investment evaluation?</p>
              <p>Best regards,<br>The ByoticaBio.ai Team</p>
            </div>
          </body>
        </html>
      `,
    },
    // ... similar for other segments
  },
  
  // Email 3: Day 3 value proposition
  day3: {
    vc: {
      subject: 'The Hidden Costs of Slow Due Diligence',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0066cc;">Speed Matters in Biotech Investments</h2>
              <p>Hello,</p>
              <p>Time is critical when evaluating biotech opportunities. Every day of delay can mean:</p>
              <ul>
                <li>❌ Missed competitive advantages</li>
                <li>❌ Lost deals to faster-moving investors</li>
                <li>❌ Increased risk from incomplete information</li>
              </ul>
              <p><strong>Our Solution:</strong></p>
              <p>We deliver comprehensive due diligence in 5 days instead of 2-3 months, giving you:</p>
              <ul>
                <li>✅ Faster decision-making</li>
                <li>✅ Competitive advantage</li>
                <li>✅ Complete scientific validation</li>
              </ul>
              <p><a href="https://byoticabio.ai#contact" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Schedule a Call</a></p>
              <p>Best regards,<br>The ByoticaBio.ai Team</p>
            </div>
          </body>
        </html>
      `,
    },
    // ... similar for other segments
  },
  
  // Email 4: Day 7 call to action
  day7: {
    default: {
      subject: 'Let\'s Discuss Your Project',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0066cc;">Ready to Accelerate Your Biotech Decisions?</h2>
              <p>Hello,</p>
              <p>It's been a week since you reached out. I'd love to learn more about your project and see how we can help.</p>
              <p><strong>What happens next:</strong></p>
              <ol>
                <li>15-minute discovery call to understand your needs</li>
                <li>Customized proposal with timeline and pricing</li>
                <li>Fast turnaround - start within days</li>
              </ol>
              <p><a href="[CALENDAR_LINK]" style="background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Schedule Your Free Consultation</a></p>
              <p>Or simply reply to this email and we'll set up a time.</p>
              <p>Best regards,<br>The ByoticaBio.ai Team</p>
            </div>
          </body>
        </html>
      `,
    },
  },
};

export function getEmailTemplate(type, segment = 'default') {
  if (emailTemplates[type] && emailTemplates[type][segment]) {
    return emailTemplates[type][segment];
  }
  if (emailTemplates[type] && emailTemplates[type].default) {
    return emailTemplates[type].default;
  }
  // Fallback
  return {
    subject: 'Thank You for Your Interest',
    html: '<p>Thank you for reaching out. We will contact you soon.</p>',
  };
}
```

### Step 4: Update Lead Capture to Send Emails

Update `packages/web-app/src/utils/leadCapture.js`:

```javascript
import sgMail from '@sendgrid/mail';
import { getEmailTemplate } from './emailTemplates';

// Initialize SendGrid
if (import.meta.env.VITE_SENDGRID_API_KEY) {
  sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);
}

// ... existing code ...

async function sendEmailNotification(formType, formData) {
  // Send to admin
  const adminEmail = {
    to: 'contact@byoticabio.ai',
    from: import.meta.env.VITE_SENDGRID_FROM_EMAIL || 'noreply@byoticabio.ai',
    subject: `New ${formType} lead from ByoticaBio.ai`,
    html: formatAdminEmail(formData, formType),
  };

  try {
    await sgMail.send(adminEmail);
  } catch (error) {
    console.error('Error sending admin email:', error);
  }

  // Send welcome email to lead
  const segment = identifyMarketSegment(formData);
  const template = getEmailTemplate('welcome', segment);
  
  const welcomeEmail = {
    to: formData.email,
    from: import.meta.env.VITE_SENDGRID_FROM_EMAIL || 'noreply@byoticabio.ai',
    subject: template.subject,
    html: template.html,
  };

  try {
    await sgMail.send(welcomeEmail);
    
    // Schedule follow-up emails (use a job queue or external service)
    scheduleFollowupEmails(formData.email, segment);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}

function scheduleFollowupEmails(email, segment) {
  // Store email scheduling in database/CRM
  // For now, log it - implement with actual scheduler
  console.log(`Schedule follow-up emails for ${email}, segment: ${segment}`);
  
  // Use a service like:
  // - Zapier to schedule delayed emails
  // - Cron job with database
  // - External email service (Mailchimp, HubSpot) with automation
}
```

### Step 5: Environment Variables

Add to `.env`:

```env
VITE_SENDGRID_API_KEY=SG.your_api_key_here
VITE_SENDGRID_FROM_EMAIL=noreply@byoticabio.ai
```

### Step 6: Set Up Follow-up Email Scheduling

**Option A: Use Zapier (Easiest)**

1. Connect form submission to Zapier webhook
2. Zapier triggers delayed emails at Day 1, Day 3, Day 7
3. Use Gmail/Outlook integration or SendGrid in Zapier

**Option B: Use HubSpot (Best)**

1. Set up HubSpot free account
2. Create automated workflows
3. Trigger emails based on lead properties
4. Full CRM integration included

**Option C: Build Custom (Advanced)**

Use a job queue (Bull, Agenda.js) to schedule delayed emails.

## Quick Start: Minimal Implementation

For immediate implementation without external services:

1. **Send immediate welcome email** using SendGrid (implemented above)
2. **Manual follow-ups** - Sales team reviews leads daily and sends personalized follow-ups
3. **Add to CRM** - Export leads to CSV, import to HubSpot/Salesforce manually

This gives you 80% of the value with 20% of the effort.

## Full Implementation Checklist

- [ ] Set up SendGrid account
- [ ] Verify domain for better deliverability
- [ ] Install SendGrid SDK
- [ ] Create email templates
- [ ] Update lead capture to send welcome email
- [ ] Test email delivery
- [ ] Set up follow-up email scheduling (Zapier/HubSpot)
- [ ] Create Day 1, Day 3, Day 7 email templates
- [ ] Test complete sequence
- [ ] Monitor email open/click rates
- [ ] Optimize based on performance

## Next Steps

1. **Implement welcome email** (1-2 days)
2. **Set up Zapier/HubSpot for follow-ups** (2-3 days)
3. **Create email templates** (1 day)
4. **Test and optimize** (ongoing)

---

**Priority**: High - This is the missing piece of the marketing funnel!

