# Twilio Integration

## Overview

This directory contains Twilio integration code and configuration for:
- SMS messaging
- Voice calls
- WhatsApp messaging
- Message templates
- Webhook handlers

## Setup

### 1. Create Twilio Account

Sign up at [twilio.com](https://www.twilio.com/)

### 2. Get Credentials

From Twilio Console:
- Account SID
- Auth Token
- Phone Number

### 3. Configure Environment Variables

```env
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 4. Configure Webhooks

Set up webhooks in Twilio Console:
- **SMS Status**: `https://your-domain.com/api/webhooks/twilio`
- **Incoming SMS**: `https://your-domain.com/api/webhooks/twilio`
- **Voice Status**: `https://your-domain.com/api/webhooks/twilio`

## Usage

### Send SMS

```typescript
import { sms } from '@/services/sms';

await sms.send({
  to: '+14695551234',
  body: 'Hello from MaxSam!'
});
```

### Send Bulk SMS

```typescript
const messages = [
  { to: '+14695551234', body: 'Message 1' },
  { to: '+14695559876', body: 'Message 2' },
];

await sms.sendBulk(messages);
```

### Check Message Status

```typescript
const status = await sms.getMessageStatus('message-sid');
console.log(status.status); // 'delivered', 'failed', etc.
```

## Message Templates

### Cold Outreach

```
Hi {{owner_name}}, we noticed your property at {{address}}. 
We're interested in making an offer. Reply YES to learn more.
```

### Follow-up

```
Hi {{owner_name}}, following up on {{address}}. 
Are you still interested in discussing options? Text back anytime.
```

### Appointment Confirmation

```
Confirmed: Meeting for {{address}} on {{date}} at {{time}}. 
Reply CONFIRM or RESCHEDULE.
```

## Webhook Events

### Incoming SMS

```json
{
  "MessageSid": "SM...",
  "From": "+14695551234",
  "To": "+19876543210",
  "Body": "YES",
  "NumMedia": "0"
}
```

### Message Status

```json
{
  "MessageSid": "SM...",
  "MessageStatus": "delivered",
  "To": "+14695551234",
  "From": "+19876543210"
}
```

## Best Practices

### 1. Compliance

- **TCPA Compliance**: Get explicit consent before texting
- **Opt-out**: Always include "Reply STOP to opt out"
- **Business Hours**: Text during reasonable hours (9am-9pm)
- **Clear Identity**: Identify yourself in first message

### 2. Message Content

- Keep messages under 160 characters when possible
- Use personalization: {{owner_name}}, {{address}}
- Include clear call-to-action
- Make opt-out easy and clear

### 3. Rate Limiting

- Don't send too many messages at once
- Space out campaign messages
- Monitor delivery rates
- Watch for spam reports

### 4. Error Handling

- Handle failed deliveries gracefully
- Retry with exponential backoff
- Log all errors
- Monitor error rates

## Features

### SMS Campaigns

```typescript
// Create campaign
const campaign = await campaigns.create({
  name: 'Q1 Outreach',
  type: 'sms',
  template: 'Hi {{owner_name}}, we noticed...',
  propertyIds: ['uuid1', 'uuid2'],
  scheduledAt: new Date('2024-12-01T10:00:00Z')
});

// Track results
const results = await campaigns.getResults(campaign.id);
```

### Two-way Conversations

```typescript
// Handle incoming message
app.post('/webhooks/twilio', async (req, res) => {
  const { From, Body } = req.body;
  
  if (Body.toLowerCase() === 'yes') {
    await sms.send({
      to: From,
      body: 'Great! What questions do you have?'
    });
  }
});
```

### MMS (Images)

```typescript
await sms.send({
  to: '+14695551234',
  body: 'Check out this property!',
  mediaUrl: ['https://example.com/image.jpg']
});
```

## WhatsApp Integration

### Setup WhatsApp

1. Apply for WhatsApp Business
2. Get approved message templates
3. Configure webhook URL

### Send WhatsApp Message

```typescript
await sms.send({
  to: 'whatsapp:+14695551234',
  body: 'Hello from MaxSam on WhatsApp!'
});
```

## Voice Calls

### Make Outbound Call

```typescript
const call = await twilio.calls.create({
  to: '+14695551234',
  from: process.env.TWILIO_PHONE_NUMBER,
  url: 'https://your-domain.com/voice.xml'
});
```

### TwiML Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Hello! This is MaxSam calling about your property.</Say>
  <Gather numDigits="1" action="/voice/response">
    <Say>Press 1 to speak with someone, or 2 to hear more.</Say>
  </Gather>
</Response>
```

## Testing

### Use Twilio Test Credentials

```env
TWILIO_ACCOUNT_SID=ACtest...
TWILIO_AUTH_TOKEN=test_token
```

### Test Webhooks Locally

Use ngrok to expose local server:
```bash
ngrok http 3000
```

Then set webhook URL to: `https://your-ngrok-url.com/api/webhooks/twilio`

## Monitoring

### Message Logs

View all message activity in Twilio Console:
- Delivery status
- Error codes
- Response times
- Cost per message

### Analytics

Track key metrics:
- Delivery rate
- Response rate
- Opt-out rate
- Error rate

## Troubleshooting

### Messages Not Sending

- Check phone number format (+1234567890)
- Verify Twilio credentials
- Check account balance
- Review error messages

### Webhooks Not Working

- Verify webhook URL is publicly accessible
- Check signature validation
- Review Twilio logs
- Test with ngrok locally

### High Error Rates

- Check message content for spam keywords
- Verify phone numbers are valid
- Review TCPA compliance
- Check for carrier blocks

## Cost Optimization

1. **Use Short Messages**: Keep under 160 characters
2. **Batch Processing**: Group similar messages
3. **Monitor Usage**: Set up alerts for high usage
4. **Use Templates**: Approved templates have better delivery
5. **Clean Lists**: Remove invalid numbers

## Compliance Checklist

- [ ] Consent obtained before texting
- [ ] Clear opt-out instructions in messages
- [ ] Business identified in first message
- [ ] Texting during reasonable hours
- [ ] Opt-out requests honored immediately
- [ ] Records of consent maintained
- [ ] TCPA guidelines followed

## Resources

- [Twilio Documentation](https://www.twilio.com/docs)
- [SMS Best Practices](https://www.twilio.com/docs/sms/tutorials/how-to-send-sms-messages)
- [TCPA Compliance](https://www.twilio.com/learn/commerce-communications/tcpa-compliance-guide)
- [Twilio Console](https://console.twilio.com/)
