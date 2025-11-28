# Lead Generation Testing Checklist

Use this checklist to systematically test the lead generation hypothesis for the `/byoticabio` landing page.

## Pre-Testing Setup

- [ ] Development server is running (`pnpm run dev` in `packages/web-app`)
- [ ] Landing page is accessible at `/byoticabio`
- [ ] Browser console is open to view tracking events
- [ ] Testing dashboard is visible (bottom-right corner in dev mode)
- [ ] Browser localStorage is enabled

## Basic Functionality Tests

### Page Loading
- [ ] Page loads without errors
- [ ] Page view is tracked in analytics
- [ ] Testing dashboard shows page view count incrementing

### Navigation
- [ ] All navigation links work
- [ ] Smooth scrolling to sections works
- [ ] Mobile menu works (if applicable)

### Visual Elements
- [ ] All images load correctly
- [ ] Knowledge graphs section loads data
- [ ] Stats display correctly (100+ APIs, etc.)
- [ ] All icons render properly

## CTA Button Tests

Test each CTA button location:

- [ ] Hero section "Get Free Consultation" button
- [ ] Hero section "See Live Demo" button
- [ ] Navigation "Free Consultation" button
- [ ] Services section CTA buttons (4 service cards)
- [ ] Results section "See How We Can Help" button
- [ ] Technology section "Schedule Live Demo" button
- [ ] Knowledge Graphs section "Get Free Consultation" button
- [ ] Footer "Free Consultation" button
- [ ] Footer "Schedule Demo" button

**Expected Result**: Each click should:
- Track CTA click event
- Open appropriate form modal
- Track form open event
- Appear in testing dashboard

## Form Functionality Tests

### Contact Form
- [ ] Form opens when CTA is clicked
- [ ] Form open event is tracked
- [ ] All fields are visible and functional
- [ ] Required fields are marked with asterisk
- [ ] Form validation works (name and email required)
- [ ] Email format validation works
- [ ] Form submission works with valid data
- [ ] Success message appears after submission
- [ ] Lead is saved to localStorage
- [ ] Lead appears in testing dashboard
- [ ] Form closes after successful submission
- [ ] Form resets after submission

### Demo Form
- [ ] Form opens when demo CTA is clicked
- [ ] Form open event is tracked
- [ ] All fields are visible and functional
- [ ] Form submission works
- [ ] Demo request is tracked separately
- [ ] Lead is saved with form_type: 'demo'

### Form Field Tracking
Test that field interactions are tracked:
- [ ] Focus on name field tracks event
- [ ] Focus on email field tracks event
- [ ] Focus on company field tracks event
- [ ] Focus on phone field tracks event
- [ ] Focus on message field tracks event
- [ ] Changes to fields track events

### Form Abandonment
- [ ] Start filling form but don't submit
- [ ] Close form modal
- [ ] Verify abandonment is tracked (if implemented)

## Analytics Tracking Tests

### Page Engagement
- [ ] Scroll to 25% - scroll event tracked
- [ ] Scroll to 50% - scroll event tracked
- [ ] Scroll to 75% - scroll event tracked
- [ ] Scroll to 100% - scroll event tracked

### Section Views
- [ ] View Services section - section view tracked
- [ ] View Results section - section view tracked
- [ ] View Technology section - section view tracked
- [ ] View Knowledge Graphs section - section view tracked
- [ ] View About section - section view tracked
- [ ] View Contact section - section view tracked

### Knowledge Graphs
- [ ] Knowledge graphs load successfully
- [ ] Stats display correctly (node types, predicates, edges)
- [ ] "View All" button works
- [ ] Knowledge graphs loaded event is tracked

## Lead Capture Tests

### Test Lead Scenarios

#### VC Investor Lead
- [ ] Fill form with VC company email
- [ ] Select "Due Diligence" as project type
- [ ] Include investment-related keywords in message
- [ ] Submit form
- [ ] Verify lead market segment is "vc"
- [ ] Verify lead appears in dashboard with correct segment

#### Biotech Company Lead
- [ ] Fill form with biotech company email/domain
- [ ] Select "Drug Discovery Support" as project type
- [ ] Include biotech-related keywords
- [ ] Submit form
- [ ] Verify lead market segment is "biotech"

#### Pharma Company Lead
- [ ] Fill form with pharma company email/domain
- [ ] Select "Competitive Intelligence" as project type
- [ ] Include pharma-related keywords
- [ ] Submit form
- [ ] Verify lead market segment is "pharma"

#### Entrepreneur/Startup Lead
- [ ] Fill form with generic email
- [ ] Select "Competitive Intelligence" as project type
- [ ] Include startup/validation keywords
- [ ] Submit form
- [ ] Verify lead market segment is "entrepreneur"

### Lead Data Validation
- [ ] Name is captured correctly
- [ ] Email is captured and validated
- [ ] Company is captured (if provided)
- [ ] Phone is captured (if provided)
- [ ] Project type is captured
- [ ] Message is captured
- [ ] Timestamp is recorded
- [ ] Source is recorded as "byoticabio_landing_page"
- [ ] UTM parameters are captured (if present)

## Data Export Tests

### CSV Export
- [ ] Click "Export CSV" in testing dashboard
- [ ] CSV file downloads
- [ ] CSV contains all lead data
- [ ] CSV is properly formatted
- [ ] CSV filename includes date

### JSON Export
- [ ] Click "Export JSON" in testing dashboard
- [ ] JSON file downloads
- [ ] JSON contains all analytics data
- [ ] JSON is properly formatted
- [ ] JSON includes summary, leads, and events

### Data Persistence
- [ ] Refresh page - data persists
- [ ] Close and reopen browser - data persists (localStorage)
- [ ] Data doesn't clear unexpectedly

