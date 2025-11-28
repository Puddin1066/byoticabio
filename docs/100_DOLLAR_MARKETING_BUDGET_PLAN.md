# $100/Month Marketing Budget Plan for ByoticaBio.ai

## Budget Allocation

### Total Budget: $100/month

| Service | Cost | Purpose |
|---------|------|---------|
| **HubSpot Free Tier** | $0 | CRM + Email Marketing + Automation |
| **LinkedIn Ads** | $70/month | Primary lead generation ($2.33/day) |
| **Domain Email (SendGrid)** | $15/month | Professional email delivery |
| **Buffer or Similar** | $15/month | Social media scheduling (optional) |
| **Total** | **$100/month** | |

**Alternative Allocation (No Paid Social)**:
- HubSpot Free: $0
- LinkedIn Organic Only: $0
- Email Service: $15/month
- SEO Tools: $0-15/month (free tiers available)
- **Savings**: $85/month for other uses

## Recommended: HubSpot Free Tier SDK Integration

### ✅ YES - Use HubSpot Free Tier

**Why HubSpot Free is Perfect for $100 Budget**:

1. **Complete CRM** - Free forever
   - Up to 1,000 contacts
   - Unlimited users
   - Lead management
   - Deal tracking
   - Email templates

2. **Email Marketing** - Built-in
   - 2,000 marketing emails/month (free)
   - Email automation workflows
   - A/B testing
   - Analytics

3. **Marketing Automation** - Included
   - Workflow automation
   - Lead nurturing sequences
   - Email drip campaigns
   - Lead scoring (limited)

4. **Form Builder** - Can replace our forms
   - Unlimited forms
   - Contact capture
   - Automatic CRM creation
   - Spam filtering

5. **Analytics & Reporting**
   - Contact activity tracking
   - Email performance
   - Website visitor tracking
   - Sales pipeline reporting

**Limits of Free Tier**:
- 1,000 contacts (enough to start)
- 2,000 marketing emails/month (plenty for nurturing)
- 5 email templates
- 5 workflows
- Limited custom properties

**Cost**: $0/month ✅

## HubSpot Integration Implementation

### Step 1: Set Up HubSpot Account

1. Sign up at https://hubspot.com (free forever)
2. Complete account setup
3. Get your Hub ID and API key

### Step 2: Install HubSpot SDK

```bash
cd packages/web-app
pnpm add @hubspot/api-client
```

### Step 3: Create HubSpot Integration

**File**: `packages/web-app/src/utils/hubspot.js`

