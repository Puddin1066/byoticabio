#!/usr/bin/env node

/**
 * EmailJS Template Creator
 * 
 * This script helps you create a professional email template for EmailJS.
 * It generates the template content that you can copy into the EmailJS dashboard.
 * 
 * Usage:
 *   node create-emailjs-template.js
 *   node create-emailjs-template.js --html
 *   node create-emailjs-template.js --plain
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const format = args.includes('--html') ? 'html' : args.includes('--plain') ? 'plain' : 'html';

console.log('\n📧 EmailJS Professional Template Generator\n');
console.log('=' .repeat(60));

if (format === 'html') {
  console.log('\n📄 HTML Template (Professional & Engaging)\n');
  console.log('─'.repeat(60));
  
  try {
    const htmlTemplate = readFileSync(join(__dirname, 'emailjs-template-professional.html'), 'utf-8');
    console.log(htmlTemplate);
    console.log('\n' + '─'.repeat(60));
    console.log('\n📋 Instructions:');
    console.log('1. Copy the HTML template above');
    console.log('2. Go to EmailJS Dashboard → Email Templates');
    console.log('3. Click "Create New Template" or edit existing template');
    console.log('4. Paste the HTML in the template editor');
    console.log('5. Make sure template variables match:');
    console.log('   - {{to_email}}');
    console.log('   - {{form_type}}');
    console.log('   - {{lead_name}}');
    console.log('   - {{lead_email}}');
    console.log('   - {{lead_company}}');
    console.log('   - {{lead_phone}}');
    console.log('   - {{project_type}}');
    console.log('   - {{message}}');
    console.log('   - {{timestamp}}');
    console.log('   - {{subject}}');
    console.log('6. Save the template');
    console.log('7. Copy the Template ID and update your .env file\n');
  } catch (error) {
    console.error('Error reading template file:', error.message);
  }
} else {
  console.log('\n📄 Plain Text Template (Simple & Professional)\n');
  console.log('─'.repeat(60));
  
  try {
    const plainTemplate = readFileSync(join(__dirname, 'emailjs-template-plain.txt'), 'utf-8');
    console.log(plainTemplate);
    console.log('\n' + '─'.repeat(60));
    console.log('\n📋 Instructions:');
    console.log('1. Copy the plain text template above');
    console.log('2. Go to EmailJS Dashboard → Email Templates');
    console.log('3. Click "Create New Template" or edit existing template');
    console.log('4. Switch to "Plain Text" tab (if available)');
    console.log('5. Paste the template content');
    console.log('6. Make sure template variables match');
    console.log('7. Save the template\n');
  } catch (error) {
    console.error('Error reading template file:', error.message);
  }
}

console.log('💡 Tips:');
console.log('   • HTML templates look more professional');
console.log('   • Plain text works better for some email clients');
console.log('   • Test your template after creating it');
console.log('   • Use the Testing Dashboard in your app to verify\n');

console.log('=' .repeat(60));

