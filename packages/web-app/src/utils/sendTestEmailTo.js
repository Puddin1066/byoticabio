/**
 * Quick function to send test email to specific address
 * 
 * Usage in browser console:
 *   await window.sendTestEmailTo('j.jayround@gmail.com', 'Test message')
 */

import { sendTestEmail } from './emailService';

export async function sendTestEmailTo(email, message = 'Test email from ByoticaBio.ai') {
  console.log(`📧 Sending test email to ${email}...`);
  
  try {
    const result = await sendTestEmail(email, message);
    console.log('✅ Email sent successfully!', result);
    return result;
  } catch (error) {
    console.error('❌ Email failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Make available globally in dev mode
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.sendTestEmailTo = sendTestEmailTo;
  console.log('💡 Quick email function available: await window.sendTestEmailTo("j.jayround@gmail.com", "Your message")');
}

