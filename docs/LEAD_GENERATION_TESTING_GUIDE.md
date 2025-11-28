# Lead Generation Testing Guide

## Quick Start

This guide explains how to test and validate lead generation from the `/byoticabio` landing page.

## What's Been Implemented

### 1. Analytics Tracking System
- **Location**: `packages/web-app/src/utils/analytics.js`
- **Features**:
  - Page view tracking
  - CTA click tracking
  - Form interaction tracking
  - Scroll depth tracking
  - Section view tracking
  - Event storage in localStorage (for testing)

### 2. Lead Capture System
- **Location**: `packages/web-app/src/utils/leadCapture.js`
- **Features**:
  - Form submission handling
  - Lead data sanitization
  - Market segment identification (VC, biotech, pharma, entrepreneur)
  - Lead export to CSV
  - Mock email notifications

### 3. Testing Dashboard
- **Location**: `packages/web-app/src/components/TestingDashboard.vue`
- **Features**:
  - Real-time analytics summary
  - Lead list view
  - Market segment breakdown
  - Data export (CSV and JSON)
  - Only visible in development mode

## How to Test

### Step 1: Start the Development Server

```bash
cd packages/web-app
pnpm run dev
```

### Step 2: Navigate to the Landing Page

Open your browser and go to:
```
http://localhost:3000/byoticabio
```

### Step 3: View the Testing Dashboard

In development mode, you'll see a **Testing Dashboard** in the bottom-right corner showing:
- Page views
- Total leads
- CTA clicks
- Conversion rate
- Leads by market segment
- Recent leads

### Step 4: Simulate User Interactions

1. **Page Views**: Just loading the page tracks a page view
2. **CTA Clicks**: Click any "Free Consultation" or "Schedule Demo" button
3. **Form Interactions**: 
   - Open the contact form
   - Fill out form fields
   - Submit the form
4. **Scroll Tracking**: Scroll through the page to trigger scroll depth tracking
5. **Section Views**: Scroll to different sections to track section views

### Step 5: Check Analytics Data

All data is stored in browser localStorage. You can:

1. **View in Testing Dashboard**: See real-time summary
2. **Export CSV**: Click "Export CSV" to download leads as CSV
3. **Export JSON**: Click "Export JSON" to download all analytics data
4. **Check Console**: Open browser console to see event logs

## Testing Scenarios

### Scenario 1: VC Investor Lead

**Test Data**:
- Name: "John Smith"
- Email: "john@venturecapitalpartners.com"
- Company: "Venture Capital Partners"
- Project Type: "Due Diligence"
- Message: "Interested in due diligence services for biotech investment evaluation"

**Expected Result**:
- Lead captured with market segment: "vc"
- Analytics shows form submission event
- Lead appears in testing dashboard

### Scenario 2: Biotech Company Lead

**Test Data**:
- Name: "Jane Doe"
- Email: "jane@biotechtherapeutics.com"
- Company: "BioTech Therapeutics"
- Project Type: "Drug Discovery Support"
- Message: "Need help with target identification and validation"

**Expected Result**:
- Lead captured with market segment: "biotech"
- Analytics tracks form interactions
- Lead exportable to CSV

### Scenario 3: Pharma Company Lead

**Test Data**:
- Name: "Bob Johnson"
- Email: "bob.johnson@bigpharma.com"
- Company: "Big Pharma Inc"
- Project Type: "Competitive Intelligence"
- Message: "Looking for competitive landscape analysis in oncology"

**Expected Result**:
- Lead captured with market segment: "pharma"
- Full form tracking recorded
- Lead appears in segment breakdown

### Scenario 4: Entrepreneur Lead

**Test Data**:
- Name: "Alice Startup"
- Email: "alice@startupemail.com"
- Company: "StartupCo"
- Project Type: "Competitive Intelligence"
- Message: "Early stage startup looking to validate market opportunity"

**Expected Result**:
- Lead captured with market segment: "entrepreneur"
- Analytics shows all interactions
- Lead exportable for analysis

## Data Access

### View Stored Data

**In Browser Console**:
```javascript
// View all leads
JSON.parse(localStorage.getItem('bte_leads') || '[]')

// View all analytics events
JSON.parse(localStorage.getItem('bte_analytics_events') || '[]')
```

### Export Data

