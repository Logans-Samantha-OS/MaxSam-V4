# n8n Integration

## Overview

This directory contains n8n workflow definitions (JSON exports) that automate various processes in the MaxSam platform.

## Available Workflows

### 1. Property Skiptracing Workflow
**File**: `workflows/property-skiptracing.json`

**Trigger**: Webhook (`/skiptrace`)

**Process**:
1. Receives property ID via webhook
2. Fetches property data from backend
3. Calls skiptracing API (RealtyData)
4. Updates property in Supabase
5. Returns results

**Usage**:
```bash
curl -X POST https://your-n8n.com/webhook/skiptrace \
  -H "Content-Type: application/json" \
  -d '{"propertyId": "uuid"}'
```

## Setup

### 1. Install n8n

**Self-hosted**:
```bash
npm install -g n8n
n8n start
```

**Docker**:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Cloud**: Sign up at [n8n.cloud](https://n8n.cloud)

### 2. Import Workflows

1. Open n8n dashboard
2. Click "Import from File"
3. Select workflow JSON from `workflows/` directory
4. Configure credentials
5. Activate workflow

### 3. Configure Credentials

Each workflow requires specific credentials:

#### Supabase
- **Type**: Supabase
- **Host**: Your Supabase project URL
- **Service Role Key**: Your service role key

#### HTTP Authentication
- **Type**: Header Auth
- **Header Name**: `Authorization`
- **Header Value**: `Bearer your-api-key`

#### RealtyData API
- **Type**: Header Auth
- **Header Name**: `X-API-Key`
- **Header Value**: Your RealtyData API key

## Creating New Workflows

### Basic Structure

```json
{
  "name": "Your Workflow Name",
  "nodes": [
    {
      "parameters": {},
      "name": "Trigger Node",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    }
  ],
  "connections": {},
  "settings": {}
}
```

### Common Node Types

#### Webhook Trigger
```json
{
  "parameters": {
    "httpMethod": "POST",
    "path": "your-webhook-path",
    "responseMode": "responseNode"
  },
  "name": "Webhook",
  "type": "n8n-nodes-base.webhook"
}
```

#### HTTP Request
```json
{
  "parameters": {
    "url": "https://api.example.com/endpoint",
    "authentication": "genericCredentialType",
    "genericAuthType": "httpHeaderAuth",
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "key",
          "value": "={{ $json.value }}"
        }
      ]
    }
  },
  "name": "HTTP Request",
  "type": "n8n-nodes-base.httpRequest"
}
```

#### Supabase
```json
{
  "parameters": {
    "operation": "update",
    "tableId": "properties",
    "filterType": "manual",
    "matchValues": {
      "id": "={{ $json.id }}"
    },
    "columns": {
      "mappingMode": "defineBelow",
      "value": {
        "field": "={{ $json.value }}"
      }
    }
  },
  "name": "Supabase",
  "type": "n8n-nodes-base.supabase"
}
```

## Environment Variables

Set these in your n8n environment:

```env
BACKEND_URL=https://your-backend.vercel.app
SUPABASE_URL=https://your-project.supabase.co
RTDATA_API_URL=https://api.realtydata.com
N8N_WEBHOOK_URL=https://your-n8n.com/webhook
```

## Workflow Patterns

### 1. Data Processing Pipeline

```
Webhook → Fetch Data → Transform → Update Database → Respond
```

### 2. Multi-step Integration

```
Webhook → External API 1 → External API 2 → Aggregate → Store
```

### 3. Scheduled Job

```
Cron Trigger → Query Database → Process Records → Send Notifications
```

### 4. Error Handling

```
Try Node → Main Flow → Catch Node → Log Error → Alert
```

## Testing Workflows

### 1. Manual Execution

Click "Execute Workflow" in n8n dashboard

### 2. Webhook Testing

```bash
curl -X POST https://your-n8n.com/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### 3. Production Webhook

Use the production webhook URL from the trigger node

## Monitoring

### Execution History

View all workflow executions in n8n dashboard:
- Execution time
- Success/failure status
- Input/output data
- Error messages

### Webhook Logs

All webhook calls are logged automatically

### Alerts

Set up error notifications:
1. Add "Send Email" or "Slack" node
2. Connect to error output
3. Configure alert message

## Best Practices

1. **Use Error Handlers**: Always add error handling nodes
2. **Validate Input**: Check webhook data before processing
3. **Log Important Steps**: Add "Set" nodes to log progress
4. **Use Variables**: Store reusable values in workflow settings
5. **Test Thoroughly**: Test with real data before activating
6. **Document Workflows**: Add notes to complex nodes
7. **Version Control**: Export and commit workflow changes
8. **Monitor Performance**: Check execution times regularly

## Common Issues

### Workflow Not Triggering

- Check webhook URL is correct
- Verify workflow is activated
- Check credentials are configured
- Look for errors in execution history

### Data Not Passing Between Nodes

- Use `{{ $json.field }}` syntax
- Check node connections
- Verify data structure in previous node

### Authentication Errors

- Verify API keys are correct
- Check credential configuration
- Ensure headers are properly set

## Exporting Workflows

### Export Single Workflow

1. Open workflow
2. Click "..." menu
3. Select "Download"
4. Save to `workflows/` directory

### Export All Workflows

```bash
n8n export:workflow --all --output=./workflows/
```

## Importing to Production

1. Export from development
2. Review and update credentials
3. Test in staging environment
4. Import to production
5. Activate workflow

## Advanced Features

### Webhooks with Authentication

```json
{
  "parameters": {
    "authentication": "headerAuth",
    "headerAuth": {
      "name": "Authorization",
      "value": "Bearer your-secret-token"
    }
  }
}
```

### Rate Limiting

Use "Wait" node between API calls:
```json
{
  "parameters": {
    "amount": 1,
    "unit": "seconds"
  },
  "name": "Wait",
  "type": "n8n-nodes-base.wait"
}
```

### Batch Processing

Use "Split In Batches" node for large datasets

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community](https://community.n8n.io/)
- [Workflow Templates](https://n8n.io/workflows/)
- [Node Reference](https://docs.n8n.io/integrations/builtin/)
