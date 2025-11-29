# Test EmailJS Integration

## Quick Test Steps

### Option 1: Using Testing Dashboard (Easiest)

1. **Start your dev server** (if not running):
   ```bash
   pnpm dev
   ```

2. **Open your app** in browser:
   - Usually at: http://localhost:5173
   - Or check the terminal for the exact URL

3. **Find the Testing Dashboard**:
   - Look for a dashboard panel (usually bottom-right corner)
   - Or navigate to a testing page if available

4. **Click "Test Email" button**:
   - This will send a test email to `john@bioticabio.com`
   - Check browser console for success message
   - Check email inbox for the test email

### Option 2: Submit a Test Form

1. **Start your dev server**:
   ```bash
   pnpm dev
   ```

2. **Open your app** in browser

3. **Fill out the contact form**:
   - Enter test data:
     - Name: Test User
     - Email: test@example.com
     - Company: Test Company
     - Message: This is a test submission
   - Submit the form

4. **Check results**:
   - Browser console should show: `✅ Email notification sent successfully`
   - Check `john@bioticabio.com` inbox for the email
   - Email should use your professional template

### Option 3: Browser Console Test

1. **Open your app** in browser

2. **Open browser console** (F12 or Cmd+Option+I)

3. **Run this command**:
   ```javascript
   // Import and test email service
   import { sendTestEmail, isEmailJSConfigured } from './src/utils/emailService.js';
   
   // Check if configured
   console.log('EmailJS Configured:', isEmailJSConfigured());
   
   // Send test email
   sendTestEmail('john@bioticabio.com', 'Test email from browser console')
     .then(result => console.log('✅ Test result:', result))
     .catch(error => console.error('❌ Test error:', error));
   ```

## What to Look For

### ✅ Success Indicators:
- Browser console shows: `✅ Email notification sent successfully`
- Status code: 200
- Email arrives in `john@bioticabio.com` inbox
- Email uses your professional template design

### ❌ Error Indicators:
- Console shows error messages
- Status code: 400, 403, or 500
- No email received

## Troubleshooting

### "EmailJS not configured"
- Check `.env` file has all credentials
- Restart dev server after updating `.env`
- Verify variables start with `VITE_`

### "Template not found"
- Verify Template ID in `.env` matches EmailJS dashboard
- Check template exists in EmailJS dashboard

### "Service not found"
- Verify Service ID in `.env` matches EmailJS dashboard
- Check service is active in EmailJS dashboard

### Email not received
- Check spam folder
- Verify recipient email in `.env` is correct
- Check EmailJS dashboard for error logs
- Verify email service is properly connected

## Next Steps After Testing

Once testing works:
1. ✅ EmailJS is fully configured
2. ✅ Template is working
3. ✅ Ready for production
4. ✅ Deploy to Vercel with same environment variables

