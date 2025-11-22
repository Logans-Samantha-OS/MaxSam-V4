# MaxSam V4 API Documentation

## Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.vercel.app/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Health Check
```
GET /health
```
Returns system health status.

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-11-20T00:00:00.000Z",
  "services": {
    "database": true,
    "agents": true,
    "pipelines": true
  }
}
```

---

### Authentication

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token",
  "expiresAt": "2024-11-21T00:00:00.000Z"
}
```

#### Register
```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

---

### Properties

#### List Properties
```
GET /properties
```

**Query Parameters:**
- `city` (optional): Filter by city
- `state` (optional): Filter by state
- `minScore` (optional): Minimum score
- `maxScore` (optional): Maximum score
- `status` (optional): Property status
- `limit` (optional): Results per page (default: 50)
- `offset` (optional): Pagination offset

**Response:**
```json
[
  {
    "id": "uuid",
    "address": "123 Main St",
    "city": "Dallas",
    "state": "TX",
    "zip": "75001",
    "score": 85,
    "status": "active",
    "createdAt": "2024-11-20T00:00:00.000Z"
  }
]
```

#### Get Property
```
GET /properties/:id
```

**Response:**
```json
{
  "id": "uuid",
  "address": "123 Main St",
  "city": "Dallas",
  "state": "TX",
  "zip": "75001",
  "county": "Dallas",
  "latitude": 32.7767,
  "longitude": -96.7970,
  "owner_name": "John Smith",
  "owner_phone": "+14695551234",
  "assessed_value": 250000,
  "market_value": 320000,
  "equity": 180000,
  "score": 85,
  "status": "active",
  "metadata": {},
  "createdAt": "2024-11-20T00:00:00.000Z",
  "updatedAt": "2024-11-20T00:00:00.000Z"
}
```

#### Create Property
```
POST /properties/create
```

**Request Body:**
```json
{
  "address": "123 Main St",
  "city": "Dallas",
  "state": "TX",
  "zip": "75001",
  "county": "Dallas"
}
```

#### Update Property
```
PUT /properties/:id/update
```

**Request Body:**
```json
{
  "status": "contacted",
  "score": 90
}
```

#### Score Property
```
POST /properties/:id/score
```

Triggers the scoring pipeline for a property.

---

### Conversations

#### List Conversations
```
GET /conversations
```

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "title": "Chat with Sam",
    "agent": "sam",
    "messages": [],
    "createdAt": "2024-11-20T00:00:00.000Z",
    "updatedAt": "2024-11-20T00:00:00.000Z"
  }
]
```

#### Get Conversation
```
GET /conversations/:id
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "title": "Chat with Sam",
  "agent": "sam",
  "messages": [
    {
      "id": "uuid",
      "role": "user",
      "content": "Hello!",
      "createdAt": "2024-11-20T00:00:00.000Z"
    },
    {
      "id": "uuid",
      "role": "assistant",
      "content": "Hi! How can I help?",
      "agent": "sam",
      "createdAt": "2024-11-20T00:00:00.000Z"
    }
  ],
  "createdAt": "2024-11-20T00:00:00.000Z",
  "updatedAt": "2024-11-20T00:00:00.000Z"
}
```

#### Send Message
```
POST /conversations/message
```

**Request Body:**
```json
{
  "conversationId": "uuid",
  "content": "What properties should I focus on?",
  "agent": "eleanor"
}
```

**Response:**
```json
{
  "id": "uuid",
  "conversationId": "uuid",
  "role": "assistant",
  "content": "Based on your criteria, I recommend...",
  "agent": "eleanor",
  "createdAt": "2024-11-20T00:00:00.000Z"
}
```

---

### Agents

#### Get Agent Status
```
GET /agents/status
```

**Response:**
```json
[
  {
    "name": "sam",
    "status": "online",
    "description": "Emotional support and reasoning companion",
    "capabilities": ["conversation", "empathy", "reasoning", "memory"],
    "activeConversations": 5
  }
]
```

#### Execute Agent Task
```
POST /agents/execute
```

**Request Body:**
```json
{
  "agent": "sam",
  "task": "Analyze these properties and give me insights",
  "context": {
    "propertyIds": ["uuid1", "uuid2"]
  },
  "stream": false
}
```

---

### Pipelines

#### Get Pipeline Status
```
GET /pipelines/status
```

**Response:**
```json
[
  {
    "name": "Skiptracing Pipeline",
    "type": "skiptracing",
    "status": "idle",
    "progress": 0,
    "lastRun": "2024-11-20T00:00:00.000Z"
  }
]
```

#### Run Skiptracing
```
POST /pipelines/skiptrace
```

**Request Body:**
```json
{
  "propertyIds": ["uuid1", "uuid2"],
  "provider": "rtdata"
}
```

**Response:**
```json
{
  "jobId": "uuid"
}
```

#### Run Scoring
```
POST /pipelines/score
```

**Request Body:**
```json
{
  "propertyIds": ["uuid1", "uuid2"],
  "criteria": {
    "minEquity": 100000,
    "maxAge": 10
  }
}
```

#### Run SMS Campaign
```
POST /pipelines/sms-campaign
```

**Request Body:**
```json
{
  "propertyIds": ["uuid1", "uuid2"],
  "template": "Hi {{owner_name}}, we're interested in {{address}}...",
  "scheduledAt": "2024-11-21T10:00:00.000Z"
}
```

---

### Webhooks

#### Stripe Webhook
```
POST /webhooks/stripe
```

Receives Stripe events (payment confirmations, subscription changes, etc.)

#### Twilio Webhook
```
POST /webhooks/twilio
```

Receives Twilio events (SMS delivery, incoming messages, etc.)

#### n8n Webhook
```
POST /webhooks/n8n
```

Receives n8n workflow completions and notifications

---

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "statusCode": 400,
    "message": "Validation error",
    "details": "Email is required"
  }
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate limited to:
- **Authenticated**: 1000 requests per hour
- **Unauthenticated**: 100 requests per hour

## Webhooks

Webhook endpoints verify signatures using the following headers:
- **Stripe**: `Stripe-Signature`
- **Twilio**: `X-Twilio-Signature`

Always verify webhook signatures in production!
