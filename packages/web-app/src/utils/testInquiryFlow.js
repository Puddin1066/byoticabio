/**
 * End-to-End Inquiry Processing Test
 * 
 * Tests the complete flow:
 * 1. Form submission
 * 2. Lead storage
 * 3. Email notification
 * 4. HubSpot integration (if configured)
 * 
 * Usage: Import and call in browser console
 * 
 * SOLID Principles Applied:
 * - Single Responsibility: Each test function has one clear purpose
 * - Open/Closed: Easy to extend with new test cases
 * - Dependency Inversion: Depends on abstractions (imported functions)
 * 
 * DRY Principles Applied:
 * - Reusable test data generators
 * - Common error handling patterns
 * - Shared result formatting
 */

import { submitLead } from './leadCapture';
import { sendLeadNotificationEmail, isEmailJSConfigured } from './emailService';
import { exportLeads, getAnalyticsSummary } from './analytics';
import { isHubSpotConfigured } from './hubspot';

/**
 * Test result structure (DRY - consistent result format)
 */
function createTestResult() {
  return {
    success: false,
    error: null,
  };
}

/**
 * Generate test form data (DRY - reusable data generator)
 */
function generateTestFormData(type, timestamp = Date.now()) {
  const baseData = {
    name: `E2E Test ${type}`,
    email: `test-${type}-${timestamp}@example.com`,
    company: `Test ${type === 'Contact' ? 'VC Firm' : 'Biotech Co'}`,
    phone: type === 'Contact' ? '+1 (555) 111-2222' : '',
    projectType: type === 'Contact' ? 'due-diligence' : '',
    message: `E2E Test: Testing ${type.toLowerCase()} form submission and email delivery workflow.`,
  };
  return baseData;
}

/**
 * Execute a test step with consistent error handling (DRY)
 */
