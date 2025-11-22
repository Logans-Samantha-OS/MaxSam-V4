# MaxSam V4 Architecture

## Overview

MaxSam V4 is a monorepo-based AI-powered real estate intelligence platform built with modern TypeScript, Supabase, and n8n automation.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  Next.js Frontend (React, Tailwind, App Router)            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                       │
│  Next.js API Routes + Backend Services                     │
└─────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌──────────────────────┐      ┌──────────────────────┐
│   AI Agent Layer     │      │  Pipeline Layer      │
│  - Sam               │      │  - Skiptracing       │
│  - Eleanor           │      │  - Scoring           │
│  - Alex              │      │  - SMS Campaigns     │
│  - NanoBanana        │      │  - Data Ingestion    │
└──────────────────────┘      └──────────────────────┘
              │                           │
              └─────────────┬─────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Integration Layer                        │
│  Supabase │ n8n │ Twilio │ Stripe │ DocuSign │ Zillow     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                              │
│  PostgreSQL (via Supabase) + Real-time Subscriptions       │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Frontend (`apps/frontend`)
- **Framework**: Next.js 14 with App Router
- **UI**: React with Tailwind CSS
- **State Management**: React Context + Server Components
- **Authentication**: Supabase Auth

### 2. Backend (`apps/backend`)
- **Runtime**: Node.js with TypeScript
- **API**: Next.js API Routes
- **Services**: Modular service layer for business logic
- **Routes**: RESTful API endpoints

### 3. AI Agents (`agents/`)
- **Sam**: Emotional support and reasoning companion
- **Eleanor**: Analytics and business intelligence
- **Alex**: Creative engine for content and branding
- **NanoBanana**: Technical workflows and automation

### 4. Pipelines (`pipelines/`)
- **Skiptracing**: Property owner contact discovery
- **Scoring**: Property qualification and ranking
- **SMS Workflows**: Automated outreach campaigns
- **Data Ingestion**: Bulk property and excess funds import

### 5. Integrations (`integrations/`)
- **Supabase**: Database, auth, real-time, storage
- **n8n**: Workflow automation and orchestration
- **Twilio**: SMS, voice, WhatsApp messaging
- **Stripe**: Payment processing
- **DocuSign**: Document signing
- **Zillow**: Property data enrichment

## Data Flow

### Property Acquisition Flow
```
1. Data Ingestion → Properties Table
2. Skiptracing Pipeline → Contact Discovery
3. Scoring Pipeline → Qualification
4. SMS Campaign → Outreach
5. Conversation → Agent Interaction
6. Deal Pipeline → Closing
```

### Agent Conversation Flow
```
1. User Message → API Route
2. Agent Router → Select Agent (Sam, Eleanor, Alex, NanoBanana)
3. Agent Processing → AI Completion
4. Response → Store in Conversations Table
5. Real-time → Push to Frontend
```

## Technology Stack

### Core
- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **Framework**: Next.js 14
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth

### AI/ML
- **LLMs**: OpenAI GPT-4, Anthropic Claude
- **Embeddings**: OpenAI text-embedding-ada-002
- **Agent Framework**: Custom orchestration layer

### Infrastructure
- **Hosting**: Vercel (Frontend + API)
- **Database**: Supabase
- **Automation**: n8n
- **Monitoring**: TBD

### Integrations
- **Messaging**: Twilio, Telegram, WhatsApp
- **Payments**: Stripe
- **Documents**: DocuSign
- **Real Estate Data**: Zillow, RealtyData

## Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run deploy
```

### Database Migrations
```bash
supabase db push
```

## Security

- Row-level security (RLS) on all Supabase tables
- JWT-based authentication
- API key rotation
- Environment variable management
- Webhook signature verification

## Performance

- Server-side rendering (SSR) for initial page loads
- Static generation for marketing pages
- Real-time subscriptions for live data
- Caching layer for frequently accessed data
- Batch processing for large datasets

## Monitoring

- Error tracking: TBD
- Performance monitoring: Vercel Analytics
- Database monitoring: Supabase Dashboard
- n8n workflow monitoring: Built-in dashboard