```javascript
/**
 * HubSpot Integration for Lead Capture and CRM
 * Free Tier: 1,000 contacts, 2,000 emails/month
 */

import { Client } from '@hubspot/api-client';

// Initialize HubSpot client
const hubspotClient = new Client({
  accessToken: import.meta.env.VITE_HUBSPOT_API_KEY,
});

const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID;

/**
 * Create contact in HubSpot from form submission
 * @param {Object} formData - Lead form data
 * @param {string} formType - Type of form ('contact' or 'demo')
 * @returns {Promise<Object>} Created contact
 */
export async function createHubSpotContact(formData, formType) {
  try {
    const properties = {
      email: formData.email,
      firstname: formData.name?.split(' ')[0] || formData.name,
      lastname: formData.name?.split(' ').slice(1).join(' ') || '',
      company: formData.company || '',
      phone: formData.phone || '',
      hs_lead_status: 'NEW',
      lead_source: 'ByoticaBio.ai Landing Page',
      market_segment: identifyMarketSegment(formData),
      project_type: formData.projectType || '',
      message: formData.message || '',
      form_type: formType,
    };

    const contactObj = {
      properties,
    };

    // Create contact
    const response = await hubspotClient.crm.contacts.basicApi.create(contactObj);
    
    // Add to appropriate list based on segment
    await addContactToList(response.id, properties.market_segment);
    
    // Trigger workflow based on form type
    await triggerWorkflow(response.id, formType, properties.market_segment);
    
    return response;
  } catch (error) {
    // Handle duplicate contact error (already exists)
    if (error.code === 409) {
      console.log('Contact already exists, updating instead');
      return await updateHubSpotContact(formData.email, formData, formType);
    }
    console.error('HubSpot contact creation error:', error);
    throw error;
  }
}

/**
 * Update existing contact
 */
async function updateHubSpotContact(email, formData, formType) {
  try {
    // Find contact by email
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      query: email,
      limit: 1,
    });

    if (searchResponse.results && searchResponse.results.length > 0) {
      const contactId = searchResponse.results[0].id;
      
      const properties = {
        project_type: formData.projectType || '',
        message: formData.message || '',
        form_type: formType,
        hs_lead_status: 'OPEN',
      };

      await hubspotClient.crm.contacts.basicApi.update(contactId, { properties });
      return { id: contactId };
    }
  } catch (error) {
    console.error('HubSpot contact update error:', error);
    throw error;
  }
}

/**
 * Add contact to segment list
 */
async function addContactToList(contactId, segment) {
  try {
    // Create list names based on segments
    const listNames = {
      vc: 'VC Leads',
      biotech: 'Biotech Leads',
      pharma: 'Pharma Leads',
      entrepreneur: 'Entrepreneur Leads',
      unknown: 'General Leads',
    };

    const listName = listNames[segment] || 'General Leads';
    
    // Search for list by name
    const lists = await hubspotClient.crm.lists.getAll();
    const targetList = lists.results.find(list => list.name === listName);
    
    if (targetList) {
      await hubspotClient.crm.lists.addContactsToList(targetList.listId, {
        vids: [contactId],
      });
    }
  } catch (error) {
    console.error('Error adding contact to list:', error);
    // Non-critical, continue
  }
}

/**
 * Trigger automated workflow
 */
async function triggerWorkflow(contactId, formType, segment) {
  try {
    // HubSpot workflows are triggered by properties or enrollment
    // Set property that triggers workflow
    const workflowProperty = formType === 'demo' 
      ? 'demo_requested' 
      : 'consultation_requested';
    
    await hubspotClient.crm.contacts.basicApi.update(contactId, {
      properties: {
        [workflowProperty]: 'true',
        segment: segment,
      },
    });
  } catch (error) {
    console.error('Error triggering workflow:', error);
    // Non-critical
  }
}

/**
 * Identify market segment (reuse from analytics)
 */
function identifyMarketSegment(formData) {
  const email = (formData.email || '').toLowerCase();
  const company = (formData.company || '').toLowerCase();
  const message = (formData.message || '').toLowerCase();
  const projectType = (formData.projectType || '').toLowerCase();

  // VC indicators
  const vcKeywords = ['capital', 'partners', 'ventures', 'investments', 'fund', 'vc'];
  if (vcKeywords.some(keyword => email.includes(keyword) || company.includes(keyword))) {
    return 'vc';
  }
  if (projectType === 'due-diligence' && message.includes('investment')) {
    return 'vc';
  }

  // Pharma indicators
  const pharmaKeywords = ['pharma', 'pharmaceutical', 'pharmaceuticals', 'biopharma'];
  if (pharmaKeywords.some(keyword => email.includes(keyword) || company.includes(keyword))) {
    return 'pharma';
  }

  // Biotech indicators
  const biotechKeywords = ['biotech', 'bio', 'therapeutics', 'genomics', 'biologics'];
  if (biotechKeywords.some(keyword => email.includes(keyword) || company.includes(keyword))) {
    return 'biotech';
  }

  // Entrepreneur indicators
  if (projectType === 'competitive-intel' || message.includes('startup') || message.includes('validate')) {
    return 'entrepreneur';
  }

  return 'unknown';
}

/**
 * Get contact by email
 */
export async function getHubSpotContact(email) {
  try {
    const response = await hubspotClient.crm.contacts.searchApi.doSearch({
      query: email,
      limit: 1,
    });
    
    return response.results && response.results.length > 0 ? response.results[0] : null;
  } catch (error) {
    console.error('Error fetching HubSpot contact:', error);
    return null;
  }
}

/**
 * Track page view in HubSpot
 */
export function trackHubSpotPageView() {
  if (typeof window === 'undefined' || !window.hubspot) {
    return;
  }
  
  try {
    window.hubspot.page();
  } catch (error) {
    console.error('Error tracking HubSpot page view:', error);
  }
}

/**
 * Track form submission in HubSpot
 */
export function trackHubSpotFormSubmit() {
  if (typeof window === 'undefined' || !window.hubspot) {
    return;
  }
  
  try {
    window.hubspot.track('Form Submitted', {
      form_type: 'Contact Form',
    });
  } catch (error) {
    console.error('Error tracking HubSpot form submission:', error);
  }
}
```

### Step 4: Update Lead Capture to Use HubSpot

**File**: `packages/web-app/src/utils/leadCapture.js`

Add HubSpot integration:

```javascript
import { createHubSpotContact } from './hubspot';

export async function submitLead(formType, formData) {
  try {
    // ... existing validation ...

    // Create contact in HubSpot
    try {
      await createHubSpotContact(sanitizedData, formType);
      console.log('Lead created in HubSpot CRM');
    } catch (hubspotError) {
      console.error('HubSpot error (non-critical):', hubspotError);
      // Continue even if HubSpot fails - still store locally
    }

    // ... rest of existing code ...
  } catch (error) {
    // ... error handling ...
  }
}
```

### Step 5: Add HubSpot Tracking Script

**File**: `packages/web-app/index.html`

Add HubSpot tracking script:

```html
<!-- HubSpot Tracking Code -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/{{PORTAL_ID}}.js"></script>
```