async function executeTestStep(stepName, testFunction) {
  console.log(`\n📋 ${stepName}`);
  console.log('─────────────────────────────────────────────────────');
  
  try {
    const result = await testFunction();
    if (result.success) {
      console.log(`✅ ${stepName}: SUCCESS`);
      return result;
    } else {
      console.error(`❌ ${stepName}: FAILED`);
      console.error('   Error:', result.error);
      return result;
    }
  } catch (error) {
    console.error(`❌ ${stepName}: ERROR`);
    console.error('   Error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Test configuration (Single Responsibility)
 */
function testConfiguration() {
  const emailConfigured = isEmailJSConfigured();
  const hubspotConfigured = isHubSpotConfigured();
  
  console.log(`EmailJS: ${emailConfigured ? '✅ Configured' : '❌ Not Configured'}`);
  console.log(`HubSpot: ${hubspotConfigured ? '✅ Configured' : '❌ Not Configured'}`);
  
  if (!emailConfigured) {
    console.warn('\n⚠️  EmailJS not configured. Email notifications will be skipped.');
    console.warn('   To enable: Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY');
  }
  
  return { emailConfigured, hubspotConfigured };
}

/**
 * Test form submission (Single Responsibility)
 */
async function testFormSubmission(formType, formData) {
  console.log(`Submitting ${formType} form...`);
  console.log('Data:', formData);
  
  const result = await submitLead(formType, formData);
  
  if (result.success) {
    console.log('   Lead ID:', result.lead?.id || 'N/A');
    console.log('   Stored:', result.lead ? 'Yes' : 'No');
  }
  
  return result;
}

/**
 * Test email delivery (Single Responsibility)
 */
async function testEmailDelivery(emailTestData) {
  const recipientEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL || 'john@bioticabio.com';
  console.log('Sending test email notification...');
  console.log('Recipient:', recipientEmail);
  console.log('Data:', emailTestData);
  
  const result = await sendLeadNotificationEmail('contact', emailTestData);
  
  if (result.success) {
    console.log('   Response:', result.response?.status || 'N/A');
    console.log('   ⚠️  Check inbox:', recipientEmail);
  }
  
  return result;
}

/**
 * Verify lead storage (Single Responsibility)
 */
function verifyLeadStorage() {
  const storedLeads = exportLeads();
  const summary = getAnalyticsSummary();
  
  console.log(`Total leads stored: ${storedLeads.length}`);
  console.log(`Page views: ${summary.page_views || 0}`);
  console.log(`Form submissions: ${summary.form_submits || 0}`);
  console.log(`Conversion rate: ${summary.conversion_rate?.toFixed(1) || 0}%`);
  
  if (storedLeads.length > 0) {
    console.log('\nRecent leads (last 5):');
    storedLeads.slice(-5).reverse().forEach((lead, index) => {
      console.log(`\n  ${index + 1}. ${lead.name || 'Anonymous'}`);
      console.log(`     Email: ${lead.email}`);
      console.log(`     Form: ${lead.form_type}`);
      console.log(`     Company: ${lead.company || 'N/A'}`);
      console.log(`     Project: ${lead.projectType || 'N/A'}`);
      console.log(`     Time: ${new Date(lead.timestamp).toLocaleString()}`);
    });
  }
  
  return {
    success: storedLeads.length >= 2,
    count: storedLeads.length,
  };
}

/**
 * Generate test summary report (Single Responsibility)
 */
function generateSummaryReport(results) {
  console.log('\n\n📊 E2E Test Summary');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`✅ Contact Form: ${results.contactFormTest.success ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Demo Form: ${results.demoFormTest.success ? 'PASSED' : 'FAILED'}`);
  console.log(`✅ Lead Storage: ${results.leadStorageTest.success ? 'PASSED' : 'FAILED'} (${results.leadStorageTest.count} leads)`);
  console.log(`✅ Email Delivery: ${results.emailConfigured ? (results.emailDeliveryTest.success ? 'PASSED' : 'FAILED') : 'SKIPPED'}`);
  console.log(`✅ HubSpot Integration: ${results.hubspotConfigured ? 'CONFIGURED' : 'NOT CONFIGURED'}`);
  
  const allPassed = results.contactFormTest.success && 
                    results.demoFormTest.success && 
                    results.leadStorageTest.success;
  
  console.log(`\n🎯 Overall Status: ${allPassed ? '✅ PASSED' : '⚠️  PARTIAL'}`);
  
  if (!allPassed) {
    console.log('\n⚠️  Issues Found:');
    if (!results.contactFormTest.success) {
      console.log('   - Contact form submission failed');
    }
    if (!results.demoFormTest.success) {
      console.log('   - Demo form submission failed');
    }
    if (!results.leadStorageTest.success) {
      console.log('   - Lead storage verification failed');
    }
  }
  
  console.log('\n💡 Next Steps:');
  console.log('   1. Check browser console for detailed logs');
  console.log('   2. Verify leads in Testing Dashboard (bottom-right)');
  if (results.emailConfigured) {
    console.log('   3. Check email inbox:', import.meta.env.VITE_EMAILJS_TO_EMAIL || 'john@bioticabio.com');
  }
  console.log('   4. Test actual form submission on the landing page');
  console.log('   5. Verify HubSpot contacts (if configured)');
}

/**
 * Main test orchestrator (Single Responsibility - coordinates all tests)
 */
export async function testInquiryFlow() {
  console.log('🧪 Starting E2E Inquiry Flow Test\n');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const results = {
    emailConfigured: false,
    hubspotConfigured: false,
    contactFormTest: createTestResult(),
    demoFormTest: createTestResult(),
    emailDeliveryTest: createTestResult(),
    leadStorageTest: { success: false, count: 0 },
  };
  
  // Step 1: Check Configuration
  const config = testConfiguration();
  results.emailConfigured = config.emailConfigured;
  results.hubspotConfigured = config.hubspotConfigured;
  
  // Step 2: Test Contact Form Submission
  const contactData = generateTestFormData('Contact');
  results.contactFormTest = await executeTestStep(
    'Step 2: Contact Form Submission Test',
    () => testFormSubmission('contact', contactData)
  );
  
  // Step 3: Test Demo Form Submission
  const demoData = generateTestFormData('Demo');
  results.demoFormTest = await executeTestStep(
    'Step 3: Demo Form Submission Test',
    () => testFormSubmission('demo', demoData)
  );
  
  // Step 4: Test Email Delivery (if configured)
  if (results.emailConfigured) {
    const emailTestData = generateTestFormData('Email');
    emailTestData.message = 'E2E Test Email: This is a test of the email notification system. If you receive this, email delivery is working correctly!';
    results.emailDeliveryTest = await executeTestStep(
      'Step 4: Email Delivery Test',
      () => testEmailDelivery(emailTestData)
    );
  } else {
    console.log('\n⏭️  Step 4: Email Delivery - SKIPPED (EmailJS not configured)');
  }
  
  // Step 5: Verify Lead Storage
  console.log('\n📋 Step 5: Lead Storage Verification');
  console.log('─────────────────────────────────────────────────────');
  results.leadStorageTest = verifyLeadStorage();
  
  // Generate Summary Report
  generateSummaryReport(results);
  
  console.log('\n✅ E2E Test Complete!\n');
  
  return results;
}

// Make available globally in dev mode
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.testInquiryFlow = testInquiryFlow;
  console.log('💡 E2E test function available: await window.testInquiryFlow()');
}
