#!/usr/bin/env node

/**
 * EmailJS Setup and Validation Script
 * 
 * This script helps you:
 * 1. Validate your EmailJS credentials from .env
 * 2. Test sending an email using the EmailJS SDK
 * 3. Verify your configuration is correct
 * 
 * Usage:
 *   node setup-emailjs.js
 *   node setup-emailjs.js --test
 *   node setup-emailjs.js --validate
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: join(__dirname, '.env') });

// Get EmailJS credentials from environment
const SERVICE_ID = process.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.VITE_EMAILJS_PUBLIC_KEY;
const TO_EMAIL = process.env.VITE_EMAILJS_TO_EMAIL || 'john@bioticabio.com';

/**
 * Validate EmailJS configuration
 */
function validateConfiguration() {
  console.log('\n🔍 Validating EmailJS Configuration...\n');
  
  const issues = [];
  const config = {
    serviceId: SERVICE_ID,
    templateId: TEMPLATE_ID,
    publicKey: PUBLIC_KEY,
    toEmail: TO_EMAIL,
  };

  // Check each required field
  if (!SERVICE_ID || SERVICE_ID === 'service_xxxxx') {
    issues.push('❌ VITE_EMAILJS_SERVICE_ID is missing or not set');
  } else if (!SERVICE_ID.startsWith('service_')) {
    issues.push('⚠️  VITE_EMAILJS_SERVICE_ID should start with "service_"');
  } else {
    console.log('✅ VITE_EMAILJS_SERVICE_ID:', SERVICE_ID);
  }

  if (!TEMPLATE_ID || TEMPLATE_ID === 'template_xxxxx') {
    issues.push('❌ VITE_EMAILJS_TEMPLATE_ID is missing or not set');
  } else if (!TEMPLATE_ID.startsWith('template_')) {
    issues.push('⚠️  VITE_EMAILJS_TEMPLATE_ID should start with "template_"');
  } else {
    console.log('✅ VITE_EMAILJS_TEMPLATE_ID:', TEMPLATE_ID);
  }

  if (!PUBLIC_KEY || PUBLIC_KEY === 'xxxxxxxxxxxxx') {
    issues.push('❌ VITE_EMAILJS_PUBLIC_KEY is missing or not set');
  } else {
    console.log('✅ VITE_EMAILJS_PUBLIC_KEY:', PUBLIC_KEY.substring(0, 10) + '...');
  }

  if (!TO_EMAIL || TO_EMAIL === 'john@bioticabio.com') {
    console.log('⚠️  VITE_EMAILJS_TO_EMAIL using default:', TO_EMAIL);
  } else {
    console.log('✅ VITE_EMAILJS_TO_EMAIL:', TO_EMAIL);
  }

  if (issues.length > 0) {
    console.log('\n❌ Configuration Issues Found:\n');
    issues.forEach(issue => console.log('  ' + issue));
    console.log('\n📖 To get your credentials:');
    console.log('   1. Sign up at https://www.emailjs.com/');
    console.log('   2. Create an Email Service (Email Services → Add New Service)');
    console.log('   3. Create an Email Template (Email Templates → Create New Template)');
    console.log('   4. Get your Public Key (Account → General → Public Key)');
    console.log('   5. Update your .env file with the actual values\n');
    return false;
  }

  console.log('\n✅ All required configuration is present!\n');
  return true;
}

/**
 * Send email using EmailJS REST API (for Node.js)
 */
function sendEmailViaAPI(templateParams) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: templateParams,
    });

    const options = {
      hostname: 'api.emailjs.com',
      port: 443,
      path: '/api/v1.0/email/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({
            status: res.statusCode,
            text: responseData || 'OK',
          });
        } else {
          reject({
            status: res.statusCode,
            text: responseData,
            message: `HTTP ${res.statusCode}: ${responseData}`,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        message: error.message,
        error: error,
      });
    });

    req.write(data);
    req.end();
  });
}

/**
 * Test sending an email using EmailJS REST API
 */
async function testEmailSending() {
  console.log('🧪 Testing Email Sending...\n');

  if (!validateConfiguration()) {
    console.log('❌ Cannot test email sending - configuration is invalid\n');
    return false;
  }

  try {
    // Prepare test email template parameters
    const templateParams = {
      to_email: TO_EMAIL,
      form_type: 'test',
      lead_name: 'Test User (Automated Setup)',
      lead_email: TO_EMAIL,
      lead_company: 'ByoticaBio.ai',
      lead_phone: 'Not provided',
      project_type: 'EmailJS Setup Test',
      message: 'This is an automated test email from the EmailJS setup script. If you receive this, your EmailJS configuration is working correctly!',
      timestamp: new Date().toISOString(),
      subject: 'EmailJS Setup Test - Configuration Successful',
    };

    console.log('📧 Sending test email to:', TO_EMAIL);
    console.log('   Service ID:', SERVICE_ID);
    console.log('   Template ID:', TEMPLATE_ID);
    console.log('   Public Key:', PUBLIC_KEY.substring(0, 10) + '...\n');

    // Send email using EmailJS REST API
    const response = await sendEmailViaAPI(templateParams);

    console.log('✅ Test email sent successfully!');
    console.log('   Status:', response.status);
    console.log('   Response:', response.text);
    console.log('\n📬 Please check your inbox at:', TO_EMAIL);
    console.log('   (It may take a few moments to arrive)\n');

    return true;
  } catch (error) {
    console.error('❌ Error sending test email:\n');
    console.error('   Error:', error.message || error);
    
    if (error.text) {
      console.error('   Details:', error.text);
    }

    // Provide helpful error messages
    if (error.message?.includes('Invalid') || error.status === 400) {
      console.error('\n💡 Common Issues:');
      console.error('   - Service ID, Template ID, or Public Key may be incorrect');
      console.error('   - Template variables may not match your EmailJS template');
      console.error('   - Email service may not be properly connected\n');
    } else if (error.message?.includes('rate limit') || error.message?.includes('quota') || error.status === 429) {
      console.error('\n💡 You may have hit the free tier limit (200 emails/month)');
      console.error('   Check your EmailJS dashboard for usage statistics\n');
    } else if (error.status === 403) {
      console.error('\n💡 Authentication failed:');
      console.error('   - Public Key may be incorrect');
      console.error('   - Check your EmailJS account settings\n');
    } else {
      console.error('\n💡 Troubleshooting:');
      console.error('   1. Verify all credentials in your .env file');
      console.error('   2. Check EmailJS dashboard for error logs');
      console.error('   3. Ensure your email template variables match:\n');
      console.error('      - to_email');
      console.error('      - form_type');
      console.error('      - lead_name');
      console.error('      - lead_email');
      console.error('      - lead_company');
      console.error('      - lead_phone');
      console.error('      - project_type');
      console.error('      - message');
      console.error('      - timestamp');
      console.error('      - subject\n');
    }

    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 EmailJS Setup and Validation Script\n');
  console.log('=' .repeat(50));

  const args = process.argv.slice(2);
  const command = args[0];

  if (command === '--validate' || command === '-v') {
    validateConfiguration();
  } else if (command === '--test' || command === '-t') {
    await testEmailSending();
  } else {
    // Default: validate and test
    const isValid = validateConfiguration();
    if (isValid) {
      console.log('Would you like to send a test email? (y/n)');
      console.log('(Run with --test flag to skip this prompt)\n');
      
      // For automated runs, just test
      await testEmailSending();
    }
  }

  console.log('=' .repeat(50));
}

// Run the script
main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

