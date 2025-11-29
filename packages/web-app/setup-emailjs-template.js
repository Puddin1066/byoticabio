#!/usr/bin/env node

/**
 * EmailJS Template Setup Helper
 * 
 * Since EmailJS doesn't have an API for template creation,
 * this script helps you easily copy the template to paste into the dashboard.
 * 
 * Usage:
 *   node setup-emailjs-template.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '.env') });

const TEMPLATE_ID = process.env.VITE_EMAILJS_TEMPLATE_ID || 'template_q5szk2k';

console.log('\n📧 EmailJS Template Setup Helper\n');
console.log('=' .repeat(60));
console.log('\n⚠️  Note: EmailJS doesn\'t have an API for template creation.');
console.log('   Templates must be created/edited in the web dashboard.\n');
console.log('=' .repeat(60));

try {
  const templatePath = join(__dirname, 'emailjs-template-professional.html');
  const template = readFileSync(templatePath, 'utf-8');
  
  console.log('\n📋 Your Professional Email Template:\n');
  console.log('─'.repeat(60));
  console.log(template);
  console.log('─'.repeat(60));
  
  console.log('\n📝 Step-by-Step Instructions:\n');
  console.log('1. Copy the entire HTML template above (from <!DOCTYPE to </html>)');
  console.log('2. Open EmailJS Dashboard:');
  console.log(`   https://dashboard.emailjs.com/admin/template/${TEMPLATE_ID}`);
  console.log('   OR go to: https://dashboard.emailjs.com/admin/template');
  console.log('3. Click on your template or "Create New Template"');
  console.log('4. Switch to the "HTML" tab in the template editor');
  console.log('5. Paste the HTML template');
  console.log('6. Set Subject Line to:');
  console.log('   New {{form_type}} lead from ByoticaBio.ai');
  console.log('7. Click "Save"');
  console.log('8. Test it by submitting a form in your app!\n');
  
  console.log('💡 Pro Tip:');
  console.log('   The template is also saved in: emailjs-template-professional.html');
  console.log('   You can open that file directly to copy from it.\n');
  
  console.log('🔗 Quick Links:');
  console.log(`   • Edit Template: https://dashboard.emailjs.com/admin/template/${TEMPLATE_ID}`);
  console.log('   • All Templates: https://dashboard.emailjs.com/admin/template');
  console.log('   • EmailJS Dashboard: https://dashboard.emailjs.com/\n');
  
} catch (error) {
  console.error('❌ Error reading template file:', error.message);
  console.log('\n💡 Make sure emailjs-template-professional.html exists in this directory.\n');
}

console.log('=' .repeat(60));