## Testing Dashboard Tests

### Display
- [ ] Dashboard is visible in dev mode
- [ ] Dashboard shows current stats
- [ ] Stats update when events occur
- [ ] Refresh button works
- [ ] Dashboard is hidden in production mode

### Summary Stats
- [ ] Page views count is accurate
- [ ] Total leads count is accurate
- [ ] CTA clicks count is accurate
- [ ] Conversion rate is calculated correctly

### Market Segment Breakdown
- [ ] All segments are displayed
- [ ] Segment counts are accurate
- [ ] Unknown segment appears when applicable

### Recent Leads List
- [ ] Last 5 leads are displayed
- [ ] Lead information is complete
- [ ] Timestamps are formatted correctly
- [ ] Empty state shows when no leads

## Mobile Responsiveness Tests

- [ ] Page is responsive on mobile
- [ ] Forms work on mobile
- [ ] CTAs are accessible on mobile
- [ ] Testing dashboard works on mobile (if visible)
- [ ] Touch interactions work correctly

## Browser Compatibility Tests

Test in multiple browsers:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Verify**:
- [ ] Analytics tracking works in all browsers
- [ ] localStorage works in all browsers
- [ ] Forms submit correctly in all browsers
- [ ] Data persists across browser sessions

## Performance Tests

- [ ] Page loads quickly (< 3 seconds)
- [ ] Forms respond quickly
- [ ] Analytics events don't slow down page
- [ ] localStorage operations don't cause delays
- [ ] Testing dashboard doesn't impact performance

## Error Handling Tests

- [ ] Form submission with invalid email shows error
- [ ] Form submission with missing required fields shows error
- [ ] Network errors are handled gracefully
- [ ] API failures don't break the page
- [ ] localStorage quota exceeded is handled (if applicable)

## Data Validation Tests

### Email Validation
- [ ] Valid email formats are accepted
- [ ] Invalid email formats are rejected
- [ ] Email is converted to lowercase
- [ ] Email is trimmed of whitespace

### Data Sanitization
- [ ] Special characters in names are handled
- [ ] XSS attempts are sanitized
- [ ] SQL injection attempts are sanitized
- [ ] Very long inputs are truncated appropriately

## Integration Tests

### End-to-End Lead Flow
1. [ ] User visits page
2. [ ] Page view is tracked
3. [ ] User scrolls through page
4. [ ] Scroll events are tracked
5. [ ] User clicks CTA button
6. [ ] CTA click is tracked
7. [ ] Form opens
8. [ ] Form open is tracked
9. [ ] User fills out form
10. [ ] Field interactions are tracked
11. [ ] User submits form
12. [ ] Form submission is tracked
13. [ ] Lead is saved
14. [ ] Lead appears in dashboard
15. [ ] Lead can be exported

## Market Segment Identification Tests

Test market segment identification with various inputs:

### VC Identification
- [ ] Email domain: "@venturecapital.com"
- [ ] Company: "Venture Partners"
- [ ] Project type: "Due Diligence" + "investment" in message

### Biotech Identification
- [ ] Email domain: "@biotech.com"
- [ ] Company: "BioTech Therapeutics"
- [ ] Project type: "Drug Discovery Support"

### Pharma Identification
- [ ] Email domain: "@pharma.com"
- [ ] Company: "Big Pharma Inc"
- [ ] Project type: "Competitive Intelligence"

### Entrepreneur Identification
- [ ] Generic email: "@gmail.com"
- [ ] Project type: "Competitive Intelligence"
- [ ] Message contains "startup" or "validate"

## Conversion Funnel Tests

Test the complete conversion funnel:

1. **Awareness**: [ ] User lands on page
2. **Interest**: [ ] User scrolls through content
3. [ ] User views multiple sections
4. **Consideration**: [ ] User clicks CTA
5. [ ] User opens form
6. **Action**: [ ] User starts filling form
7. [ ] User completes form
8. [ ] User submits form
9. [ ] Lead is captured

**Verify**: Each step is tracked and appears in analytics

## Reporting Tests

### Weekly Report Data
- [ ] All data needed for weekly reports is available
- [ ] Traffic metrics can be extracted
- [ ] Lead metrics can be extracted
- [ ] Conversion metrics can be calculated
- [ ] Segment breakdown is available

### Monthly Report Data
- [ ] Trend data is available
- [ ] Growth metrics can be calculated
- [ ] Channel performance data is available
- [ ] Lead quality data is available

## Cleanup Tests

- [ ] Clear data button works
- [ ] Clear confirmation dialog appears
- [ ] Data is actually cleared
- [ ] New data can be added after clearing

## Production Readiness Checklist

Before deploying to production:

- [ ] Remove or disable testing dashboard
- [ ] Configure production analytics endpoint
- [ ] Configure production lead API endpoint
- [ ] Set up email notification service
- [ ] Test production endpoints
- [ ] Add privacy policy link
- [ ] Add terms of service link
- [ ] Configure CORS for production APIs
- [ ] Set up monitoring/alerting
- [ ] Test form submission in production environment
- [ ] Verify data persistence in production
- [ ] Test analytics in production

## Validation Criteria

The testing is successful when:

✅ All basic functionality tests pass  
✅ All form tests pass  
✅ All analytics tracking tests pass  
✅ Leads are captured correctly  
✅ Market segments are identified correctly  
✅ Data can be exported  
✅ Testing dashboard works  
✅ No critical errors occur  
✅ Performance is acceptable  

## Sign-Off

- [ ] All tests completed
- [ ] Issues documented
- [ ] Ready for production deployment
- [ ] Testing documentation updated

**Tested by**: _________________  
**Date**: _________________  
**Notes**: _________________

---

**Version**: 1.0  
**Last Updated**: 2024

