# MaxSam V4 AI Agents

## Overview

MaxSam V4 includes four specialized AI agents, each designed for specific tasks and workflows. All agents are powered by advanced language models (OpenAI GPT-4 and Anthropic Claude) and maintain conversation history for context-aware interactions.

## Agent Roster

### 1. Sam - The Companion
**Personality**: Empathetic, supportive, conversational

**Primary Role**: Emotional support and reasoning companion

**Capabilities**:
- Natural conversation and emotional support
- Complex reasoning and problem-solving
- Memory of past interactions
- Personal advice and guidance
- Goal tracking and accountability

**Best Used For**:
- General conversations
- Decision-making support
- Strategic planning
- Personal coaching
- Motivation and encouragement

**Example Prompts**:
- "Help me think through this deal"
- "I'm feeling overwhelmed, can we talk?"
- "What should I prioritize this week?"

---

### 2. Eleanor - The Analyst
**Personality**: Analytical, precise, data-driven

**Primary Role**: Analytics and business intelligence

**Capabilities**:
- Data analysis and interpretation
- Business metrics and reporting
- Trend identification
- Performance insights
- Operational recommendations

**Best Used For**:
- Property portfolio analysis
- Campaign performance review
- ROI calculations
- Market trend analysis
- Business reporting

**Example Prompts**:
- "Analyze my property portfolio performance"
- "What are the best performing campaigns?"
- "Show me conversion rates by county"
- "Which properties have the highest ROI potential?"

---

### 3. Alex - The Creative
**Personality**: Creative, expressive, artistic

**Primary Role**: Creative engine for content and branding

**Capabilities**:
- Content writing (emails, SMS, marketing copy)
- Brand voice development
- Creative campaign ideas
- Visual content suggestions
- Storytelling and narrative

**Best Used For**:
- SMS campaign templates
- Email sequences
- Marketing copy
- Brand messaging
- Social media content
- Property descriptions

**Example Prompts**:
- "Write an SMS template for cold outreach"
- "Create a compelling property description"
- "Help me craft an email sequence"
- "What's a good hook for this campaign?"

---

### 4. NanoBanana - The Builder
**Personality**: Technical, precise, systematic

**Primary Role**: Technical workflows and automation

**Capabilities**:
- Workflow design and optimization
- JSON schema creation
- API integration planning
- Data transformation
- Automation logic

**Best Used For**:
- n8n workflow creation
- API integration design
- Data pipeline setup
- Technical problem-solving
- System architecture planning

**Example Prompts**:
- "Create an n8n workflow for skiptracing"
- "How should I structure this API integration?"
- "Design a data pipeline for property ingestion"
- "Help me optimize this workflow"

---

## Agent Router

The agent router automatically selects the appropriate agent based on the user's request. However, users can explicitly request a specific agent.

### Automatic Routing Examples

| User Request | Routed To |
|-------------|-----------|
| "How should I prioritize my leads?" | Sam |
| "What's my average deal size?" | Eleanor |
| "Write me a cold SMS template" | Alex |
| "Build a workflow for data import" | NanoBanana |

### Explicit Agent Selection

Users can explicitly choose an agent by:
1. Using the agent selector in the UI
2. Mentioning the agent by name: "Hey Alex, can you..."
3. Using the API with the `agent` parameter

---

## Agent Memory

All agents maintain conversation history and context:

- **Short-term**: Current conversation context
- **Long-term**: User preferences, past decisions, ongoing projects
- **Cross-agent**: Shared knowledge when appropriate

### Memory Boundaries

Each agent has isolated memory for conversations, but can access shared user context like:
- User preferences
- Active properties and campaigns
- Business metrics
- Past decisions and outcomes

---

## Integration with Pipelines

Agents can trigger and monitor pipelines:

```typescript
// Sam helping with property qualification
"Based on your criteria, I've identified 15 high-potential properties. 
Shall I run the scoring pipeline on them?"

// Eleanor analyzing campaign results
"Your SMS campaign has a 23% response rate. 
I'll analyze which templates performed best."

// NanoBanana creating automation
"I've created an n8n workflow that will automatically 
skiptrace new properties within 24 hours."

// Alex crafting campaign content
"Here are three SMS templates optimized for your target demographic. 
Ready to launch the campaign?"
```

---

## API Usage

### Direct Agent Execution

```typescript
POST /api/agents/execute
{
  "agent": "eleanor",
  "task": "Analyze my property portfolio",
  "context": {
    "timeframe": "last_30_days",
    "includeComparisons": true
  }
}
```

### Conversation-based Interaction

```typescript
POST /api/conversations/message
{
  "conversationId": "uuid",
  "content": "What properties should I focus on this week?",
  "agent": "sam"
}
```

---

## Best Practices

### When to Use Each Agent

1. **Use Sam** for:
   - Strategic decisions
   - Personal guidance
   - Complex reasoning
   - When you need a thinking partner

2. **Use Eleanor** for:
   - Numbers and analytics
   - Performance reviews
   - Data interpretation
   - Business intelligence

3. **Use Alex** for:
   - Any writing task
   - Creative campaigns
   - Marketing content
   - Brand voice

4. **Use NanoBanana** for:
   - Automation setup
   - Technical workflows
   - API integrations
   - System design

### Agent Collaboration

Agents can hand off tasks to each other:

```
User → Sam: "I need to analyze my best properties and create a campaign"
Sam → Eleanor: "Analyze top 20 properties by score"
Eleanor → Alex: "Create SMS templates for these properties"
Alex → User: "Here are your campaign templates"
```

---

## Customization

### Adjusting Agent Behavior

Agents can be customized through:
- System prompts
- Temperature settings
- Model selection
- Memory retention policies

### Adding New Agents

To add a new agent:
1. Create agent definition in `agents/[name].ts`
2. Add agent to router in `agents/router.ts`
3. Update documentation
4. Train on specific capabilities

---

## Monitoring

Track agent performance:
- Response times
- Token usage
- User satisfaction
- Task completion rates
- Error rates

Access metrics through Eleanor:
"Show me agent performance metrics for the last week"
