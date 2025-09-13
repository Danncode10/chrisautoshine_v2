# EmailJS Integration Guide

This document explains the integration of EmailJS in the Chris Auto Shine v2 project, a client-side email sending solution used in the contact form. It covers how EmailJS works, the use of VITE_ prefixed environment variables, locating API keys in the EmailJS dashboard, and deploying to Vercel with environment variables.

## How EmailJS Works

EmailJS is a JavaScript library that enables sending emails directly from the frontend (client-side) without requiring a backend server. This is particularly useful for static sites or single-page applications (SPAs) like this Vite/React project, where setting up a full server for email handling would be overkill.

### Key Components:
1. **Email Service**: You connect EmailJS to an email provider (e.g., Gmail, Outlook) via an "Email Service" in the dashboard. This generates a **Service ID**.
2. **Email Template**: Pre-defined HTML/email templates are created in the dashboard for different use cases (e.g., contact form submissions). Each template has a **Template ID**.
3. **Public Key (User ID)**: This is your EmailJS account's public API key, used to authenticate requests from the client.
4. **SDK Integration**: The `@emailjs/browser` library is imported in the code (e.g., in `src/components/ContactForm.jsx`). When a form is submitted:
   - The `emailjs.send()` function is called with the Service ID, Template ID, user inputs (e.g., name, email, message), and Public Key.
   - EmailJS handles the request server-side (their servers), sends the email via your connected provider, and returns a success/error response to the client.

### Example Usage in Code:
```javascript
import emailjs from '@emailjs/browser';

const sendEmail = (e) => {
  e.preventDefault();
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: form.current[0].value,
    from_email: form.current[1].value,
    message: form.current[2].value,
  }, 'YOUR_PUBLIC_KEY')
    .then((result) => {
      console.log('Email sent successfully!');
    }, (error) => {
      console.log('Failed to send email:', error);
    });
};
```

This approach keeps the app lightweight but relies on EmailJS's servers for delivery. Note: For production, handle errors gracefully and consider rate limits (free tier: 200 emails/month).

## Why Use VITE_ Prefix for Environment Variables

Vite (the build tool for this project) has built-in support for environment variables via `.env` files. However, for security reasons, Vite **only exposes variables prefixed with `VITE_` to the client-side JavaScript bundle**. This prevents accidental leakage of sensitive server-side secrets (e.g., private API keys) into the browser.

### Reasons:
- **Security**: Non-prefixed vars (e.g., `API_KEY=abc`) are only available during build time (e.g., for server-side rendering) and not bundled into the client code. Prefixed ones (e.g., `VITE_EMAILJS_PUBLIC_KEY=abc`) are replaced at build time with their values, making them accessible via `import.meta.env.VITE_EMAILJS_PUBLIC_KEY`.
- **Best Practice**: EmailJS's Public Key is safe to expose (it's designed for client-side use), but using `VITE_` ensures consistency and avoids errors. In this project, variables like `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` are defined in `.env` and accessed in components like `ContactForm.jsx`.
- **Without Prefix**: Attempting to access a non-prefixed var in client code would result in `undefined`, breaking the email functionality.

Example in `.env`:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

In code: `import.meta.env.VITE_EMAILJS_PUBLIC_KEY`

## Where to Find API Key Values in EmailJS

To obtain the necessary IDs and keys:

1. **Sign Up/Login**: Go to [EmailJS Dashboard](https://dashboard.emailjs.com/) and create/log in to your account.
2. **Public Key (User ID)**:
   - Navigate to **Account** (top-right profile icon) > **API Keys**.
   - Copy the **Public Key** (starts with `user_`). This is safe for client-side exposure.
3. **Service ID**:
   - Go to **Email Services** in the sidebar.
   - Select or create a new service (connect to your email provider).
   - Copy the **Service ID** (e.g., `service_abc123`).
4. **Template ID**:
   - Go to **Email Templates** in the sidebar.
   - Select or create a new template (define subject, body with placeholders like `{{from_name}}`).
   - Copy the **Template ID** (e.g., `template_def456`).

Update your `.env` file with these values (prefixed with `VITE_`). Test locally by running `npm run dev` and submitting the contact form.

## Deploying to Vercel with Environment Variables

Vercel is the deployment platform for this project (integrated via GitHub). Environment variables in `.env` work locally but are not automatically uploaded to Vercel for security. To make EmailJS work online:

1. **Deploy the Project**: Push changes to GitHub (`git add . && git commit -m "Update" && git push`). Vercel auto-deploys from the `main` branch.
2. **Add Environment Variables in Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) > Select your project (e.g., `chrisautoshine-v2`).
   - Navigate to **Settings** > **Environment Variables**.
   - Add each variable:
     - Name: `VITE_EMAILJS_SERVICE_ID`, Value: `your_service_id`, Environment: `Production` (and others if needed).
     - Repeat for `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY`.
   - Click **Save**. Vercel will redeploy automatically, injecting these vars into the build process.
3. **Verification**: Visit your deployed site (e.g., `https://chrisautoshine-v2.vercel.app`), submit the contact form, and check EmailJS dashboard for sent emails. Console logs or network tab can show any errors.

This setup ensures sensitive values (even public ones) are managed securely without committing them to Git. If deploying to other platforms, follow similar env var configuration steps.

For issues, check Vercel logs under **Deployments** > **Functions** or EmailJS error responses.
