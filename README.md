# MaxSam V4 - AI-Powered Real Estate Intelligence Platform

> A modern, TypeScript-first monorepo for real estate automation, AI agents, and data pipelines.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

## 🎯 Overview

MaxSam V4 is a comprehensive platform for real estate professionals, featuring:
- **AI Agents**: Sam, Eleanor, Alex, and NanoBanana for various tasks
- **Data Pipelines**: Skiptracing, scoring, and ingestion workflows
- **Automation**: n8n workflows for seamless integrations
- **Real-time**: Supabase for instant updates and collaboration
- **Scalable**: Built on Vercel and modern cloud infrastructure

## 🏗️ Architecture

```
MaxSam-V4/
├── apps/
│   ├── backend/          # Node.js backend with API routes
│   └── frontend/         # Next.js 14 frontend with App Router
├── agents/               # AI agent definitions
│   ├── sam.ts           # Emotional support & reasoning
│   ├── eleanor.ts       # Analytics & business intelligence
│   ├── alex.ts          # Creative content engine
│   ├── nanobanana.ts    # Technical workflows
│   └── router.ts        # Agent orchestration
├── pipelines/            # Data processing pipelines
│   ├── skiptracing.ts   # Contact discovery
│   ├── scoring.ts       # Property qualification
│   └── sms-workflow.ts  # Automated outreach
├── integrations/         # External service integrations
│   ├── supabase/        # Database schema & migrations
│   ├── n8n/             # Workflow automation
│   ├── twilio/          # SMS & voice messaging
│   ├── docusign/        # Document signing
│   └── zillow/          # Property data
├── tests/                # Test files & sample data
├── scripts/              # Deployment & utility scripts
└── docs/                 # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Supabase account
- Vercel account (optional for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/Logans-Samantha-OS/MaxSam-V4.git
cd MaxSam-V4

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development servers
npm run dev
```

### Development URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api
- Supabase Studio: http://localhost:54323

## 📦 Core Features

### 1. AI Agents

Four specialized agents for different tasks:

**Sam** 🤝 - Emotional Support & Reasoning
- Natural conversation and emotional support
- Complex reasoning and problem-solving
- Memory of past interactions
- Strategic planning assistance

**Eleanor** 📊 - Analytics & Business Intelligence
- Data analysis and interpretation
- Business metrics and reporting
- Performance insights
- Operational recommendations

**Alex** ✨ - Creative Content Engine
- Content writing (emails, SMS, marketing copy)
- Brand voice development
- Creative campaign ideas
- Storytelling and narrative

**NanoBanana** 🔧 - Technical Workflows
- Workflow design and optimization
- JSON schema creation
- API integration planning
- Automation logic

### 2. Data Pipelines

**Skiptracing**: Discover property owner contact information
```typescript
POST /api/pipelines/skiptrace
{
  "propertyIds": ["uuid1", "uuid2"],
  "provider": "rtdata"
}
```

**Scoring**: Qualify and rank properties
```typescript
POST /api/pipelines/score
{
  "propertyIds": ["uuid1", "uuid2"],
  "criteria": { "minEquity": 100000 }
}
```

**SMS Campaigns**: Automated outreach workflows
```typescript
POST /api/pipelines/sms-campaign
{
  "propertyIds": ["uuid1", "uuid2"],
  "template": "Hi {{owner}}, interested in {{address}}?"
}
```

### 3. API Routes

RESTful API with comprehensive endpoints:

```
# Health & Auth
GET  /api/health
POST /api/auth/login
POST /api/auth/register

# Properties
GET  /api/properties
GET  /api/properties/:id
POST /api/properties/create
PUT  /api/properties/:id/update
POST /api/properties/:id/score

# Conversations
GET  /api/conversations
GET  /api/conversations/:id
POST /api/conversations/message

# Agents
GET  /api/agents/status
POST /api/agents/execute

# Pipelines
GET  /api/pipelines/status
POST /api/pipelines/skiptrace
POST /api/pipelines/score
POST /api/pipelines/sms-campaign

# Webhooks
POST /api/webhooks/stripe
POST /api/webhooks/twilio
POST /api/webhooks/n8n
```

## 🗄️ Database Schema

Built on PostgreSQL (via Supabase):

- **profiles**: User accounts and permissions
- **properties**: Property records with scoring
- **conversations**: Agent chat history
- **messages**: Individual conversation messages
- **campaigns**: Marketing campaigns
- **campaign_results**: Campaign performance tracking
- **pipeline_jobs**: Background job tracking

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context + Server Components
- **Auth**: Supabase Auth

### Backend
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **ORM**: Supabase Client
- **Auth**: JWT + Supabase

### AI/ML
- **LLMs**: OpenAI GPT-4, Anthropic Claude
- **Embeddings**: OpenAI text-embedding-ada-002
- **Agent Framework**: Custom orchestration

### Infrastructure
- **Hosting**: Vercel
- **Database**: Supabase
- **Automation**: n8n
- **Messaging**: Twilio
- **Payments**: Stripe
- **Documents**: DocuSign

## 📚 Documentation

- [Architecture](docs/architecture.md) - System design and data flow
- [API Reference](docs/api.md) - Complete API documentation
- [Agents Guide](docs/agents.md) - AI agent capabilities and usage
- [Supabase Setup](integrations/supabase/README.md) - Database configuration
- [n8n Workflows](integrations/n8n/README.md) - Automation workflows
- [Twilio Integration](integrations/twilio/README.md) - SMS/Voice setup

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run deploy
```

Or use Vercel CLI:
```bash
vercel --prod
```

### Environment Variables

Required for production:
```env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Providers
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Integrations
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
STRIPE_SECRET_KEY=
```

### Database Migrations

```bash
# Apply migrations
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with sample data
npm run ingest

# Import properties only
npm run ingest properties
```

## 🤝 Contributing

This is a private repository. Contact the maintainer for access.

## 📝 Scripts

```bash
# Development
npm run dev              # Start dev servers
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Apply migrations
npm run db:reset         # Reset database

# Deployment
npm run deploy           # Deploy to Vercel

# Data Management
npm run ingest           # Import sample data
```

## 🐛 Troubleshooting

### Common Issues

**Database connection errors**
- Verify `SUPABASE_URL` and keys in `.env`
- Check Supabase project is running
- Run `supabase status` to check local setup

**Build failures**
- Clear `.next` and `node_modules`: `npm run clean`
- Reinstall dependencies: `npm install`

**Webhook issues**
- Use ngrok for local development: `ngrok http 3000`
- Verify webhook URLs in integration dashboards

## 📊 Performance

- **First Load**: < 1s (Vercel Edge Network)
- **API Response**: < 100ms (95th percentile)
- **Database Queries**: < 50ms (with indexes)
- **Agent Response**: 2-5s (streaming available)

## 🔒 Security

- Row-level security (RLS) on all tables
- JWT authentication
- API rate limiting
- Webhook signature verification
- Environment variable encryption

## 📄 License

Private - All Rights Reserved

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend platform
- OpenAI and Anthropic for AI capabilities
- Vercel for hosting infrastructure

---

Built with ❤️ by the MaxSam Team