1. **Using Testing Dashboard**:
   - Click "Export CSV" for leads
   - Click "Export JSON" for all data

2. **Programmatically**:
```javascript
// In browser console
import { exportLeads, exportAnalyticsEvents } from './utils/analytics'
console.log(exportLeads())
console.log(exportAnalyticsEvents())
```

### Clear Data

**Using Testing Dashboard**:
- Click "Clear" button
- Confirm deletion

**Programmatically**:
```javascript
// In browser console
import { clearStoredData } from './utils/analytics'
clearStoredData()
```

## Key Metrics to Monitor

### Primary Metrics
1. **Page Views**: Total number of page loads
2. **Leads**: Total form submissions
3. **Conversion Rate**: (Leads / Page Views) × 100
4. **CTA Click Rate**: CTA clicks / Page views

### Engagement Metrics
1. **Form Open Rate**: Form opens / Page views
2. **Form Completion Rate**: Form submissions / Form opens
3. **Average Scroll Depth**: How far users scroll
4. **Time on Page**: Average time spent

### Market Segmentation
1. **Leads by Segment**: VC, biotech, pharma, entrepreneur, unknown
2. **Segment Conversion Rates**: Conversion rate per market segment
3. **Segment Engagement**: Which segments engage most

## Validation Checklist

Use this checklist to validate the testing system:

- [ ] Page view tracking works
- [ ] CTA clicks are tracked
- [ ] Form opens are tracked
- [ ] Form field interactions are tracked
- [ ] Form submissions are captured
- [ ] Market segments are identified correctly
- [ ] Lead data is stored in localStorage
- [ ] Testing dashboard displays data correctly
- [ ] CSV export works
- [ ] JSON export works
- [ ] Scroll tracking works
- [ ] Section view tracking works

## Production Setup

When ready for production, update:

### 1. Analytics Configuration

**File**: `packages/web-app/src/utils/analytics.js`

Add Google Analytics 4:
```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Lead Capture API

**File**: `packages/web-app/src/utils/leadCapture.js`

Replace mock endpoint:
```javascript
const LEAD_API_ENDPOINT = 'https://api.byoticabio.ai/leads'
```

### 3. Email Notifications

**File**: `packages/web-app/src/utils/leadCapture.js`

Implement email service (SendGrid, Mailchimp, etc.):
```javascript
async function sendEmailNotification(formType, formData) {
  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'contact@byoticabio.ai',
      subject: `New ${formType} lead`,
      body: formatEmailBody(formData),
    }),
  })
}
```

### 4. Environment Variables

Create `.env` file:
```
VITE_ANALYTICS_ENDPOINT=https://api.byoticabio.ai/analytics
VITE_LEAD_API_ENDPOINT=https://api.byoticabio.ai/leads
VITE_ENABLE_EMAIL_NOTIFICATIONS=true
```

## Troubleshooting

### Testing Dashboard Not Visible

**Issue**: Dashboard doesn't appear in bottom-right corner

**Solution**: 
- Ensure you're in development mode (`pnpm run dev`)
- Check browser console for errors
- Verify `import.meta.env.DEV` is true

### Events Not Tracking

**Issue**: No events appear in analytics

**Solution**:
- Open browser console to check for errors
- Verify localStorage is enabled
- Check that tracking functions are called

### Leads Not Saving

**Issue**: Form submission doesn't save lead

**Solution**:
- Check browser console for errors
- Verify form validation passes
- Check localStorage quota (should be fine for testing)

### Market Segment Not Identified

**Issue**: All leads show "unknown" segment

**Solution**:
- Check email domain and company name in form data
- Verify message content includes keywords
- Review `identifyMarketSegment` function logic

## Next Steps

1. **Run Tests**: Complete all testing scenarios
2. **Gather Data**: Collect at least 10-20 test leads
3. **Analyze Results**: Review conversion rates and segment breakdown
4. **Optimize**: Make improvements based on test data
5. **Deploy**: Move to production with proper API endpoints
6. **Monitor**: Set up ongoing monitoring and reporting

## Support

For questions or issues:
- Review the testing plan: `docs/LEAD_GENERATION_TESTING_PLAN.md`
- Check code comments in analytics/lead capture utilities
- Review browser console for error messages

---

**Last Updated**: 2024  
**Version**: 1.0

