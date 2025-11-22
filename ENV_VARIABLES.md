# Environment Variables Configuration

## Required for Vercel Deployment

Add these environment variables to your Vercel project settings:

### n8n API Integration

```bash
# Required for n8n webhook authentication
N8N_API_KEY=your_secure_n8n_api_key_here
```

**Important:** Generate a strong, random API key for production. This key will be sent in the `Authorization` header as `Bearer <N8N_API_KEY>` from n8n workflows.

### Supabase Configuration

```bash
# Frontend (Public - Safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend (Server-side - Keep secure)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Optional Integrations

These are referenced in the code but not yet required:

```bash
# AI Providers (for future implementation)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Twilio (for SMS features)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Stripe (for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Property Data
ZILLOW_API_KEY=your_zillow_api_key
ATTOM_API_KEY=your_attom_api_key

# DocuSign
DOCUSIGN_INTEGRATION_KEY=your_docusign_integration_key
DOCUSIGN_USER_ID=your_docusign_user_id
DOCUSIGN_ACCOUNT_ID=your_docusign_account_id
```

## How to Set in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable for:
   - **Production** environment (required)
   - **Preview** environment (optional, for testing)
   - **Development** environment (optional, for local testing)

## Testing n8n Integration

After deploying, test the n8n endpoints:

```bash
# Test authentication
curl -X POST https://your-app.vercel.app/api/n8n/validate \
  -H "Authorization: Bearer YOUR_N8N_API_KEY" \
  -H "Content-Type: application/json"

# Should return: {"success":true,"message":"Authentication successful",...}
```

## Security Notes

- **NEVER** commit `.env` files to git
- Keep `SUPABASE_SERVICE_ROLE_KEY` secure - it bypasses RLS
- Rotate API keys regularly
- Use different keys for production vs preview/development
- The `N8N_API_KEY` should be a long, random string (min 32 characters)