### Step 6: Environment Variables

**File**: `.env`

```env
VITE_HUBSPOT_API_KEY=your_api_key_here
VITE_HUBSPOT_PORTAL_ID=your_portal_id_here
```

## HubSpot Workflows Setup

### Workflow 1: Welcome Email Sequence

**Trigger**: New contact created from landing page

**Actions**:
1. Send welcome email immediately
2. Wait 1 day
3. Send case study email (segment-specific)
4. Wait 3 days
5. Send use case example
6. Wait 7 days
7. Send calendar booking link

**Cost**: $0 (2,000 free emails/month covers this)

### Workflow 2: Lead Scoring

**Rules**:
- +10 points: Corporate email domain
- +20 points: Known VC/Biotech/Pharma company
- +15 points: Specific project type selected
- +10 points: Detailed message (>50 words)
- +10 points: Came from LinkedIn/referral

**Auto-assignment**: High score leads → Sales team

### Workflow 3: Demo Request Follow-up

**Trigger**: Form type = "demo"

**Actions**:
1. Send demo confirmation email
2. Create deal in pipeline
3. Assign to sales team
4. Send calendar link

## $100 Budget Breakdown

### Recommended Allocation

**Option 1: LinkedIn Focus** ($100/month)
- HubSpot Free: $0 (CRM + Email)
- LinkedIn Ads: $70/month ($2.33/day, ~20 leads/month)
- SendGrid Basic: $15/month (backup email delivery)
- Buffer Free: $0 (LinkedIn scheduling)
- **Total**: $85/month (save $15 for flexibility)

**Option 2: Organic Focus** ($15/month)
- HubSpot Free: $0 (CRM + Email)
- LinkedIn Organic: $0 (manual posting)
- SendGrid Basic: $15/month
- **Total**: $15/month (save $85)

**Option 3: Balanced** ($100/month)
- HubSpot Free: $0
- LinkedIn Ads: $50/month (lower spend)
- Content Tools: $20/month (Grammarly, Canva)
- SendGrid: $15/month
- Buffer: $15/month
- **Total**: $100/month

## Implementation Steps

### Week 1: HubSpot Setup

1. ✅ Create HubSpot account (free)
2. ✅ Get API key and Portal ID
3. ✅ Install HubSpot SDK
4. ✅ Integrate with form submissions
5. ✅ Set up email workflows
6. ✅ Test end-to-end flow

### Week 2: Email Sequences

1. ✅ Create email templates in HubSpot
2. ✅ Set up 4-email nurture sequence
3. ✅ Configure segment-specific messaging
4. ✅ Test email delivery
5. ✅ Launch automation

### Week 3: LinkedIn Setup

1. ✅ Create LinkedIn Company Page
2. ✅ Install HubSpot pixel
3. ✅ Launch $70/month ad campaign
4. ✅ Create content calendar
5. ✅ Start organic posting

## HubSpot Free Tier Limits & Workarounds

### Limits:
- 1,000 contacts
- 2,000 marketing emails/month
- 5 workflows
- 5 email templates

### Workarounds:

**1,000 Contact Limit**:
- Export old/inactive contacts monthly
- Focus on quality over quantity
- Upgrade only when you hit limit (starts at $20/month)

**2,000 Email Limit**:
- Use for nurturing sequences only
- Transactional emails (confirmations) don't count
- Plenty for 50-100 leads/month

**5 Workflow Limit**:
- Combine similar workflows
- Use one workflow with branches
- Prioritize: Welcome, Demo, Nurture, Follow-up, Re-engagement

**5 Template Limit**:
- Create versatile templates
- Use personalization tokens
- Reuse templates with dynamic content

## Metrics to Track

### HubSpot Analytics (Free)

**Email Performance**:
- Open rate (target: 20-30%)
- Click rate (target: 3-7%)
- Unsubscribe rate (target: <0.5%)

**Contact Activity**:
- Contacts created per month
- Contact-to-customer rate
- Average deal size

**Workflow Performance**:
- Contacts in workflows
- Completion rates
- Time to conversion

## When to Upgrade HubSpot

**Upgrade if**:
- Exceed 1,000 contacts (Growth: $20/month)
- Need more than 2,000 emails/month
- Need advanced automation
- Want custom reporting

**Stay Free if**:
- <1,000 contacts
- <2,000 emails/month
- Basic automation is enough

## Next Steps

1. **Sign up for HubSpot** (free): https://hubspot.com
2. **Get API credentials**: Settings → Integrations → Private Apps
3. **Install SDK**: `pnpm add @hubspot/api-client`
4. **Implement integration**: Use code above
5. **Set up workflows**: Create email sequences
6. **Launch**: Start capturing leads in HubSpot

---

**Total Cost**: $0 for HubSpot + $70-100/month for ads/tools = **Under budget** ✅

