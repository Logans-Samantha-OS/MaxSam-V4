# Supabase Integration

## Overview

This directory contains all Supabase-related configuration, including:
- Database schema definitions
- SQL migrations
- RLS (Row Level Security) policies
- Database functions and triggers

## Setup

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Initialize Local Development

```bash
supabase init
supabase start
```

### 3. Link to Your Project

```bash
supabase link --project-ref your-project-ref
```

### 4. Apply Migrations

```bash
supabase db push
```

## File Structure

```
integrations/supabase/
├── schema.sql           # Complete database schema
├── migrations/          # Individual migration files
│   ├── 001_initial_schema.sql
│   └── ...
└── README.md
```

## Creating Migrations

### Manual Migration

1. Create a new migration file:
```bash
supabase migration new your_migration_name
```

2. Edit the generated file in `migrations/`

3. Apply the migration:
```bash
supabase db push
```

### From Schema Diff

```bash
supabase db diff -f your_migration_name
```

## Database Schema

### Core Tables

- **profiles**: User profiles extending Supabase auth
- **properties**: Property records with scoring and status
- **conversations**: Chat conversations with agents
- **messages**: Individual messages in conversations
- **campaigns**: Marketing campaigns (SMS, email)
- **campaign_results**: Campaign performance tracking
- **pipeline_jobs**: Background job tracking

### Indexes

All tables have appropriate indexes for performance:
- Status fields
- Foreign keys
- Search fields (full-text)
- Location fields

### RLS Policies

All tables have Row Level Security enabled:
- Users can only access their own data
- Admins have full access
- Service role bypasses RLS

## Environment Variables

Required environment variables:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

## TypeScript Types

Generate TypeScript types from your schema:

```bash
supabase gen types typescript --local > types/supabase.ts
```

Or from remote:

```bash
supabase gen types typescript --project-id your-project-ref > types/supabase.ts
```

## Real-time Subscriptions

Enable real-time for tables that need it:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE properties;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

Then subscribe in your app:

```typescript
const subscription = supabase
  .from('messages')
  .on('INSERT', payload => {
    console.log('New message:', payload.new);
  })
  .subscribe();
```

## Backup and Restore

### Backup

```bash
supabase db dump -f backup.sql
```

### Restore

```bash
psql -h db.your-project.supabase.co -U postgres -f backup.sql
```

## Best Practices

1. **Always use migrations** for schema changes
2. **Test locally** before deploying to production
3. **Enable RLS** on all tables
4. **Use indexes** for frequently queried fields
5. **Validate data** in application code before inserting
6. **Use transactions** for related operations
7. **Monitor performance** using Supabase dashboard

## Common Queries

### Find Properties by Score

```sql
SELECT * FROM properties 
WHERE score >= 80 
ORDER BY score DESC 
LIMIT 10;
```

### Get User's Recent Conversations

```sql
SELECT * FROM conversations 
WHERE user_id = 'uuid' 
ORDER BY updated_at DESC 
LIMIT 20;
```

### Campaign Performance

```sql
SELECT 
  c.name,
  COUNT(cr.id) as total_sent,
  COUNT(CASE WHEN cr.status = 'replied' THEN 1 END) as replies,
  ROUND(COUNT(CASE WHEN cr.status = 'replied' THEN 1 END) * 100.0 / COUNT(cr.id), 2) as reply_rate
FROM campaigns c
LEFT JOIN campaign_results cr ON c.id = cr.campaign_id
GROUP BY c.id, c.name;
```

## Troubleshooting

### Migration Errors

If a migration fails:
1. Check the error message
2. Fix the SQL in the migration file
3. Reset and reapply:
   ```bash
   supabase db reset
   ```

### Connection Issues

Verify your connection string:
```bash
psql "postgresql://postgres:password@db.your-project.supabase.co:5432/postgres"
```

### RLS Issues

Temporarily disable RLS for debugging:
```sql
ALTER TABLE your_table DISABLE ROW LEVEL SECURITY;
```

Remember to re-enable it!

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
