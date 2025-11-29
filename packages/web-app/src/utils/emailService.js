/**
 * Email Service using EmailJS
 * 
 * EmailJS is a client-side email service that doesn't require a backend.
 * Configuration required:
 * - VITE_EMAILJS_SERVICE_ID: Your EmailJS service ID
 * - VITE_EMAILJS_TEMPLATE_ID: Your EmailJS template ID
 * - VITE_EMAILJS_PUBLIC_KEY: Your EmailJS public key
 * - VITE_EMAILJS_TO_EMAIL: Recipient email address (default: john@bioticabio.com)
 */

import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL || 'john@bioticabio.com';

/**
 * Check if EmailJS is configured
 * @returns {boolean} True if EmailJS is configured
 */
export function isEmailJSConfigured() {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}

/**
 * Initialize EmailJS
 */
function initializeEmailJS() {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}

// Initialize on module load
if (typeof window !== 'undefined' && EMAILJS_PUBLIC_KEY) {
  initializeEmailJS();
}

/**
 * Create email template parameters (DRY principle)
 * @param {Object} options - Email options
 * @param {string} options.formType - Type of form
 * @param {string} options.toEmail - Recipient email
 * @param {Object} options.formData - Form data
 * @returns {Object} Template parameters
 */
function createTemplateParams({ formType, toEmail, formData = {} }) {
  return {
    to_email: toEmail,
    form_type: formType,
    lead_name: formData.name || 'Not provided',
    lead_email: formData.email || 'Not provided',
    lead_company: formData.company || 'Not provided',
    lead_phone: formData.phone || 'Not provided',
    project_type: formData.projectType || 'Not specified',
    message: formData.message || 'No message',
    timestamp: new Date().toISOString(),
    subject: `New ${formType} lead from ByoticaBio.ai`,
  };
}

/**
 * Send email via EmailJS (Single Responsibility)
 * @param {Object} templateParams - Email template parameters
 * @returns {Promise<Object>} Email send result
 */
async function sendEmail(templateParams) {
  const response = await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams
  );
  return response;
}

/**
 * Send email notification to admin about new lead
 * @param {string} formType - Type of form ('contact', 'demo')
 * @param {Object} formData - Form data
 * @returns {Promise<Object>} Email send result
 */
export async function sendLeadNotificationEmail(formType, formData) {
  if (!isEmailJSConfigured()) {
    console.warn('EmailJS not configured. Email notification skipped.');
    return {
      success: false,
      error: 'EmailJS not configured',
    };
  }

  try {
    const templateParams = createTemplateParams({
      formType,
      toEmail: EMAILJS_TO_EMAIL,
      formData,
    });

    const response = await sendEmail(templateParams);
    console.log('✅ Email notification sent successfully:', response);
    return {
      success: true,
      response: response,
    };
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    return {
      success: false,
      error: error.message || 'Failed to send email',
    };
  }
}

/**
 * Send test email
 * @param {string} toEmail - Recipient email address
 * @param {string} testMessage - Optional test message
 * @returns {Promise<Object>} Email send result
 */
export async function sendTestEmail(toEmail, testMessage = 'This is a test email from ByoticaBio.ai') {
  if (!isEmailJSConfigured()) {
    throw new Error('EmailJS not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY');
  }

  try {
    const templateParams = createTemplateParams({
      formType: 'test',
      toEmail,
      formData: {
        name: 'Test User',
        email: toEmail,
        company: 'Test Company',
        phone: 'Not provided',
        projectType: 'Test',
        message: testMessage,
      },
    });

    const response = await sendEmail(templateParams);
    console.log('✅ Test email sent successfully:', response);
    return {
      success: true,
      response: response,
      message: `Test email sent to ${toEmail}`,
    };
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    throw error;
  }
}
