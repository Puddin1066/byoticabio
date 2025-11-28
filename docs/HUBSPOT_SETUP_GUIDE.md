# HubSpot Free Tier Setup Guide

## Quick Answer: YES - Use HubSpot Free Tier for $100 Budget

**Why**: HubSpot Free provides everything you need for $0:
- ✅ CRM (1,000 contacts)
- ✅ Email marketing (2,000 emails/month)
- ✅ Marketing automation (5 workflows)
- ✅ Form builder
- ✅ Analytics

**Budget Savings**: $0/month vs $50-100/month for other CRMs

## Step-by-Step Setup

### Step 1: Create HubSpot Account

1. Go to https://hubspot.com
2. Click "Get Started Free"
3. Fill out account information
4. Verify email address
5. Complete onboarding wizard

**Time**: 5 minutes
**Cost**: $0

### Step 2: Get API Credentials

1. Log into HubSpot
2. Go to **Settings** (gear icon, top right)
3. Navigate to **Integrations** → **Private Apps**
4. Click **Create a private app**
5. Name it: "ByoticaBio Landing Page"
6. Under **Scopes**, select:
   - `crm.objects.contacts.write`
   - `crm.objects.contacts.read`
   - `content` (for forms)
   - `automation` (for workflows)
7. Click **Create app**
8. Copy the **Access Token** (you'll only see it once!)

**Time**: 5 minutes

### Step 3: Get Portal ID

1. In HubSpot, go to **Settings** → **Account Setup** → **Account Defaults**
2. Copy your **Hub ID** (looks like: `12345678`)

**Time**: 1 minute

### Step 4: Install HubSpot SDK

```bash
cd packages/web-app
pnpm add @hubspot/api-client
```

**Time**: 1 minute

### Step 5: Add Environment Variables

Create or update `.env` file in `packages/web-app/`:

```env
VITE_HUBSPOT_API_KEY=your_access_token_here
VITE_HUBSPOT_PORTAL_ID=your_hub_id_here
```

**Important**: 
- Don't commit this file to git
- Add `.env` to `.gitignore`
- Use environment variables in production

**Time**: 2 minutes

### Step 6: Add HubSpot Tracking Script

**File**: `packages/web-app/index.html`

Add before closing `</body>` tag:

```html
<!-- HubSpot Tracking Code -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/{{PORTAL_ID}}.js"></script>
```

Replace `{{PORTAL_ID}}` with your Hub ID (e.g., `12345678`).

**Time**: 1 minute

### Step 7: Verify Integration

1. Start dev server: `pnpm run dev`
2. Navigate to `/byoticabio`
3. Submit a test form
4. Check HubSpot → Contacts → All contacts
5. You should see the new contact!

**Time**: 5 minutes

## HubSpot Workflow Setup

### Workflow 1: Welcome Email Sequence

**Create in HubSpot**:

1. Go to **Automation** → **Workflows**
2. Click **Create workflow** → **Contact-based**
3. Name: "Landing Page Welcome Sequence"

**Enrollment Trigger**:
- Contact property: `consultation_requested` = `true`
- OR: Contact property: `demo_requested` = `true`

**Actions**:

1. **Send email** (Immediate)
   - Template: "Welcome - Thank You for Your Interest"
   - Subject: "Thanks for your interest in ByoticaBio.ai"

2. **Wait** (1 day)

3. **Send email** (Day 1)
   - Template: "Case Study Email"
   - Personalize by `market_segment`
   - Subject: "How we help {{market_segment}} companies"

4. **Wait** (3 days)

5. **Send email** (Day 3)
   - Template: "Use Case Example"
   - Subject: "Quick win: [Use Case]"

6. **Wait** (7 days)

7. **Send email** (Day 7)
   - Template: "Schedule Consultation"
   - Include calendar booking link
   - Subject: "Ready to accelerate your biotech decisions?"

**Time**: 20 minutes

### Workflow 2: Segment-Based Lists

**Create Lists in HubSpot**:

1. Go to **Contacts** → **Lists**
2. Create lists:
   - "VC Leads"
   - "Biotech Leads"
   - "Pharma Leads"
   - "Entrepreneur Leads"
   - "General Leads"

**Create Workflow to Add to Lists**:

1. **Trigger**: Contact created
2. **IF** `market_segment` = `vc` → Add to "VC Leads"
3. **IF** `market_segment` = `biotech` → Add to "Biotech Leads"
4. (Repeat for each segment)

**Time**: 15 minutes

### Workflow 3: Lead Scoring

**Create Lead Scoring**:

1. Go to **Settings** → **Properties** → **Contact Properties**
2. Create property: `lead_score` (number)
3. Go to **Automation** → **Lead Scoring**
4. Create scoring rules:

**Positive Points**:
- Corporate email domain: +10
- Known company name: +20
- Project type selected: +15
- Message > 50 words: +10
- Source = LinkedIn: +10

**Negative Points**:
- Personal email: -5
- No company: -10

**Time**: 15 minutes

## Email Templates

### Template 1: Welcome Email

**Subject**: Thanks for your interest in ByoticaBio.ai

**Body**:
```
Hi {{firstname}},

Thank you for reaching out! We're excited to help accelerate your biotech decisions.

What happens next:
1. Our team will review your inquiry within 24 hours
2. We'll send you a relevant case study based on your needs
3. We'll schedule a free consultation to discuss your project

In the meantime, check out how we've helped {{market_segment}} companies:
[Link to case studies]

Best regards,
The ByoticaBio.ai Team
```

### Template 2: Segment-Specific Case Study

**Subject**: How we help {{market_segment}} companies like yours

**Body** (Customize by segment):
```
Hi {{firstname}},

Here's a case study showing how we help {{market_segment}} companies:

[Insert relevant case study based on market_segment]

- VC → Due diligence example
- Biotech → Drug discovery example
- Pharma → Competitive intelligence example
- Entrepreneur → Market validation example

Want to see more? [Schedule a call]

Best,
ByoticaBio.ai Team
```

## Custom Properties Setup

**Create in HubSpot**:

1. Go to **Settings** → **Properties** → **Contact Properties**
2. Click **Create property**
3. Create these properties:

| Property Name | Type | Label | Purpose |
|--------------|------|-------|---------|
| `market_segment` | Single-line text | Market Segment | VC, biotech, pharma, etc. |
| `project_type` | Single-line text | Project Type | Service interest |
| `form_type` | Single-line text | Form Type | Contact or demo |
| `consultation_requested` | Checkbox | Consultation Requested | Trigger workflow |
| `demo_requested` | Checkbox | Demo Requested | Trigger workflow |
| `lead_source` | Single-line text | Lead Source | Where they came from |

**Time**: 10 minutes

## Testing

### Test Form Submission

1. Submit test form on `/byoticabio`
2. Check HubSpot → Contacts
3. Verify:
   - ✅ Contact created
   - ✅ Properties populated
   - ✅ Added to correct list
   - ✅ Workflow triggered

### Test Email Sequence

1. Submit form with your email
2. Check email inbox
3. Verify:
   - ✅ Welcome email received immediately
   - ✅ Day 1 email received (after 1 day)
   - ✅ Emails personalized correctly

## $100 Budget Breakdown

### Recommended Allocation:

| Service | Cost | Purpose |
|---------|------|---------|
| **HubSpot Free** | $0 | CRM + Email + Automation |
| **LinkedIn Ads** | $70/month | Lead generation ($2.33/day) |
| **SendGrid Basic** | $15/month | Backup email delivery |
| **Buffer Free** | $0 | LinkedIn scheduling |
| **Total** | **$85/month** | ✅ Under budget |

### Alternative (Organic Focus):

| Service | Cost | Purpose |
|---------|------|---------|
| **HubSpot Free** | $0 | CRM + Email |
| **LinkedIn Organic** | $0 | Manual posting |
| **SendGrid** | $15/month | Email delivery |
| **Total** | **$15/month** | ✅ Save $85 |

## HubSpot Free Tier Limits

### What You Get:
- ✅ 1,000 contacts
- ✅ 2,000 marketing emails/month
- ✅ 5 workflows
- ✅ 5 email templates
- ✅ Unlimited forms
- ✅ Basic analytics
- ✅ Free forever

### When to Upgrade:
- Need >1,000 contacts → Growth plan ($20/month)
- Need >2,000 emails/month → Growth plan ($20/month)
- Need >5 workflows → Growth plan ($20/month)

**For $100 budget**: Free tier is perfect! You'll upgrade when you're successful.

## Troubleshooting

### Contact Not Created

**Check**:
1. API key is correct in `.env`
2. HubSpot client initialized (check browser console)
3. Form submission succeeded (check network tab)
4. API permissions set correctly in HubSpot

**Fix**:
- Verify API key in HubSpot Settings
- Check browser console for errors
- Test API directly with curl

### Email Not Sending

**Check**:
1. Workflow is active
2. Enrollment trigger matches
3. Email template exists
4. Contact has email address

**Fix**:
- Test workflow manually
- Check workflow enrollment
- Verify email templates

### Lists Not Working

**Check**:
1. Lists exist in HubSpot
2. List names match exactly
3. Contact has required properties

**Fix**:
- Create lists manually if needed
- Verify property values match

## Next Steps

1. ✅ Complete HubSpot account setup
2. ✅ Get API credentials
3. ✅ Install SDK and configure
4. ✅ Set up workflows
5. ✅ Create email templates
6. ✅ Test end-to-end
7. ✅ Launch!

## Support

- **HubSpot Help**: https://knowledge.hubspot.com
- **API Docs**: https://developers.hubspot.com/docs/api/overview
- **Community**: https://community.hubspot.com

---

**Total Setup Time**: ~1 hour  
**Total Cost**: $0 for HubSpot ✅  
**Monthly Budget**: $85-100 for ads/tools

