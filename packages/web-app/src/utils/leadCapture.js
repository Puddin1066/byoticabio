/**
 * Lead Capture System
 * 
 * Handles form submissions, lead storage, and notifications
 * MOCKED for testing - replace with actual API integration in production
 */

import { trackFormSubmit, trackFormAbandonment, exportLeads } from './analytics';
import { createHubSpotContact, isHubSpotConfigured } from './hubspot';

// Mock API endpoint (replace with actual endpoint)
const LEAD_API_ENDPOINT = import.meta.env.VITE_LEAD_API_ENDPOINT || null;

/**
 * Submit lead form
 * @param {string} formType - Type of form ('contact', 'demo')
 * @param {Object} formData - Form data
 * @returns {Promise<Object>} Submission result
 */
export async function submitLead(formType, formData) {
  try {
    // Validate required fields
    if (!formData.name || !formData.email) {
      throw new Error('Name and email are required');
    }

    // Sanitize form data
    const sanitizedData = {
      name: sanitizeString(formData.name),
      email: sanitizeEmail(formData.email),
      company: sanitizeString(formData.company || ''),
      phone: sanitizeString(formData.phone || ''),
      projectType: sanitizeString(formData.projectType || ''),
      message: sanitizeString(formData.message || ''),
    };

    // Track form submission
    const lead = trackFormSubmit(formType, sanitizedData);

    // Send to HubSpot CRM (if configured)
    if (isHubSpotConfigured()) {
      try {
        await createHubSpotContact(sanitizedData, formType);
        console.log('✅ Lead created in HubSpot CRM');
      } catch (hubspotError) {
        console.warn('HubSpot error (non-critical, continuing):', hubspotError);
        // Continue even if HubSpot fails - form still works
      }
    }

    // Send to custom API (if configured)
    if (LEAD_API_ENDPOINT) {
      try {
        const response = await fetch(LEAD_API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...sanitizedData,
            form_type: formType,
            source: 'byoticabio_landing_page',
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          console.error('Lead API submission failed:', response.statusText);
        }
      } catch (apiError) {
        console.error('Lead API error:', apiError);
        // Continue even if API fails - lead is stored locally
      }
    }

    // Send email notification (mock - replace with actual email service)
    if (import.meta.env.VITE_ENABLE_EMAIL_NOTIFICATIONS === 'true') {
      await sendEmailNotification(formType, sanitizedData);
    }

    return {
      success: true,
      lead: lead,
      message: 'Lead captured successfully',
    };
  } catch (error) {
    console.error('Lead submission error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Send email notification (MOCKED)
 * @param {string} formType - Type of form
 * @param {Object} formData - Form data
 */
async function sendEmailNotification(formType, formData) {
  // MOCKED: Log email notification
  console.log('[MOCKED Email Notification]', {
    to: 'contact@byoticabio.ai',
    subject: `New ${formType} lead from ByoticaBio.ai`,
    body: `
New Lead Submission:
- Type: ${formType}
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}
- Project Type: ${formData.projectType || 'Not specified'}
- Message: ${formData.message || 'No message'}

Timestamp: ${new Date().toISOString()}
Source: ByoticaBio.ai Landing Page
    `,
  });

  // TODO: Replace with actual email service integration
  // Example: SendGrid, Mailchimp, AWS SES, etc.
  /*
  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'contact@byoticabio.ai',
      subject: `New ${formType} lead from ByoticaBio.ai`,
      body: emailBody,
    }),
  });
  */
}

/**
 * Sanitize string input
 * @param {string} str - Input string
 * @returns {string} Sanitized string
 */
function sanitizeString(str) {
  if (!str) return '';
  return str.trim().substring(0, 1000); // Limit length
}

/**
 * Sanitize and validate email
 * @param {string} email - Email address
 * @returns {string} Sanitized email
 */
function sanitizeEmail(email) {
  if (!email) return '';
  const sanitized = email.trim().toLowerCase();
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  return sanitized;
}

/**
 * Export leads to CSV format
 * @returns {string} CSV content
 */
export function exportLeadsToCSV() {
  const leads = exportLeads();

  if (leads.length === 0) {
    return 'No leads captured yet.';
  }

  // CSV header
  const headers = ['Timestamp', 'Form Type', 'Name', 'Email', 'Company', 'Phone', 'Project Type', 'Market Segment', 'Message', 'Source'];
  const rows = leads.map(lead => [
    lead.timestamp || '',
    lead.form_type || '',
    `"${(lead.name || '').replace(/"/g, '""')}"`,
    lead.email || '',
    `"${(lead.company || '').replace(/"/g, '""')}"`,
    lead.phone || '',
    lead.projectType || '',
    lead.market_segment || 'unknown',
    `"${(lead.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    lead.source || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  return csvContent;
}

/**
 * Download leads as CSV file
 */
export function downloadLeadsCSV() {
  if (typeof document === 'undefined') {
    console.error('Cannot download CSV: document is not available');
    return;
  }
  
  const csv = exportLeadsToCSV();
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `byoticabio_leads_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

